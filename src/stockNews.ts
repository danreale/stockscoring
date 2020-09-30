const axios = require("axios");
const config = require("../config.json");
const baseUrl = config.baseUrl;
import * as emailer from "./newsEmailer";
const apiKey = config.apiKey;

export async function getStockNews(stock: string, email: string): Promise<void>{
    const url: string = `${baseUrl}/stock/${stock}/news/last/50?token=${apiKey}`;
    let emailBody: string = "";
    // get response
    const json = await axios.get(url);

    console.log(`----------${stock} News----------`);
    const items: number = await json.data.length;
    for (let i = 0; i < items; i++) {
        const headline: string = json.data[i].headline;
        const source: string = json.data[i].source;
        const sUrl: string = json.data[i].url;
        const dt: string = json.data[i].datetime;
        const body: string = `--------------------\n${headline}\n${source}\n${sUrl}\n${dt}\n`;
        console.log(body);
        emailBody = emailBody + body;
    }
    if (email === "yes") {
        await emailer.sendNewsEmail(`${stock} Stock`, emailBody);
    }
}
