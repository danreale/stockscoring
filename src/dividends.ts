const axios = require("axios");
let score = 0;
const config = require("../config.json");
const baseUrl = config.baseUrl;
const apiKey = config.apiKey;
import * as techScore from "./techScore";

export async function getDividends(stock: string, verbose: string): Promise<number>{
    const url: string = `${baseUrl}/stock/${stock}/dividends/5y?token=${apiKey}`;

    let scoring: number;
    await setScore();

    // get response
    const json = await axios.get(url);
    let dividend: any;
    try {
        dividend = json.data[0].amount;
        if (verbose === "yes") {
            console.log(`Dividend ${dividend}`);
        }
    } catch (error) {
        dividend = "none";
        if (verbose === "yes") {
            console.log("No Dividend");
        }
    }

    await calcDividends("Dividend", dividend, verbose);
    scoring = await getScore();

    // technical score
    if (verbose === "yes") {
        const tech = await techScore.interpretScore("Dividends", scoring, 1, 0);
        console.log(tech);
    }

    // return score
    return scoring;
}

async function calcDividends(stat: string, value: any, verbose: string){
    if (value >= 0){
        score = score + 1;
        if (verbose === "yes") {
            console.log(`${stat} is bullish +1`);
            console.log(`current score is ${score}`);
        }
    }
    else if (value === "mone"){
        score = score - 1;
        if (verbose === "yes") {
            console.log(`${stat} is bearish -1`);
            console.log(`current score is ${score}`);
        }
    }
}

async function getScore(){
    return score;
}

async function setScore(){
    score = 0;
}
