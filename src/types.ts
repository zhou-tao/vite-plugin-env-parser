export interface EnvParserOptions {
  dts?: string | boolean | string
  injectViteDTS?: boolean
}

export type DTS = string | boolean | undefined

export type ParseType = 'number' | 'string' | 'boolean' | 'number[]' | 'string[]' | 'boolean[]'

export type ParsedValue = string | number | boolean

export interface ViteEnv {
  [key: string]: ParsedValue | ParsedValue[]
}
