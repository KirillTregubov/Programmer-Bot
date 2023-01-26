import {
  CommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
  Client,
  EmbedBuilder
} from 'discord.js'
import prisma from '../lib/db.js'
import { roleName } from './config.js'

const ApplyList = {
  data: new SlashCommandBuilder()
    .setName('applylist')
    .setDescription('Get the top 10 people on the early adopter waitlist.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
  async execute(client: Client, interaction: CommandInteraction) {
    if (!interaction.guild) return

    const guildID = parseInt(interaction.guild.id)
    try {
      const waitlist = await prisma.waitlist.findMany({
        where: {
          guildID: guildID
        },
        take: 10
      })
      if (!waitlist.length)
        return interaction.reply({
          content: `There are no users on the waitlist.`,
          ephemeral: true
        })

      if (!waitlist.length || waitlist.length === 0)
        return interaction.reply({
          content: `The waitlist is clear! 🥳`,
          ephemeral: true
        })

      const embed = new EmbedBuilder()
        .setColor(0x6366f1)
        .setDescription(`People on the \`${roleName}\` waitlist:`)
        .setTimestamp()
        .addFields(
          {
            name: 'Discord Tag',
            value: waitlist[0].tag,
            inline: true
          },
          {
            name: 'Email',
            value: waitlist[0].email,
            inline: true
          },
          {
            name: 'Date & Time (EST)',
            value: waitlist[0].createdAt.toLocaleString(),
            inline: true
          }
        )

      waitlist.slice(1).forEach((user) => {
        embed.addFields(
          {
            name: '----------',
            value: user.tag,
            inline: true
          },
          {
            name: '\u200B',
            value: user.email,
            inline: true
          },
          {
            name: '\u200B',
            value: user.createdAt.toLocaleString(),
            inline: true
          }
        )
      })

      return interaction.reply({
        ephemeral: true,
        embeds: [embed]
      })
    } catch (error) {
      console.log(error)
      return interaction.reply({
        content: `An error occurred while fetching waitlist.`,
        ephemeral: true
      })
    }
  }
}

export default ApplyList
