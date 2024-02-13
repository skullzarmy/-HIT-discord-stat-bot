const { SlashCommandBuilder } = require("discord.js");

const data = new SlashCommandBuilder().setName("beep").setDescription("Replies with Boop!");

const execute = async (interaction) => {
    await interaction.reply("Boop!");
};

module.exports = {
    data,
    execute,
};
