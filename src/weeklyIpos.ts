const axios = require("axios");
import * as email from "./emailer";
const config = require("../config.json");
const baseUrl = config.baseUrl;

export async function getIPOS(emailParam: string): Promise<void>{
    const url: string = `${baseUrl}/stock/market/upcoming-ipos`;
    // console.log(url);

    // get response
    const json = await axios.get(url);

    const items = json.data.rawData.length;

    for (let i = 0; i < items; i++) {
        const symbol: string = json.data.viewData[i].Symbol;
        const companyName: string = json.data.viewData[i].Company;
        const expectedDate: string = json.data.viewData[i].Expected;
        const price: string = json.data.viewData[i].Price;
        const desc: string =  json.data.rawData[i].companyDescription;
        const body: string = `--------------------\n${symbol}, ${companyName}, ${expectedDate}, ${price} \n ${desc} \n`;
        console.log(body);
        if (emailParam === "yes") {
            await email.sendEmail(symbol, body);
        }
    }
}
