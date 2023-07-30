/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_YOUR_NAME: string
  readonly VITE_YOUR_AGE: number
  readonly VITE_IS_IKUN: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
