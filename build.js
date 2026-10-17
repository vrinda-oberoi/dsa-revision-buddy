/**
 * Build script using esbuild
 * Bundles content script, popup, and background service worker.
 */

import * as esbuild from 'esbuild';

async function build() {
  console.log('[Build] Bundling Chrome Extension files...');

  // 1. Content Script (IIFE format so it runs directly in LeetCode page without module loader issues)
  await esbuild.build({
    entryPoints: ['content/content.js'],
    bundle: true,
    outfile: 'content/content.bundle.js',
    format: 'iife',
    platform: 'browser',
    target: ['chrome100'],
    minify: false,
    sourcemap: true
  });
  console.log('✓ content/content.bundle.js');

  // 2. Popup Script
  await esbuild.build({
    entryPoints: ['popup/popup.js'],
    bundle: true,
    outfile: 'popup/popup.bundle.js',
    format: 'esm',
    platform: 'browser',
    target: ['chrome100'],
    minify: false,
    sourcemap: true
  });
  console.log('✓ popup/popup.bundle.js');

  // 3. Background Script
  await esbuild.build({
    entryPoints: ['background/background.js'],
    bundle: true,
    outfile: 'background/background.bundle.js',
    format: 'esm',
    platform: 'browser',
    target: ['chrome100'],
    minify: false,
    sourcemap: true
  });
  console.log('✓ background/background.bundle.js');

  console.log('[Build] Completed successfully!');
}

build().catch((err) => {
  console.error('[Build Error]', err);
  process.exit(1);
});
