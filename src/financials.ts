const axios = require("axios");
let score = 0;
const config = require("../config.json");
const baseUrl = config.baseUrl;
import * as techScore from "./techScore";

export async function getFinancials(stockSymbol: string, verbose: string): Promise<number>{
    const url: string = `${baseUrl}/stock/${stockSymbol}/financials`;
    let scoring: number;
    await setScore();

    // get response
    const json = await axios.get(url);

    // Response Numbers needed for calculations
    const grossProfit: number = await json.data.financials[0].grossProfit;
    // console.log(grossProfit);

    // Technical Indicator Calculations
    await calcBeta("Gross Profit", grossProfit, verbose);
    scoring = await getScore();

    // technical score
    if (verbose === "on") {
        const tech = await techScore.interpretScore("Financials", scoring, 1, 0);
        console.log(tech);
    }

    // return score
    return scoring;
}

async function calcBeta(stat: string, value: number, verbose: string) {
    // console.log(stat);
    // console.log(value);
}
async function getScore(){
    return score;
}

async function setScore(){
    score = 0;
}
