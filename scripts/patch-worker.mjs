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
