import fs from 'node:fs';
import path from 'node:path';

// 1. Patch .open-next/worker.js
const workerPath = path.resolve('.open-next/worker.js');
if (fs.existsSync(workerPath)) {
  let content = fs.readFileSync(workerPath, 'utf8');

  // Strip Durable Object exports that crash workers without DO bindings
  content = content.replace(/export\s*\{\s*DOQueueHandler\s*\}\s*from\s*["'][^"']+["'];?/g, '// DOQueueHandler removed for standard worker deployment');
  content = content.replace(/export\s*\{\s*DOShardedTagCache\s*\}\s*from\s*["'][^"']+["'];?/g, '// DOShardedTagCache removed for standard worker deployment');
  content = content.replace(/export\s*\{\s*BucketCachePurge\s*\}\s*from\s*["'][^"']+["'];?/g, '// BucketCachePurge removed for standard worker deployment');

  // Strip any old error boundary or handler import to allow re-patching cleanly
  content = content.replace(/\/\/ __OPENNEXT_SERVER_HANDLER_IMPORT__[\s\S]*?\/\/ END __OPENNEXT_SERVER_HANDLER_IMPORT__\n?/g, '');
  content = content.replace(/\/\/ __OPENNEXT_ERROR_BOUNDARY__[\s\S]*?\/\/ END __OPENNEXT_ERROR_BOUNDARY__\n?/g, '');

  // Add top-level static import for the 6.4MB server handler.
  // This shifts module compilation and initialization to Worker startup (where Cloudflare grants
  // up to 1,000ms CPU startup time), completely preventing the 10ms CPU limit (exceededCpu 503)
  // on Cloudflare Free tier requests.
  const handlerImport = `
// __OPENNEXT_SERVER_HANDLER_IMPORT__
import { handler as serverHandler } from "./server-functions/default/handler.mjs";
// END __OPENNEXT_SERVER_HANDLER_IMPORT__
`;

  content = handlerImport.trim() + '\n' + content;

  const replacement = `
// __OPENNEXT_ERROR_BOUNDARY__
export default {
    async fetch(request, env, ctx) {
        try {
            return await runWithCloudflareRequestContext(request, env, ctx, async () => {
                const response = maybeGetSkewProtectionResponse(request);
                if (response) {
                    return response;
                }
                const url = new URL(request.url);
                if (url.pathname.startsWith("/cdn-cgi/image/")) {
                    return handleCdnCgiImageRequest(url, env);
                }
                if (url.pathname ===
                    \`\${globalThis.__NEXT_BASE_PATH__ || ""}/_next/image\${globalThis.__TRAILING_SLASH__ ? "/" : ""}\`) {
                    return await handleImageRequest(url, request.headers, env);
                }
                // Fast path: try serving directly from Cloudflare Static Assets
                // Pre-rendered pages (e.g. /, /about, /services, etc.) take 0ms Worker CPU,
                // completely preventing Cloudflare Error 1102 (exceeded CPU time limit).
                if (env.ASSETS && request.method === "GET") {
                    try {
                        const assetResponse = await env.ASSETS.fetch(request);
                        if (assetResponse && assetResponse.status !== 404) {
                            return assetResponse;
                        }
                    } catch (_) {}
                }
                const reqOrResp = await middlewareHandler(request, env, ctx);
                if (reqOrResp instanceof Response) {
                    return reqOrResp;
                }
                return await serverHandler(reqOrResp, env, ctx, request.signal);
            });
        } catch (error) {
            console.error("[CRITICAL WORKER EXCEPTION]", error);
            const errStack = error?.stack || String(error);
            const errCause = error?.cause ? \`\\nCause: \${JSON.stringify(error.cause, Object.getOwnPropertyNames(error.cause))}\` : "";
            return new Response(
                \`[Cloudflare Worker Exception Caught]\\n\\n\${errStack}\${errCause}\`,
                {
                    status: 500,
                    headers: {
                        "content-type": "text/plain; charset=utf-8",
                        "x-worker-error": "true"
                    }
                }
            );
        }
    },
};
// END __OPENNEXT_ERROR_BOUNDARY__
`;

  const fullFetchPattern = /export default\s*\{[\s\S]*?\};\s*$/;
  if (fullFetchPattern.test(content)) {
    content = content.replace(fullFetchPattern, replacement.trim());
  } else {
    content = content.trim() + '\n\n' + replacement.trim() + '\n';
  }

  fs.writeFileSync(workerPath, content, 'utf8');
  console.log('✓ Successfully patched .open-next/worker.js (Durable Objects stripped, static serverHandler hoisted to top-level, & error boundary injected).');
}

// 2. Patch .open-next/server-functions/default/handler.mjs for preview-props.json manifest
const handlerPath = path.resolve('.open-next/server-functions/default/handler.mjs');
if (fs.existsSync(handlerPath)) {
  let handlerContent = fs.readFileSync(handlerPath, 'utf8');
  if (handlerContent.includes('Unexpected loadManifest')) {
    handlerContent = handlerContent.replace(
      /throw new Error\(`Unexpected loadManifest\(\$\{[^}]+\}\) call!`\)/g,
      '{return {previewModeId:"sijam-preview-id",previewModeSigningKey:"sijam-preview-key",previewModeEncryptionKey:"sijam-preview-enc-key"}}'
    );
    fs.writeFileSync(handlerPath, handlerContent, 'utf8');
    console.log('✓ Successfully patched handler.mjs to safely resolve preview-props manifest.');
  }
}

// 3. Copy all pre-rendered HTML and RSC files into .open-next/assets
// This ensures Cloudflare's Edge Static Assets router serves all pre-rendered pages directly
// without executing the heavy 6.4MB Node.js runtime, eliminating Error 1102 (CPU time limit exceeded).
const nextAppDir = path.resolve('.next/server/app');
const openNextAssetsDir = path.resolve('.open-next/assets');

if (fs.existsSync(nextAppDir) && fs.existsSync(openNextAssetsDir)) {
  let copiedCount = 0;
  function copyStaticHtml(dir, relative = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath = path.join(relative, entry.name);
      if (entry.isDirectory()) {
        copyStaticHtml(fullPath, relPath);
      } else if (entry.name.endsWith('.html') && !entry.name.startsWith('_')) {
        const targetPath = path.join(openNextAssetsDir, relPath);
        fs.mkdirSync(path.dirname(targetPath), { recursive: true });
        fs.copyFileSync(fullPath, targetPath);
        copiedCount++;

        // For non-index files, also create folder/index.html for trailing slash compatibility
        if (entry.name !== 'index.html') {
          const folderName = entry.name.replace(/\.html$/, '');
          const folderIndex = path.join(openNextAssetsDir, relative, folderName, 'index.html');
          fs.mkdirSync(path.dirname(folderIndex), { recursive: true });
          fs.copyFileSync(fullPath, folderIndex);
        }
      }
    }
  }

  copyStaticHtml(nextAppDir);
  console.log(`✓ Successfully copied ${copiedCount} pre-rendered HTML pages into .open-next/assets for zero-CPU edge serving.`);
}
