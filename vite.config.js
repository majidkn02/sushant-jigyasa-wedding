import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { transformHtml } from './build/html-meta.js';

/**
 * base: './' → every asset path in the build is relative, so the site works on
 * GitHub Pages at https://<user>.github.io/<any-repo-name>/ without changes,
 * and also when the dist folder is uploaded manually.
 */
export default defineConfig({
  base: './',
  plugins: [
    react(),
    {
      // Fills <head> from src/data/weddingData.js and (build only) guarantees
      // that no root-relative "/..." path is left in dist/index.html.
      name: 'wedding-index-html',
      transformIndexHtml: {
        order: 'post',
        handler: (html, ctx) => transformHtml(html, { build: !ctx.server }),
      },
    },
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // keep fonts/images as separate files (better caching than inlining)
    assetsInlineLimit: 0,
  },
  server: {
    host: true,
  },
  preview: {
    host: true,
  },
});
