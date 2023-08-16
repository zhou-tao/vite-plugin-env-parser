/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORT: number
  readonly VITE_YOUR_NAME: string
  readonly VITE_YOUR_AGE: number
  readonly VITE_IS_IKUN: boolean
  readonly VITE_KUN_JOBS: string
  readonly APP_YOUR_NAME: string
  readonly APP_YOUR_AGE: string
  readonly APP_IS_IKUN: string
  readonly APP_KUN_JOBS: string[]
  readonly BASE_URL: string
  readonly MODE: string
  readonly DEV: boolean
  readonly PROD: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
