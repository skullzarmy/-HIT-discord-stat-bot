// tvl.js
const { tokensGetTokens } = require("@tzkt/sdk-api");
const { getPrice } = require("./price");
const { getWtzRatio } = require("./wtz");

// Function to fetch the balance of tokens for a contract
const fetchTokenBalances = async (contractAddress) => {
    const res = await tokensGetTokens({
        contract: { eq: contractAddress },
        select: { fields: ["balance"] }, // Adjust based on actual available fields
    });
    return res.map((token) => token.balance); // Assuming the API returns an array of token objects with balances
};

// Function to calculate TVL in XTZ and USD
const calculateTVL = async (contractAddress) => {
    const balances = await fetchTokenBalances(contractAddress);
    const { xtz: xtzPrice, usd: usdPrice } = await getPrice();
    const wtzRatio = await getWtzRatio();

    let tvlXtz = 0;
    let tvlUsd = 0;

    balances.forEach((balance) => {
        // Convert balance to equivalent XTZ (assuming balance needs adjustment with wtzRatio for WTZ tokens)
        let balanceInXtz = balance / wtzRatio; // Simplified, adjust based on actual token economics
        tvlXtz += balanceInXtz;
        tvlUsd += balanceInXtz * usdPrice;
    });

    return { xtz: tvlXtz.toFixed(6), usd: tvlUsd.toFixed(6) };
};

module.exports = {
    calculateTVL,
};
