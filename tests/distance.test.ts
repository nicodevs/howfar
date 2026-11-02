import { describe, expect, it } from 'vitest'
import { distanceBetween } from '../lib/distance.js'

const buenosAires = {
  name: 'Buenos Aires',
  country: 'Argentina',
  latitude: -34.61315,
  longitude: -58.37723,
}
const tokyo = { name: 'Tokyo', country: 'Japan', latitude: 35.6895, longitude: 139.69171 }

describe('distanceBetween', () => {
  it('measures the distance in kilometers', () => {
    expect(distanceBetween(buenosAires, tokyo, 'km')).toBe(18370)
  })

  it('measures the distance in miles', () => {
    expect(distanceBetween(buenosAires, tokyo, 'mi')).toBe(11415)
  })

  it('returns zero for the same place', () => {
    expect(distanceBetween(tokyo, tokyo, 'km')).toBe(0)
  })
})
