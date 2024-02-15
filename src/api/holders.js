const { tokensGetTokens } = require("@tzkt/sdk-api");
// const { calculateTVL } = require("./tvl");

// Correctly fetch and return holders count
const getHolders = async (contract, tokenId = 0) => {
    const res = await tokensGetTokens({
        contract: { eq: contract },
        tokenId: { eq: tokenId },
        select: { fields: ["holdersCount"] },
    });

    // Assuming res is an array of objects and we're interested in the first one
    return res.length > 0 ? res[0] : null;
};

// Function to get holders for all specified LP tokens
const getLPHolders = async () => {
    const lpTokens = [
        { name: "SpicySwap HIT/WTZ LP", contract: "KT18yrutxe93cKpAqaJxos6zQ9zFBdiiL5Lw", tokenId: 0 },
        { name: "SpicySwap HIT/SKULL LP", contract: "KT1FrVpzJLqL9foXTDVHzLT5XDN3DdbX9D6g", tokenId: 0 },
        { name: "Quipuswap HIT/XTZ LP", contract: "KT1J8Hr3BP8bpbfmgGpRPoC9nAMSYtStZG43", tokenId: 194 },
    ];

    let lpDataWithTVL = await Promise.all(
        lpTokens.map(async (lpToken) => {
            const holdersCount = await getHolders(lpToken.contract, lpToken.tokenId);
            // const { xtz: tvlXtz, usd: tvlUsd } = await calculateTVL(lpToken.contract); // Calculate TVL for each LP
            return {
                name: lpToken.name,
                holdersCount: typeof holdersCount === "number" ? holdersCount.toString() : "N/A",
                // tvlXtz,
                // tvlUsd,
            };
        })
    );

    return lpDataWithTVL;
};

module.exports = { getHolders, getLPHolders };
