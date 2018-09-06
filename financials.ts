declare var require: any
const axios = require("axios");
let score = 0;
let config = require('./config.json');
let baseUrl = config.baseUrl;

export async function getFinancials(stockSymbol: string): Promise<number>{
    let url: string = `${baseUrl}/stock/${stockSymbol}/financials`;
    let scoring:number;
    await setScore();

    //get response
    let json = await axios.get(url);

    //Response Numbers needed for calculations
    let grossProfit: number = await json.data.financials[0].grossProfit;
    //console.log(grossProfit);

    //Technical Indicator Calculations
    await calcBeta('Gross Profit', grossProfit);
    scoring = await getScore();

    //return score
    return scoring;
}


async function calcBeta(stat:string, value:number) {

}
async function getScore(){
    return score;
}

async function setScore(){
    score = 0;
}