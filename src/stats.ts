const axios = require("axios");
let score = 0;
const config = require("../config.json");
const baseUrl = config.baseUrl;

export async function getStats(stockSymbol: string): Promise<number>{
    const url: string = `${baseUrl}/stock/${stockSymbol}/stats`;
    let scoring: number;
    await setScore();

    // get response
    const json = await axios.get(url);

    // Response Numbers needed for calculations
    const beta: number = await json.data.beta;

    // Technical Indicator Calculations
    await calcBeta("Beta", beta);
    scoring = await getScore();

    // return score
    return scoring;
}

async function calcBeta(stat: string, value: number) {
    // console.log(stat);
    // console.log(value);
}
async function getScore(){
    return score;
}

async function setScore(){
    score = 0;
}
