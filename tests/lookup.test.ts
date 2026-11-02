import { describe, expect, it, vi } from 'vitest'
import { runCommand } from 'citty'
import { lookup } from '../commands/lookup.js'
import { fetchDistance, fetchDistances } from '../lib/distance.js'

vi.mock('../lib/config.js', () => ({
  resolveConfig: (from?: string) => ({ from: from ?? 'Lisbon', unit: 'km' }),
}))

vi.mock('../lib/distance.js', () => ({
  fetchDistance: vi.fn(async () => ({ ok: true })),
  fetchDistances: vi.fn(async () => ({ ok: true })),
}))

describe('lookup', () => {
  it('measures from your city by default', async () => {
    await runCommand(lookup, { rawArgs: ['Tokyo'] })

    expect(fetchDistance).toHaveBeenCalledWith('Tokyo', 'Lisbon', 'km')
  })

  it('measures from another city with --from', async () => {
    await runCommand(lookup, { rawArgs: ['Tokyo', '--from', 'Lima'] })

    expect(fetchDistance).toHaveBeenCalledWith('Tokyo', 'Lima', 'km')
  })

  it('measures several cities', async () => {
    await runCommand(lookup, { rawArgs: ['Tokyo, San Francisco'] })

    expect(fetchDistances).toHaveBeenCalledWith(['Tokyo', 'San Francisco'], 'Lisbon', 'km')
  })
})
