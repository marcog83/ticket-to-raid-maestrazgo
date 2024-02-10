/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react';
import remarkGfm from 'remark-gfm';
// https://vitejs.dev/config/
export default defineConfig({
  base: '/ticket-to-raid-maestrazgo/',

  plugins: [
    { enforce: 'pre',
      ...mdx({
        remarkPlugins: [ remarkGfm ],
      }) },
    react(),
  ],
});
