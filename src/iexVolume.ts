const axios = require("axios");
const config = require("../config.json");
const baseUrl = config.baseUrl;

export async function getIexVolume(): Promise<void>{
    const url: string = `${baseUrl}/stock/market/list/iexvolume`;

    // get response
    const json = await axios.get(url);
    console.log("----------IEX Volume----------");
    const items: number = await json.data.length;
    for (let i = 0; i < items; i++) {
        const symbol: string = json.data[i].symbol;
        const companyName: string = json.data[i].companyName;
        const sector: string = json.data[i].sector;
        const latestPrice: string = json.data[i].latestPrice;
        const iexVolume: string = json.data[i].iexVolume;
        console.log("----------");
        console.log(symbol);
        console.log(companyName);
        console.log(sector);
        console.log(`Latest Price: $${latestPrice}`);
        console.log(`IEX Volume: ${iexVolume}`);
    }
}
