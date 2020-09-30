const axios = require("axios");
const config = require("../config.json");
const baseUrl = config.baseUrl;
const apiKey = config.apiKey;

export async function getMostInFocus(): Promise<void>{
    const url: string = `${baseUrl}/stock/market/list/infocus?token=${apiKey}`;
    // get response
    const json = await axios.get(url);
    console.log("----------Most In Focus----------");
    const items: number = await json.data.length;
    for (let i = 0; i < items; i++) {
        const symbol: string = json.data[i].symbol;
        const companyName: string = json.data[i].companyName;
        const sector: string = json.data[i].sector;
        const latestPrice: string = json.data[i].latestPrice;
        console.log("----------");
        console.log(symbol);
        console.log(companyName);
        console.log(sector);
        console.log(`Latest Price: $${latestPrice}`);
    }
}
