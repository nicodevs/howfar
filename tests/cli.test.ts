import { describe, expect, it } from 'vitest'
import { parseCities } from '../lib/cli.js'

describe('parseCities', () => {
  it('returns a single city', () => {
    expect(parseCities('Tokyo')).toEqual(['Tokyo'])
  })

  it('splits and trims several cities', () => {
    expect(parseCities(' Tokyo ,San Francisco, Lima')).toEqual(['Tokyo', 'San Francisco', 'Lima'])
  })

  it.each(['', ' , ', 'Tokyo,,Lima'])('rejects %j', (value) => {
    expect(() => parseCities(value)).toThrow('Expected a comma-separated list of cities')
  })
})
