import { defineConfig } from 'vite';

export default defineConfig({
  assetsInclude: ['**/*.xml'],
  build: {
    assetsInlineLimit: 0,
  },
});
