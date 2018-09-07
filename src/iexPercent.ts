const axios = require("axios");
const config = require("../config.json");
const baseUrl = config.baseUrl;

export async function getIexPercent(): Promise<void>{
    const url: string = `${baseUrl}/stock/market/list/iexpercent?displayPercent=true`;

    // get response
    const json = await axios.get(url);
    console.log("----------IEX Percent----------");
    const items: number = await json.data.length;
    for (let i = 0; i < items; i++) {
        const symbol: string = json.data[i].symbol;
        const companyName: string = json.data[i].companyName;
        const sector: string = json.data[i].sector;
        const latestPrice: string = json.data[i].latestPrice;
        const iexPercent: string = json.data[i].iexMarketPercent;
        console.log("----------");
        console.log(symbol);
        console.log(companyName);
        console.log(sector);
        console.log(`Latest Price: $${latestPrice}`);
        console.log(`IEX Market Percent: ${iexPercent}%`);
    }
}
