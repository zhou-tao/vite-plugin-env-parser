import { resolve } from 'node:path'
import { loadEnv, type Plugin } from 'vite'
import type { EnvParserOptions } from './types'
import { parse } from './parser'
import { createEnvCode, generateDTS } from './generator'

export default function vitePluginEnvParse(options: EnvParserOptions = {}): Plugin {
  const virtualModuleId = 'vite-env'
  const resolvedVirtualModuleId = `\0${virtualModuleId}`
  let rootDir = process.cwd()
  let parsedEnv = {}
  return {
    name: 'vite-plugin-env-parser',
    config(config, { mode }) {
      const { root = process.cwd(), envDir = '.', envPrefix } = config
      rootDir = root
      const dir = resolve(root, envDir)
      const env = loadEnv(mode, dir, envPrefix)
      parsedEnv = parse(env)
    },
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    configResolved() {
      generateDTS(options.dts, rootDir, parsedEnv)
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return createEnvCode(parsedEnv)
      }
    }
  }
}

export {
  parse
}

export * from './types'
