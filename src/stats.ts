const axios = require("axios");
let score = 0;
const config = require("../config.json");
const baseUrl = config.baseUrl;
import * as techScore from "./techScore";
const apiKey = config.apiKey;

export async function getStats(stockSymbol: string, verbose: string): Promise<number>{
    const url: string = `${baseUrl}/stock/${stockSymbol}/stats?token=${apiKey}`;
    let scoring: number;
    await setScore();

    // get response
    const json = await axios.get(url);

    // Response Numbers needed for calculations
    const beta: number = await json.data.beta;

    // Technical Indicator Calculations
    await calcBeta("Beta", beta, verbose);
    scoring = await getScore();

    // technical score
    if (verbose === "yes") {
        const tech = await techScore.interpretScore("Stats", scoring, 1, 0);
        console.log(tech);
    }

    // return score
    return scoring;
}

async function calcBeta(stat: string, value: number, verbose: string) {
    if (verbose === "yes") {
        console.log(stat);
        console.log(value);
    }
}
async function getScore(){
    return score;
}

async function setScore(){
    score = 0;
}
