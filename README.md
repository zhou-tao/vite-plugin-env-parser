# vite-plugin-env-parser

helps you automatically convert variable types in `.env.xxx` file.

### usage

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