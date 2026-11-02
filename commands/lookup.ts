import { defineCommand } from 'citty'
import { resolveConfig } from '../lib/config.js'
import { parseCities } from '../lib/cli.js'
import { fetchDistance, fetchDistances } from '../lib/distance.js'

const lookup = defineCommand({
  meta: { name: 'howfar', description: 'Distance from your city to one or more cities, as JSON' },
  args: {
    city: {
      type: 'positional',
      required: true,
      description: 'City, or several separated by commas',
    },
    from: {
      type: 'string',
      required: false,
      description: 'City to measure the distance from (defaults to yours)',
    },
  },
  run: async ({ args }) => {
    const { from, unit } = resolveConfig(args.from)
    const cities = parseCities(args.city)

    return cities.length === 1
      ? fetchDistance(cities[0], from, unit)
      : fetchDistances(cities, from, unit)
  },
})

export { lookup }
