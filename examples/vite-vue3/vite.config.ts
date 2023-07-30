import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import envParser from '../../dist/index.mjs'

export default defineConfig({
  plugins: [vue(), envParser()]
})
