const { tokensGetTokens } = require("@tzkt/sdk-api");

const getHolders = async () => {
    const contract = "KT1LrYH1qE2zipJGfmtvu9grEp3ZRgpd6EYc";
    const tokenId = 0;
    const limit = 1;
    const fields = ["holdersCount"];

    const res = await tokensGetTokens({
        contract: {
            eq: contract,
        },
        tokenId: {
            eq: tokenId,
        },
        limit,
        select: {
            fields,
        },
    });

    return res;
};

module.exports = {
    getHolders,
};
