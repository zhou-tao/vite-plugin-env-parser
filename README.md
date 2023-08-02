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

then add plugin in `vite.config.ts`

```js
import { defineConfig } from 'vite'
import envParser from 'vite-plugin-env-parser'

export default defineConfig({
  plugins: [
    // ...
    envParser()
  ]
})
```

### Usage

`.env` or `.env.xxx` file:

```bash
# auto convert to number
VITE_PORT=3000

# hold string
VITE_APP_TITLE=demo

# auto convert to boolean
VITE_DROP_CONSOLE=false

# force covert to string
VITE_FORCE_STRING=true|string
```

more information in this [example app](https://github.com/zhou-tao/vite-plugin-env-parser/tree/main/examples/vite-vue3).