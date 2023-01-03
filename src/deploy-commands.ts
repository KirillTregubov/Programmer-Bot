import * as dotenv from 'dotenv'
dotenv.config()
import { REST, Routes } from 'discord.js'
import commands from './commands/index.js'

const token = process.env.DISCORD_TOKEN
const clientId = process.env.DISCORD_CLIENT_ID
const guildId = process.env.DISCORD_DEBUG_GUILD_ID
const deployingGlobal = process.env.DEPLOY_GLOBAL === 'true' || false
if (!token || !clientId || (!deployingGlobal && !guildId))
  throw new Error(
    'Missing environment variables DISCORD_TOKEN, DISCORD_CLIENT_ID or DISCORD_DEBUG_GUILD_ID'
  )

const rest = new REST({ version: '10' }).setToken(token)
const commandsData = commands.map((command) => command.data.toJSON())

console.log(
  'Deploying commands:',
  commands.map((command) => command.data.name).join(', ')
)
if (deployingGlobal) console.log('Deploying global commands.')
else console.log(`Deploying guild commands to guild ${guildId}.`)

try {
  console.log(`Started refreshing ${commands.length} application (/) commands.`)
  const fn = deployingGlobal
    ? Routes.applicationCommands
    : Routes.applicationGuildCommands
  const args = deployingGlobal ? [clientId] : [clientId, guildId]
  const data = await rest.put(fn.apply(this, args), {
    body: commandsData
  })
  console.log(
    `Successfully reloaded ${
      (data as any).length | 0
    } application (/) commands.`
  )
} catch (error) {
  console.error(error)
}
