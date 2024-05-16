import { resolve } from 'node:path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist/src',
    lib: {
      entry: resolve(__dirname, 'src/chart.ts'),
      name: 'TradingChart',
      fileName: 'trading-chart',
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
});
