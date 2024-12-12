import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '/Users/tal/code/GoProject/cloud-core/public', // 打包输出目录
    assetsDir: 'assets', // 静态资源存放目录
    sourcemap: false, // 是否生成 source map
  }
})
