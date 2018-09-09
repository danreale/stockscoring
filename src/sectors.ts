const axios = require("axios");
const config = require("../config.json");
const baseUrl = config.baseUrl;

export async function getSector(): Promise<void>{
    const url: string = `${baseUrl}/stock/market/sector-performance`;

    // get response
    const json = await axios.get(url);
    console.log("----------Sector Performance----------");
    const items: number = await json.data.length;
    for (let i = 0; i < items; i++){
        const name: string = json.data[i].name;
        const performance: string = json.data[i].performance;
        console.log("----------");
        console.log(name);
        console.log(performance);
    }
}
