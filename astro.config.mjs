import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.hkml.ai',
  output: 'static',
  integrations: [sitemap()],
  // Also keeps builds reliable in restricted Windows CI environments where
  // Vite cannot run the `net use` probe used by its realpath optimization.
  vite: {
    resolve: { preserveSymlinks: true },
    optimizeDeps: { noDiscovery: true, include: [] },
  },
});
