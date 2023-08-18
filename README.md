# vite-plugin-env-parser

<p>
  <a href="https://npmjs.com/package/vite-plugin-env-parser"><img src="https://img.shields.io/npm/v/vite-plugin-env-parser.svg" alt="npm package"></a>
  <a href="https://github.com/zhou-tao/vite-plugin-env-parser/actions/workflows/ci.yml"><img src="https://github.com/zhou-tao/vite-plugin-env-parser/actions/workflows/ci.yml/badge.svg?branch=main" alt="build status"></a>
</p>

### Why? 

When you add the environment variable in `.env` file, no matter what value you set, you can only get a string value through `import.meta.env`.
So this plugin can helps you automatically convert variable types.

### Install

```bash
pnpm add vite-plugin-env-parser -D
```

add plugin in vite.config.ts

```js
import { defineConfig } from 'vite'
import envParser from 'vite-plugin-env-parser'

export default defineConfig({
  plugins: [
    // ...
    envParser({ /* options */ })
  ]
})
```

### Configuration

```js
envParser({
  // filepath to generate .d.ts for `vite-env`
  // defaults to 'src/env.d.ts' when set true
  // set false to disable
  dts: true
})
```

### Usage

example: .env file

```bash
VITE_APP_TITLE=Hello World!

VITE_PORT=3000

VITE_DROP_CONSOLE=true

VITE_DROP_CONSOLE_STRING=true|string # force convert to string

VITE_MY_LIKES=["sing", "dance", "rap", 666]

VITE_MY_LIKES_STRING=["sing", "dance", "rap", 666]|string[] # force convert to array of string
```

then you can import and use it by **vite-env**. like this:

```js
import { VITE_PORT, VITE_APP_TITLE } from 'vite-env'

console.log(VITE_APP_TITLE) // log 'Hello World!', string
console.log(VITE_PORT) // log 3000, number
console.log(VITE_DROP_CONSOLE) // log true, boolean
console.log(VITE_DROP_CONSOLE_STRING) // log 'true', string
console.log(VITE_MY_LIKES) // log '["sing", "dance", "rap", 666]', string
console.log(VITE_MY_LIKES_STRING) // log ["sing", "dance", "rap", "666"], string[]
```

By default, values of the base type are automatically converted by JSON.stringify. you also can set force type. 
supported `string`、`number`、`boolean`、`string[]`、`number[]`、`boolean[]`

but in vite.config.ts, **vite-env** is not working. you can resolved it like this:
```js
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
```


[Example Usage](https://github.com/zhou-tao/vite-plugin-env-parser/tree/main/examples/vite-vue3)

### License

[MIT](./LICENSE) License &copy; 2023-PRESENT [toryz](https://github.com/zhou-tao)
