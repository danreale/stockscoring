declare var require: any
const axios = require("axios");
let config = require('./config.json');
let baseUrl = config.baseUrl;

export async function getStockNews(stock:string): Promise<void>{
    let url: string = `${baseUrl}/stock/${stock}/news/last/50`;

    //get response
    let json = await axios.get(url);

    console.log(`----------${stock} News----------`);
    let items: number = await json.data.length;
    
    for(var i = 0; i < items; i++){
        let headline:string = json.data[i].headline;
        let source:string = json.data[i].source;
        let url:string = json.data[i].url;
        let dt:string = json.data[i].datetime;
        console.log(`--------------------`);
        console.log(`${headline}`);
        console.log(`${source}`);
        console.log(`${url}`);
        console.log(`${dt}`);
    }
}