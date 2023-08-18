import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import envParser, { parse } from 'vite-plugin-env-parser'

export default defineConfig(({ mode }) => {
  const root = process.cwd()
  const envPrefix = ['VITE_', 'APP_']
  const { VITE_PORT } = parse(loadEnv(mode, root, envPrefix))
  return {
    root,
    envPrefix,
    plugins: [
      vue(),
      envParser({
        dts: 'src/vite-env.d.ts', // or set .d.ts filepath. eg. 'src/vite-env.d.ts'
        injectViteDTS: true // inject `/// <reference types="vite/client" />`
      })
    ],
    server: {
      port: VITE_PORT
    }
  }
})
