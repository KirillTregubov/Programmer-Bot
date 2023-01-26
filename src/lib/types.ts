import { CommandInteraction, Client, SlashCommandBuilder } from 'discord.js'

export interface Command {
  data:
    | Omit<SlashCommandBuilder, 'addSubcommandGroup' | 'addSubcommand'>
    | SlashCommandBuilder
  execute?: (client: Client, interaction: CommandInteraction) => void
}
