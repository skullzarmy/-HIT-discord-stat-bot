const { SlashCommandBuilder } = require("discord.js");
const { getPrice } = require("../../api/price");
const { getHolders, getLPHolders } = require("../../api/holders"); // Updated import
const { stageTokenPost } = require("../../util/post");

const data = new SlashCommandBuilder()
    .setName("token-stats")
    .setDescription("Replies with Tezos $HIT token statistics.");

const execute = async (interaction) => {
    const price = await getPrice();
    const [holders] = await getHolders(); // Main token holders
    const lpHoldersData = await getLPHolders(); // LP token holders

    // Construct LP holders message
    let lpHoldersMessage = lpHoldersData
        .map((lpHolder) => `${lpHolder.name}: ${lpHolder.holdersCount} holders`)
        .join("\n");

    // Assuming stageTokenPost can handle a message with new lines or you might need to adjust
    const post = stageTokenPost("Tezos $HITcoin Token Stats 💩", {
        holders: holders.holdersCount,
        price,
        lpHoldersMessage, // Including LP holders message directly
    });

    await interaction.reply(post);
};

module.exports = {
    data,
    execute,
};
