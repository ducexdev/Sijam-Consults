import fs from 'node:fs';
import path from 'node:path';

const workerPath = path.resolve('.open-next/worker.js');

if (fs.existsSync(workerPath)) {
  let content = fs.readFileSync(workerPath, 'utf8');

  // Check if already patched
  if (!content.includes('__OPENNEXT_ERROR_BOUNDARY__')) {
    const originalExportPattern = /export default\s*\{[\s\S]*?async\s*fetch\s*\([^)]*\)\s*\{/;
    
    // Replace export default with a resilient try/catch wrapped fetch
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
                const { handler } = await import("./server-functions/default/handler.mjs");
                return await handler(reqOrResp, env, ctx, request.signal);
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

    // Replace the default fetch handler
    const fullFetchPattern = /export default\s*\{[\s\S]*?\};\s*$/;
    if (fullFetchPattern.test(content)) {
      content = content.replace(fullFetchPattern, replacement.trim());
      fs.writeFileSync(workerPath, content, 'utf8');
      console.log('✓ Successfully patched .open-next/worker.js with error boundary.');
    } else {
      console.warn('⚠️ Could not find default export pattern in .open-next/worker.js');
    }
  } else {
    console.log('✓ .open-next/worker.js is already patched.');
  }
} else {
  console.log('ℹ .open-next/worker.js not found yet (will be patched after build).');
}
