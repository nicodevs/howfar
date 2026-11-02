import { z } from 'zod'
import { readUserConfig, writeUserConfig } from 'rc9'

// Lives at ~/.config/howfar.conf so the tool works from any directory.
const RC_NAME = 'howfar.conf'

const configSchema = z.object({
  home: z.string(),
  unit: z.enum(['km', 'mi']).default('km'),
})

type Config = z.infer<typeof configSchema>

function loadConfig(): Config | null {
  const raw = readUserConfig(RC_NAME)

  if (!raw.home) {
    return null
  }

  const result = configSchema.safeParse(raw)

  if (!result.success) {
    throw new Error(`Configuration validation failed:\n${z.prettifyError(result.error)}`)
  }

  return result.data
}

function resolveConfig(from?: string) {
  const config = loadConfig()
  const origin = from ?? config?.home

  if (!origin) {
    throw new Error('No starting city. Run "npx @nicodevs/howfar init" or pass --from.')
  }

  return { from: origin, unit: config?.unit ?? 'km' }
}

function saveConfig(config: Config) {
  writeUserConfig(config, RC_NAME)
}

export { loadConfig, resolveConfig, saveConfig }

export type { Config }
