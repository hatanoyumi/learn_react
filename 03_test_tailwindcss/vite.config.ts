import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

const stage = process.env.STAGE;

const proxy = {
  '/server': {
    // target: 'http://10.162.5.55:8080',
    target: 'http://10.162.0.50:8080', // TODO: Update later
    rewrite: (path: string) => path.replace('/server', ''),
    changeOrigin: true,
  },
  '/nstatic': {
    // target: 'http://10.162.5.55',
    target: 'http://10.162.0.50', // TODO: Update later
    rewrite: (path: string) => path.replace('/thisisNAS/careers/static', ''),
    changeOrigin: true,
  },
};

export default defineConfig({
  plugins: [svgr(), react({})],
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(), // add options if needed
      ],
    },
  },
  resolve: {
    alias: [
      { find: '@src', replacement: '/src' },
      {
        find: '@components',
        replacement: resolve(__dirname, 'src/components'),
      },
      { find: '@styles', replacement: resolve(__dirname, 'src/styles') },
      { find: '@pages', replacement: resolve(__dirname, 'src/pages') },
      { find: '@common', replacement: resolve(__dirname, 'src/common') },
      { find: '@utils', replacement: resolve(__dirname, 'src/utils') },
      { find: '@icons', replacement: resolve(__dirname, 'src/common/icons') },
    ],
  },
  server: {
    proxy: stage !== 'PRODUCTION' ? { ...proxy } : {},
  },
});
