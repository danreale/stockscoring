const axios = require("axios");
const config = require("../config.json");
const baseUrl = config.baseUrl;
const apiKey = config.apiKey;

export async function getPeerStocks(stock: string): Promise<void>{
    const url: string = `${baseUrl}/stock/${stock}/relevant?token=${apiKey}`;

    // get response
    const json = await axios.get(url);

    console.log(`----------${stock} Peer Stocks----------`);
    const items: number = await json.data.symbols.length;
    for (let i = 0; i < items; i++) {
        const peers: any = json.data.symbols[i];
        console.log(peers);
    }
}
