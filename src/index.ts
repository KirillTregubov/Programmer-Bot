import * as dotenv from 'dotenv'
dotenv.config()
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js'
import { Command } from './lib/types'
import commands from './commands/index.js'

interface BotClient extends Client {
  commands: Collection<string, Command>
}

console.log(
  'Started bot on',
  new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })
)

const token = process.env.DISCORD_TOKEN
const clientId = process.env.DISCORD_CLIENT_ID
if (!token || !clientId)
  throw new Error(
    'Missing environment variables DISCORD_TOKEN or DISCORD_CLIENT_ID'
  )

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
}) as BotClient
console.log(
  `Add Bot to your server: https://discord.com/oauth2/authorize?client_id=${clientId}&permissions=268435456&scope=applications.commands%20bot`
)

// Load commands
client.commands = new Collection()
commands.forEach((command) => {
  client.commands.set(command.data.name, command)
})
console.log(
  'Loaded commands:',
  client.commands.map((command) => command.data.name).join(', ')
)

client.once(Events.ClientReady, (event) => {
  console.log(`Logged in as ${event.user.tag}`)
})

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return

  const command = client.commands.get(interaction.commandName)
  if (!command) return

  try {
    await command.execute(client, interaction)
  } catch (error) {
    console.error(error)
    await interaction.reply({
      content: 'Encountered an error while executing this command!',
      ephemeral: true
    })
  }
})

client.login(token)
