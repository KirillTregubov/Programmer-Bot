import {
  GuildMember,
  CommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
  Client
} from 'discord.js'

const channelName = 'early-adopters'
const roleName = 'Early Adopter ⭐'

const Adopt = {
  data: new SlashCommandBuilder()
    .setName('adopt')
    .setDescription('Assign the early adopter role to a user.')
    .addUserOption((option) =>
      option
        .setName('target')
        .setDescription('The user to assign the role to.')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .setDMPermission(false),
  async execute(client: Client, interaction: CommandInteraction) {
    const role = await interaction.guild.roles.cache.find(
      (role) => role.name == roleName
    )
    if (!role)
      return interaction.reply({
        content: `Role \`${roleName}\` could not be found.`,
        ephemeral: true
      })

    if (role.position >= interaction.guild.members.me.roles.highest.position)
      return interaction.reply({
        content: `Please ensure my highest role is above \`${roleName}\`!`,
        ephemeral: true
      })

    const member = (await interaction.options.getMember(
      'target'
    )) as GuildMember

    if (member.roles.cache.has(role.id))
      return interaction.reply({
        content: `${member.user} already has the \`${roleName}\` role.`,
        ephemeral: true
      })

    try {
      await member.roles.add(role)
    } catch (error) {
      console.error(error)
      return interaction.reply({
        content: `Could not add the \`${roleName}\` role to ${member.user}.`,
        ephemeral: true
      })
    }

    const channel =
      (await interaction.guild.channels.cache
        .find((channel) => channel.name === channelName)
        ?.toString()) || null
    if (!channel)
      interaction.reply({
        content: `Congratulations ${member?.user}, you are now an \`${roleName}\`. (Error: Unable to find channel #${channelName})`
      })

    await interaction.reply({
      content: `Congratulations ${member?.user}, you are now an \`${roleName}\`! Please use ${channel} to share any suggestions, bug reports, feature requests, and discussions.`
    })
  }
}

export default Adopt
