const axios = require("axios");
let score = 0;
const config = require("../config.json");
const baseUrl = config.baseUrl;

export async function getDividends(stock: string): Promise<number>{
    const url: string = `${baseUrl}/stock/${stock}/dividends/5y`;

    let scoring: number;
    await setScore();

    // get response
    const json = await axios.get(url);
    let dividend: any;
    try {
        dividend = json.data[0].amount;
        console.log(`Dividend ${dividend}`);
    } catch (error) {
        dividend = "none";
        console.log("No Dividend");
    }

    await calcDividends("Dividend", dividend);
    scoring = await getScore();

    // return score
    return scoring;
}

async function calcDividends(stat: string, value: any){
    if (value >= 0){
        score = score + 1;
        console.log(`${stat} is bullish +1`);
        console.log(`current score is ${score}`);
    }
    else if (value === "mone"){
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
