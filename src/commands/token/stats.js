const { SlashCommandBuilder } = require("discord.js");
const { getPrice } = require("../../api/price");
const { getHolders, getLPHolders } = require("../../api/holders");
const { stageTokenPost } = require("../../util/post");

const data = new SlashCommandBuilder()
    .setName("token-stats")
    .setDescription("Replies with Tezos $HIT token statistics.");

const execute = async (interaction) => {
    try {
        await interaction.deferReply();

        const mainTokenContract = "KT1LrYH1qE2zipJGfmtvu9grEp3ZRgpd6EYc";
        const mainTokenId = 0;

        // Assuming getPrice returns an object formatted as expected by stageTokenPost
        const price = await getPrice(mainTokenContract, mainTokenId);

        // Directly fetch the holders count as a number
        const mainTokenHoldersCount = await getHolders(mainTokenContract, mainTokenId);
        const mainTokenHolders = mainTokenHoldersCount ? mainTokenHoldersCount.toString() : "N/A";

        const lpHoldersData = await getLPHolders();
        // console.log("LP Holders Data:", lpHoldersData); // Debug: Inspect this output
        // const lpHoldersMessage = lpHoldersData
        //     .map(
        //         (lpHolder) =>
        //             `${lpHolder.name}: ${lpHolder.holdersCount} holders, TVL: ~ꜩ ${lpHolder.tvlXtz} / ~$ ${lpHolder.tvlUsd}`
        //     )
        //     .join("\n");
        const lpHoldersMessage = lpHoldersData
            .map((lpHolder) => `${lpHolder.name}: ${lpHolder.holdersCount} staker(s)`)
            .join("\n");

        // Format message with detailed price information
        const formattedPost = stageTokenPost("Tezos $HITcoin Token Stats 💩", {
            holders: mainTokenHolders,
            price, // Assuming price is correctly structured for stageTokenPost
            lpHoldersMessage,
        });

        await interaction.editReply(formattedPost);
    } catch (error) {
        console.error("Error executing token-stats command:", error);
        await interaction.editReply({
            content: "Sorry, there was an error processing your request. Please try again later.",
            ephemeral: true,
        });
    }
};

module.exports = { data, execute };
