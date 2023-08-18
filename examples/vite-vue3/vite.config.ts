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
        dts: true
      })
    ],
    server: {
      port: VITE_PORT
    }
  }
})
