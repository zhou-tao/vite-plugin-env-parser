type Prefix = string | string[] | undefined

type ParseType = 'number' | 'string' | 'boolean'

const TYPE_SUFFIX_REGEX = /\|(number|string|boolean)$/

export function parse(env: Record<string, string>, prefix: Prefix = 'VITE_') {
  const metaEnv: any = {}
  for (const key in env) {
    const targetEnv: string = env[key]
    const prefixes = Array.isArray(prefix) ? prefix : [prefix]
    if (prefixes.every(p => !key.startsWith(p))) {
      metaEnv[key] = targetEnv
      continue
    }
    try {
      const needForceParse = TYPE_SUFFIX_REGEX.test(targetEnv)
      if (needForceParse) {
        const type = targetEnv.match(TYPE_SUFFIX_REGEX)![1]
        const value = targetEnv.replace(TYPE_SUFFIX_REGEX, '')
        metaEnv[key] = forceParse(type as ParseType, value)
      }
      else {
        metaEnv[key] = JSON.parse(targetEnv)
      }
    }
    catch (err) {
      metaEnv[key] = targetEnv
    }
  }
  return metaEnv
}

function forceParse(type: ParseType, value: string) {
  switch (type) {
    case 'number':
      return Number(value)
    case 'boolean':
      return value === 'true'
    default:
      return value // default is same as string
  }
}
