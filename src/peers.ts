declare var require: any
const axios = require("axios");
let config = require('../config.json');
let baseUrl = config.baseUrl;

export async function getPeerStocks(stock:string): Promise<void>{
    let url: string = `${baseUrl}/stock/${stock}/relevant`;

    //get response
    let json = await axios.get(url);

    console.log(`----------${stock} Peer Stocks----------`);
    let items: number = await json.data.symbols.length;
    for(var i = 0; i < items; i++){
        let peers:any = json.data.symbols[i];
        console.log(peers);
    }
}