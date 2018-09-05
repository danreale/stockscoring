declare var require: any
const axios = require("axios");
let config = require('./config.json');
let baseUrl = config.baseUrl;

export async function getPrice(stockSymbol: string): Promise<number>{
    let url: string = `${baseUrl}/stock/${stockSymbol}/price`;
    let json = await axios.get(url);
    let price: number = await json.data;
    return price;
}