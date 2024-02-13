const { quotesGetLast } = require("@tzkt/sdk-api");
const { calculateDayAgg } = require("../util/spicy");
const { getWtzRatio } = require("./wtz");

const getTezosPriceQuote = async () => quotesGetLast();

const SPICY_API_URL = "https://spicyb.sdaotools.xyz/api/rest";

const getPrice = async () => {
    const tag = "KT1LrYH1qE2zipJGfmtvu9grEp3ZRgpd6EYc:0";
    const req = `/TokenList?_ilike=${tag}&day_agg_start=${calculateDayAgg()}`;

    const res = await fetch(`${SPICY_API_URL}${req}`);
    const data = await res.json();

    const wtzRatio = await getWtzRatio();
    const tezosPriceQuote = await getTezosPriceQuote();

    const derivedXtz = data.tokens[0].derivedxtz / wtzRatio;
    const derivedUsd = derivedXtz * tezosPriceQuote.usd;

    return { xtz: derivedXtz.toFixed(6), usd: derivedUsd.toFixed(6) };
};

module.exports = {
    getPrice,
};
