import type { Plugin } from 'vite'
import type { EnvParserOptions } from './types'
import { parse } from './parser'

export default function vitePluginEnvParse(opts: EnvParserOptions = {}): Plugin {
  return {
    name: 'vite-plugin-env-parser',
    configResolved(config) {
      const { env, envPrefix } = config
      // @ts-expect-error parse-env
      config.env = parse(env, envPrefix)
    }
  }
}

export * from './types'
