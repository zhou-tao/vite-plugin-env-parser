import type { Plugin } from 'vite'
import type { EnvParserOptions } from './types'
import { parse } from './parser'
import { generateDTS } from './generator'

export default function vitePluginEnvParse(options: EnvParserOptions = {}): Plugin {
  return {
    name: 'vite-plugin-env-parser',
    configResolved(config) {
      const { root, env, envPrefix } = config
      // @ts-expect-error parse env type
      config.env = parse(env, envPrefix)
      const { dts, injectAtEnd } = options
      if (dts) generateDTS(dts, root, config.env, injectAtEnd)
    }
  }
}

export const parseEnv = parse

export * from './types'
