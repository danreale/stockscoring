declare var require: any
const axios = require("axios");
import * as email from "./emailer";
var config = require('./config.json');
var baseUrl = config.baseUrl;

export async function getIPOS(emailParam:string): Promise<void>{
    let url: string = `${baseUrl}/stock/market/upcoming-ipos`;
    //console.log(url);

    //get response
    let json = await axios.get(url);

    var items = json.data.rawData.length;

    for(var i = 0; i < items; i++){
        let symbol: string = json.data.viewData[i].Symbol;
        let companyName: string = json.data.viewData[i].Company;
        let expectedDate: string = json.data.viewData[i].Expected;
        let price: string = json.data.viewData[i].Price;
        let desc: string =  json.data.rawData[i].companyDescription;
        let body: string = `--------------------\n${symbol}, ${companyName}, ${expectedDate}, ${price} \n ${desc} \n`;
        console.log(body);
        if(emailParam === 'yes'){
            await email.sendEmail(symbol, body);
        }
    }
}