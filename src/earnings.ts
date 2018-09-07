const axios = require("axios");
let score = 0;
const config = require("../config.json");
const baseUrl = config.baseUrl;

export async function getEarnings(stock: string): Promise<number>{
    const url: string = `${baseUrl}/stock/${stock}/earnings`;

    let scoring: number;
    await setScore();

    // get response
    const json = await axios.get(url);

    const eps: number = json.data.earnings[0].actualEPS;
    const yearAgo: number = json.data.earnings[0].yearAgo;

    await calcEarnings("EPS", eps);
    await calcYearAgo("Year Ago EPS", yearAgo, eps);
    scoring = await getScore();

    // return score
    return scoring;
}

async function calcEarnings(stat: string, value: number){
    if (value >= 30){
        score = score + 3;
        console.log(`${stat} is bullish +3`);
        console.log(`current score is ${score}`);
    }
    else if ((value >= 18) && (value < 25)){
        score = score + 1;
        console.log(`${stat} is bullish +1`);
        console.log(`current score is ${score}`);
    }
    else if ((value >= 25) && (value < 30)){
        score = score + 2;
        console.log(`${stat} is bullish +2`);
        console.log(`current score is ${score}`);
    }
    else if (value < 18){
        score = score - 1;
        console.log(`${stat} is bearish -1`);
        console.log(`current score is ${score}`);
    }
}
async function calcYearAgo(stat: string, yearAgo: number, actual: number){
    if (actual > yearAgo){
        score = score + 1;
        console.log(`${stat} is bullish +1`);
        console.log(`current score is ${score}`);
    }
    else if (actual < yearAgo){
        score = score - 1;
        console.log(`${stat} is bearish -1`);
        console.log(`current score is ${score}`);
    }
}

async function getScore(){
    return score;
}

async function setScore(){
    score = 0;
}
