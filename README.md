# howfar

How far any city is from yours, as JSON.

```bash
npx @nicodevs/howfar init
npx @nicodevs/howfar Tokyo
```

```json
{
  "ok": true,
  "from": "Buenos Aires, Argentina",
  "city": "Tokyo, Japan",
  "latitude": 35.6895,
  "longitude": 139.69171,
  "distance": 18370,
  "unit": "km",
  "summary": "Tokyo is 18,370 km from Buenos Aires"
}
```

## Usage

```bash
# Set your city and distance unit (km or mi)
npx @nicodevs/howfar init

# Distance from your city to another
npx @nicodevs/howfar Tokyo

# Several cities at once
npx @nicodevs/howfar "Tokyo, San Francisco"

# Measure from somewhere else for a single run
npx @nicodevs/howfar Tokyo --from Lima
```

Your settings live in `~/.config/howfar.conf`. Cities are found with the free [Open-Meteo geocoding API](https://open-meteo.com/en/docs/geocoding-api), and distances are calculated with the haversine formula.

## About

howfar is the example project from [Build Command Line Tools in TypeScript: A Step-by-Step Guide](https://nicodevs.com/blog/build-command-line-tools-in-typescript-a-step-by-step-guide). It uses [citty](https://github.com/unjs/citty), [@clack/prompts](https://github.com/bombshell-dev/clack), [rc9](https://github.com/unjs/rc9), [zod](https://zod.dev/) and [Vite+](https://viteplus.dev/).

## Development

```bash
npm install
npm test
npm run build
node dist/howfar.mjs Tokyo --from "Buenos Aires"
```

## License

MIT
