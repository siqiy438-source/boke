import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');

    // GitHub Pages 配置
    // 如果设置了 BASE_PATH 环境变量，使用它；否则默认使用 '/'
    // 对于 GitHub Pages：
    // - 如果仓库名是 username.github.io，base 应该是 '/'
    // - 否则 base 应该是 '/仓库名/'
    const base = process.env.BASE_PATH || '/';

    return {
      base,
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      // Build optimizations (bundle-* rules)
      build: {
        // Enable minification
        minify: 'esbuild',
        // Target modern browsers for smaller bundles
        target: 'es2020',
        // Chunk splitting for better caching
        rollupOptions: {
          output: {
            manualChunks: {
              // Vendor chunk for React
              'react-vendor': ['react', 'react-dom'],
              // Separate chunk for Supabase (loaded only when needed)
              'supabase': ['@supabase/supabase-js'],
              // Icons chunk (tree-shaken by direct imports)
              'icons': ['lucide-react'],
            },
          },
        },
        // Enable source maps for production debugging
        sourcemap: false,
        // Increase chunk size warning limit
        chunkSizeWarningLimit: 500,
      },
      // Optimize dependencies
      optimizeDeps: {
        include: ['react', 'react-dom', 'lucide-react'],
      },
    };
});
