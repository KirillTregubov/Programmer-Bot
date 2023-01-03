import { CommandInteraction, Client, SlashCommandBuilder } from 'discord.js'

export interface Command {
  data: SlashCommandBuilder
  execute?: (client: Client, interaction: CommandInteraction) => void
}
