const axios = require("axios");
const config = require("../config.json");
const baseUrl = config.baseUrl;

export async function getMostLost(): Promise<void>{
    const url: string = `${baseUrl}/stock/market/list/losers?displayPercent=true`;

    // get response
    const json = await axios.get(url);
    console.log("----------Most Losers----------");
    const items: number = await json.data.length;
    for (let i = 0; i < items; i++) {
        const symbol: string = json.data[i].symbol;
        const companyName: string = json.data[i].companyName;
        const sector: string = json.data[i].sector;
        const latestPrice: string = json.data[i].latestPrice;
        const change: string = json.data[i].change;
        const changePercent: string = json.data[i].changePercent;
        console.log("----------");
        console.log(symbol);
        console.log(companyName);
        console.log(sector);
        console.log(`Latest Price: $${latestPrice}`);
        console.log(`Change: ${change}`);
        console.log(`Change Percent: ${changePercent}%`);
    }
}
