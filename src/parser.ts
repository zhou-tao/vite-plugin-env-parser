type Prefix = string | string[] | undefined

type ParseType = 'number' | 'string' | 'boolean' | 'number[]' | 'string[]' | 'boolean[]'

const TYPE_SUFFIX_REGEX = /\|(number|string|boolean)(\[\])?$/

const LIKE_ARRAY_REGEX = /^\[.*\]$/

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
        const type = targetEnv.match(TYPE_SUFFIX_REGEX)![0].slice(1)
        const value = targetEnv.replace(TYPE_SUFFIX_REGEX, '')
        if (type.endsWith('[]')) {
          const array = JSON.parse(value) // array item need double quotes in env
          metaEnv[key] = []
          for (const item of array) {
            metaEnv[key].push(forceParse(type.replace('[]', '') as ParseType, item))
          }
        }
        else {
          metaEnv[key] = forceParse(type as ParseType, value)
        }
      }
      else if (LIKE_ARRAY_REGEX.test(targetEnv)) {
        // not parsed by default
        metaEnv[key] = targetEnv
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
      return parseInt(value)
    case 'boolean':
      return value.toString() === 'true' // 'true' or true
    case 'string':
      return value.toString()
    default:
      return value
  }
}
