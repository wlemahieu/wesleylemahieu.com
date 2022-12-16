import { defineConfig } from 'vite';
import path from 'path';
import solidPlugin from 'vite-plugin-solid';
import eslint from 'vite-plugin-eslint';
import suidPlugin from '@suid/vite-plugin';

export default defineConfig({
  plugins: [
    suidPlugin(),
    solidPlugin(),
    {
      // default settings on build (i.e. fail on error)
      ...eslint(),
      apply: 'build',
    },
    {
      // do not fail on serve (i.e. local development)
      ...eslint({
        failOnWarning: false,
        failOnError: false,
      }),
      apply: 'serve',
      enforce: 'post',
    },
  ],
  server: {
    port: 1111,
    proxy: {
      '/v1': {
        target: 'http://localhost:2222',
        changeOrigin: true,
      },
    },
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@views': path.resolve(__dirname, './src/views'),
    },
  },
});
