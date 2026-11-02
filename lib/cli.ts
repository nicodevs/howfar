/** Split a comma-separated list into one or more city names. */
function parseCities(value: string): [string, ...string[]] {
  const [first, ...rest] = value.split(',').map((city) => city.trim())

  if (!first || rest.some((city) => city === '')) {
    throw new Error(`Expected a comma-separated list of cities, got "${value}"`)
  }

  return [first, ...rest]
}

export { parseCities }
