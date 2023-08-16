import { describe, expect, it } from 'vitest'
import { parse } from '../src/parser'

describe('parser', () => {
  it('parse string', () => {
    expect(parse({ VITE_YOUR_NAME: 'toryz' })).toEqual({ VITE_YOUR_NAME: 'toryz' })
  })

  it('parse number', () => {
    expect(parse({ VITE_PORT: '3000' })).toEqual({ VITE_PORT: 3000 })
    // invalid number
    expect(parse({ VITE_PORT: '0300' })).toEqual({ VITE_PORT: '0300' })
  })

  it('parse boolean', () => {
    expect(parse({ VITE_IS_IKUN: 'true' })).toEqual({ VITE_IS_IKUN: true })
    expect(parse({ VITE_IS_IKUN: 'false' })).toEqual({ VITE_IS_IKUN: false })
  })
})

describe('force parser', () => {
  it('parse string', () => {
    expect(parse({ VITE_YOUR_NAME: 'toryz|string' })).toEqual({ VITE_YOUR_NAME: 'toryz' })
  })

  it('parse string[]', () => {
    expect(parse({ VITE_YOUR_NAME: '["toryz", "hello"]' })).toEqual({ VITE_YOUR_NAME: '["toryz", "hello"]' })
    expect(parse({ VITE_YOUR_NAME: '["toryz", "hello"]|string[]' })).toEqual({ VITE_YOUR_NAME: ['toryz', 'hello'] })
  })

  it('parse number', () => {
    expect(parse({ VITE_PORT: '3000|string' })).toEqual({ VITE_PORT: '3000' })
    expect(parse({ VITE_PORT: '0300|number' })).toEqual({ VITE_PORT: 300 })
    expect(parse({ VITE_PORT: '0300|boolean' })).toEqual({ VITE_PORT: false })
  })

  it('parse number[]', () => {
    expect(parse({ VITE_PORT: '["3000"]|string[]' })).toEqual({ VITE_PORT: ['3000'] })
    expect(parse({ VITE_PORT: '["0300"]|number[]' })).toEqual({ VITE_PORT: [300] })
    expect(parse({ VITE_PORT: '["0300"]|boolean[]' })).toEqual({ VITE_PORT: [false] })
  })

  it('parse boolean', () => {
    expect(parse({ VITE_IS_IKUN: 'true|boolean' })).toEqual({ VITE_IS_IKUN: true })
    expect(parse({ VITE_IS_IKUN: 'true|string' })).toEqual({ VITE_IS_IKUN: 'true' })
    expect(parse({ VITE_IS_IKUN: 'false|number' })).toEqual({ VITE_IS_IKUN: NaN })
  })

  it('parse boolean[]', () => {
    expect(parse({ VITE_IS_IKUN: '[true]|boolean[]' })).toEqual({ VITE_IS_IKUN: [true] })
    expect(parse({ VITE_IS_IKUN: '["true"]|string[]' })).toEqual({ VITE_IS_IKUN: ['true'] })
    expect(parse({ VITE_IS_IKUN: '[false]|number[]' })).toEqual({ VITE_IS_IKUN: [NaN] })
  })
})

describe('parse target', () => {
  it('default prefix', () => {
    expect(parse({ VITE_PORT: '3000', OTHER_ENV: '3001' }))
      .toEqual({ VITE_PORT: 3000, OTHER_ENV: 3001 })
  })

  it('parse number', () => {
    expect(parse({ VITE_PORT: '3000', APP_ENV: '3001', OTHER_ENV: '3002' }))
      .toEqual({ VITE_PORT: 3000, APP_ENV: 3001, OTHER_ENV: 3002 })
  })
})
