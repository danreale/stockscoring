declare var require: any
const axios = require("axios");
let config = require('../config.json');
let baseUrl = config.baseUrl;

export async function getMostLost(): Promise<void>{
    let url: string = `${baseUrl}/stock/market/list/losers?displayPercent=true`;

    //get response
    let json = await axios.get(url);
    console.log('----------Most Losers----------');
    let items: number = await json.data.length;
    for(var i = 0; i < items; i++){
        let symbol: string = json.data[i].symbol;
        let companyName: string = json.data[i].companyName;
        let sector: string = json.data[i].sector;
        let latestPrice: string = json.data[i].latestPrice;
        let change: string = json.data[i].change;
        let changePercent: string = json.data[i].changePercent;
        console.log('----------');
        console.log(symbol);
        console.log(companyName);
        console.log(sector);
        console.log(`Latest Price: $${latestPrice}`);
        console.log(`Change: ${change}`);
        console.log(`Change Percent: ${changePercent}%`);
    }
}