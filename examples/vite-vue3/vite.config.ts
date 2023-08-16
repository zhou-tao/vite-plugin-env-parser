import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import envParser, { parseEnv } from 'vite-plugin-env-parser'

export default defineConfig(({ mode }) => {
  const envPrefix = ['VITE_', 'APP_']
  const { VITE_PORT } = parseEnv(loadEnv(mode, process.cwd(), envPrefix))
  return {
    plugins: [
      vue(),
      envParser({
        dts: true
      })
    ],
    envPrefix,
    server: {
      port: VITE_PORT
    }
  }
})
