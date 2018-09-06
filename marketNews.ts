declare var require: any
const axios = require("axios");
let config = require('./config.json');
let baseUrl = config.baseUrl;
import * as emailer from "./newsEmailer";

export async function getMarketNews(email:string): Promise<void>{
    let url: string = `${baseUrl}/stock/market/news/last/50`;
    let emailBody:string = '';
    //get response
    let json = await axios.get(url);

    console.log(`----------Market News----------`);
    let items: number = await json.data.length;
    
    for(var i = 0; i < items; i++){
        let headline:string = json.data[i].headline;
        let source:string = json.data[i].source;
        let url:string = json.data[i].url;
        let dt:string = json.data[i].datetime;
        let body:string = `--------------------\n${headline}\n${source}\n${url}\n${dt}\n`;
        console.log(body);
        emailBody = emailBody + body;
    }
    if(email === 'yes'){
        await emailer.sendNewsEmail('Market', emailBody);
    }
    
}