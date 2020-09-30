const axios = require("axios");
let score = 0;
const config = require("../config.json");
const baseUrl = config.baseUrl;
const apiKey = config.apiKey;
import * as techScore from "./techScore";

export async function getEarnings(stock: string, verbose: string): Promise<number>{
    const url: string = `${baseUrl}/stock/${stock}/earnings?token=${apiKey}`;

    let scoring: number;
    await setScore();

    // get response
    const json = await axios.get(url);

    const eps: number = json.data.earnings[0].actualEPS;
    const yearAgo: number = json.data.earnings[0].yearAgo;

    await calcEarnings("EPS", eps, verbose);
    await calcYearAgo("Year Ago EPS", yearAgo, eps, verbose);
    scoring = await getScore();

    // technical score
    if (verbose === "yes") {
        const tech = await techScore.interpretScore("Earnings", scoring, 4, 2);
        console.log(tech);
    }

    // return score
    return scoring;
}

async function calcEarnings(stat: string, value: number, verbose: string){
    if (value >= 30){
        score = score + 3;
        if (verbose === "yes") {
            console.log(`${stat} is bullish +3`);
            console.log(`current score is ${score}`);
        }
    }
    else if ((value >= 18) && (value < 25)){
        score = score + 1;
        if (verbose === "yes") {
            console.log(`${stat} is bullish +1`);
            console.log(`current score is ${score}`);
        }
    }
    else if ((value >= 25) && (value < 30)){
        score = score + 2;
        if (verbose === "yes") {
            console.log(`${stat} is bullish +2`);
            console.log(`current score is ${score}`);
        }
    }
    else if (value < 18){
        score = score - 1;
        if (verbose === "yes") {
            console.log(`${stat} is bearish -1`);
            console.log(`current score is ${score}`);
        }
    }
}
async function calcYearAgo(stat: string, yearAgo: number, actual: number, verbose: string){
    if (actual > yearAgo){
        score = score + 1;
        if (verbose === "yes") {
            console.log(`${stat} is bullish +1`);
            console.log(`current score is ${score}`);
        }
    }
    else if (actual < yearAgo){
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
