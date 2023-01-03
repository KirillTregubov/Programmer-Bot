import { Client, CommandInteraction, SlashCommandBuilder } from 'discord.js'

const Ping = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Sends a ping to the bot'),
  execute: async (client: Client, interaction: CommandInteraction) => {
    const content = `🏓 Pong! It took me ${(
      (Date.now() - interaction.createdTimestamp) /
      1000
    ).toFixed(2)}s to respond, and my latency is ${Math.round(
      client.ws.ping
    )}ms.`

    await interaction.reply({
      content,
      ephemeral: true
    })
  }
}

export default Ping
