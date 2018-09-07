const axios = require("axios");
const config = require("../config.json");
const baseUrl = config.baseUrl;

export async function getPrice(stockSymbol: string): Promise<number>{
    const url: string = `${baseUrl}/stock/${stockSymbol}/price`;
    const json = await axios.get(url);
    const price: number = await json.data;
    return price;
}
