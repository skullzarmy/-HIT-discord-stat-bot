const { tokensGetTokens } = require("@tzkt/sdk-api");

// Updated getHolders function to accept contract and tokenId
const getHolders = async (contract, tokenId = 0) => {
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

// Function to get holders for all specified LP tokens
const getLPHolders = async () => {
    const lpTokens = [
        { name: "SpicySwap HIT/XTZ LP", contract: "KT18yrutxe93cKpAqaJxos6zQ9zFBdiiL5Lw", tokenId: 0 },
        { name: "SpicySwap HIT/SKULL LP", contract: "KT1FrVpzJLqL9foXTDVHzLT5XDN3DdbX9D6g", tokenId: 0 },
        { name: "Quipuswap HIT/XTZ LP", contract: "KT1J8Hr3BP8bpbfmgGpRPoC9nAMSYtStZG43", tokenId: 194 },
    ];

    let holdersData = [];

    for (const lpToken of lpTokens) {
        const holdersCount = await getHolders(lpToken.contract, lpToken.tokenId);
        holdersData.push({
            name: lpToken.name,
            holdersCount: holdersCount[0]?.holdersCount || "N/A", // Adjust based on actual API response structure
        });
    }

    return holdersData;
};

module.exports = {
    getHolders, // You might want to export this if you need it elsewhere
    getLPHolders,
};
