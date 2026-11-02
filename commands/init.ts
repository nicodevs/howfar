import { defineCommand } from 'citty'
import { intro, outro, text, select, isCancel, cancel, log } from '@clack/prompts'
import { loadConfig, saveConfig } from '../lib/config.js'

function required(value: string | undefined) {
  return value ? undefined : 'Required'
}

async function runInit() {
  intro('howfar setup')

  const existing = loadConfig()

  const home = await text({
    message: 'Your city',
    placeholder: 'Buenos Aires',
    initialValue: existing?.home ?? '',
    validate: required,
  })
  if (isCancel(home)) {
    return cancel('Setup cancelled')
  }

  const unit = await select({
    message: 'Distance unit',
    options: [
      { value: 'km', label: 'Kilometers' },
      { value: 'mi', label: 'Miles' },
    ],
    initialValue: existing?.unit ?? 'km',
  })
  if (isCancel(unit)) {
    return cancel('Setup cancelled')
  }

  saveConfig({ home, unit })

  log.success('Saved config to ~/.config/howfar.conf')
  outro('Done. Try: npx @nicodevs/howfar Tokyo')
}

const init = defineCommand({
  meta: { name: 'init', description: 'Setup wizard for your city' },
  run: () => runInit(),
})

export { init }
