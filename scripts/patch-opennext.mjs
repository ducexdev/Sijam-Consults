import fs from 'node:fs';
import path from 'node:path';

const loadManifestPath = path.resolve('node_modules/@opennextjs/cloudflare/dist/cli/build/patches/plugins/load-manifest.js');

if (fs.existsSync(loadManifestPath)) {
  let content = fs.readFileSync(loadManifestPath, 'utf8');
  let changed = false;

  // Add preview-props to glob pattern
  if (!content.includes('preview-props}')) {
    content = content.replace(
      '**/{*-manifest,required-server-files,prefetch-hints}.json',
      '**/{*-manifest,required-server-files,prefetch-hints,preview-props}.json'
    );
    changed = true;
  }

  // Add preview-props to fallback list
  if (!content.includes('p.endsWith("preview-props")')) {
    content = content.replace(
      'p.endsWith("prefetch-hints"))',
      'p.endsWith("prefetch-hints") || p.endsWith("preview-props"))'
    );
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(loadManifestPath, content, 'utf8');
    console.log('✓ Successfully patched @opennextjs/cloudflare load-manifest plugin.');
  } else {
    console.log('✓ @opennextjs/cloudflare load-manifest plugin is already patched.');
  }
} else {
  console.log('ℹ load-manifest.js not found in node_modules.');
}
