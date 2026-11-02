#!/usr/bin/env node

import { defineCommand, runCommand, showUsage, type CommandDef } from 'citty'
import { init } from '../commands/init.js'
import { lookup } from '../commands/lookup.js'

const subCommands: Record<string, CommandDef<any>> = {
  init,
}

const main = defineCommand({ ...lookup, subCommands })

async function run() {
  const argv = process.argv.slice(2)
  const [name, ...rest] = argv
  const subCommand = name ? subCommands[name] : undefined
  const wantsHelp = argv.includes('--help') || argv.includes('-h')

  if (wantsHelp) {
    await (subCommand ? showUsage(subCommand, main) : showUsage(main))

    return
  }

  const command = subCommand ?? lookup
  const { result } = await runCommand(command, { rawArgs: subCommand ? rest : argv })

  if (result !== undefined) {
    console.log(JSON.stringify(result, null, 2))
  }
}

run().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
