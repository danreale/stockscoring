const axios = require("axios");
const config = require("../config.json");
const baseUrl = config.baseUrl;
let found: string = "no";

export async function checkStock(stockSymbol: string): Promise<string>{
    const url: string = `${baseUrl}/ref-data/symbols`;
    const json = await axios.get(url);
    const symbolLen: number = await json.data.length;
    // console.log(symbolLen);
    let i;
    for (i = 0; i < symbolLen; i++) {
        const symbol: string = json.data[i].symbol;
        const stockSymbolUp = stockSymbol.toUpperCase();
        if (symbol === stockSymbolUp) {
            found = "yes";
        }
    }
    return found;
}
