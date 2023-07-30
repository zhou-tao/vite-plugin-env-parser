import type { Plugin } from 'vite'
import type { EnvParserOptions } from './types'

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

function parse(env: Record<string, string>, prefix: string | string[] | undefined = 'VITE_') {
  const metaEnv: any = {}
  for (const key in env) {
    const targetEnv: string = env[key]
    if ((typeof key === 'string' && !key.startsWith(prefix as string))
    || (Array.isArray(prefix) && !prefix.some(p => key.startsWith(p)))) {
      metaEnv[key] = targetEnv
      continue
    }
    try {
      metaEnv[key] = JSON.parse(targetEnv)
    }
    catch (err) {
      metaEnv[key] = targetEnv
    }
  }
  return metaEnv
}

export * from './types'
