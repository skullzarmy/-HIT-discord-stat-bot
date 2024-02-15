const { codeBlock, bold } = require("discord.js");
const { wagersToTextList } = require("./wagers");

const generatePost = (header, content) => {
    const postHeader = bold(header);

    const post = `${postHeader}${codeBlock(content)}`;
    return post;
};

const stageWagerPost = (header, potStatistics) => {
    const { wagers, totalBurned } = potStatistics;
    const wagerList = wagersToTextList(wagers);

    const postContent = `🔥 Burned: ${totalBurned}\n\n${wagerList}`;
    const post = generatePost(header, postContent);

    return post;
};

const stageTokenPost = (header, tokenStatistics) => {
    const { holders, price, lpHoldersMessage } = tokenStatistics;

    const usdPrice = `💰 USD Price: $ ${price.usd}`;
    const xtzPrice = `💸 XTZ Price: ꜩ ${price.xtz}`;

    const postContent = `👨‍👩‍👧‍👧 $HITheads: ${holders}\n\n${xtzPrice}\n${usdPrice}\n${lpHoldersMessage}`;
    const post = generatePost(header, postContent);

    return post;
};

module.exports = {
    generatePost,
    stageWagerPost,
    stageTokenPost,
};
