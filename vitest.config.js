import path from 'path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        watch: false,
        include: ['app/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        globals: true,
        environment: 'jsdom'
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './app')
        }
    }
});
