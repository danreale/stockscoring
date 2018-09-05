declare var require: any
const axios = require("axios");
let config = require('./config.json');
let baseUrl = config.baseUrl;

export async function getIexVolume(): Promise<void>{
    let url: string = `${baseUrl}/stock/market/list/iexvolume`;

    //get response
    let json = await axios.get(url);
    console.log('----------IEX Volume----------');
    let items: number = await json.data.length;
    for(var i = 0; i < items; i++){
        let symbol: string = json.data[i].symbol;
        let companyName: string = json.data[i].companyName;
        let sector: string = json.data[i].sector;
        let latestPrice: string = json.data[i].latestPrice;
        let iexVolume: string = json.data[i].iexVolume;
        console.log('----------');
        console.log(symbol);
        console.log(companyName);
        console.log(sector);
        console.log(`Latest Price: $${latestPrice}`);
        console.log(`IEX Volume: ${iexVolume}`);
    }
}