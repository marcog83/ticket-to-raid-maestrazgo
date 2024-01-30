/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react';
import remarkGfm from 'remark-gfm';
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api-user-preferences': {
        target: 'https://m-3-sit.adidas.com/3d-party/user-preferences',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api-user-preferences/, ''),
      },
    },
  },
  plugins: [
    { enforce: 'pre',
      ...mdx({
        remarkPlugins: [ remarkGfm ],
      }) },
    react(),
  ],
});
