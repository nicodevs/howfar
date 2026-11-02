type Place = { name: string; country: string; latitude: number; longitude: number }

type Unit = 'km' | 'mi'

const EARTH_RADIUS: Record<Unit, number> = { km: 6371, mi: 3959 }

async function geocode(city: string): Promise<Place> {
  const url = new URL('https://geocoding-api.open-meteo.com/v1/search')
  url.searchParams.set('name', city)
  url.searchParams.set('count', '1')

  const response = await fetch(url)
  const data = (await response.json()) as { results?: Place[] }
  const place = data.results?.[0]

  if (!place) {
    throw new Error(`Could not find a city called "${city}"`)
  }

  return place
}

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180
}

/** Shortest distance over the Earth's surface between two places, using the haversine formula. */
function distanceBetween(a: Place, b: Place, unit: Unit): number {
  const latitude = toRadians(b.latitude - a.latitude)
  const longitude = toRadians(b.longitude - a.longitude)
  const h =
    Math.sin(latitude / 2) ** 2 +
    Math.cos(toRadians(a.latitude)) * Math.cos(toRadians(b.latitude)) * Math.sin(longitude / 2) ** 2

  return Math.round(2 * EARTH_RADIUS[unit] * Math.asin(Math.sqrt(h)))
}

function describe(place: Place, from: Place, unit: Unit) {
  const distance = distanceBetween(from, place, unit)

  return {
    city: `${place.name}, ${place.country}`,
    latitude: place.latitude,
    longitude: place.longitude,
    distance,
    unit,
    summary: `${place.name} is ${distance.toLocaleString('en-US')} ${unit} from ${from.name}`,
  }
}

async function fetchDistance(city: string, from: string, unit: Unit = 'km') {
  const [place, origin] = await Promise.all([geocode(city), geocode(from)])

  return { ok: true, from: `${origin.name}, ${origin.country}`, ...describe(place, origin, unit) }
}

async function fetchDistances(cities: string[], from: string, unit: Unit = 'km') {
  const [places, origin] = await Promise.all([Promise.all(cities.map(geocode)), geocode(from)])

  return {
    ok: true,
    from: `${origin.name}, ${origin.country}`,
    cities: places.map((place) => describe(place, origin, unit)),
  }
}

export { geocode, distanceBetween, fetchDistance, fetchDistances }

export type { Place, Unit }
