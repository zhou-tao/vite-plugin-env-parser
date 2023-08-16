import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import envParser, { parse } from 'vite-plugin-env-parser'

export default defineConfig(({ mode }) => {
  const a: EnvTypes = {}
  const envPrefix = ['VITE_', 'APP_']
  const { VITE_PORT } = parse(loadEnv(mode, process.cwd(), envPrefix))
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
