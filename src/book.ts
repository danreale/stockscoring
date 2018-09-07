const axios = require("axios");
let score = 0;
const config = require("../config.json");
const baseUrl = config.baseUrl;

export async function getBook(stockSymbol: string): Promise<number>{
    const url: string = `${baseUrl}/stock/${stockSymbol}/book`;
    // console.log(url);
    let scoring: number;
    await setScore();

    // get response
    const json = await axios.get(url);

    // Response Numbers needed for calculations
    const symbol: string = await json.data.quote.symbol;
    const companyName: string = await json.data.quote.companyName;
    const openPrice: number = await json.data.quote.open;
    const closePrice: number = await json.data.quote.close;
    const peRatio: number = await json.data.quote.peRatio;
    const high: number = await json.data.quote.high;
    const low: number = await json.data.quote.low;
    const week52High: number = await json.data.quote.week52High;
    const week52Low: number = await json.data.quote.week52Low;
    const marketCap: number = await json.data.quote.marketCap;
    const change: number = await json.data.quote.change;
    const changePercent: number = await json.data.quote.changePercent;

    // Technical Indicator Calculations
    const info: string = await companyInfo(symbol, companyName);
    console.log(info);
    await calcPrice("Open Close Price", openPrice, closePrice);
    await calcPERatio("PERatio", peRatio);
    await calc52WeekHighLow("52 Week High Low", high, low, week52High, week52Low, closePrice);
    await calcMarketCap(marketCap);
    await calcChange(change);
    await calcChangePercent(changePercent);
    scoring = await getScore();

    // return score
    return scoring;
}

async function companyInfo(symbol: string, companyName: string){
    return `${symbol}: ${companyName}`;
}
async function calcPrice(stat: string, open: number, close: number){
    if (open > close){
        score = score - 1;
        console.log(`Stock went down in price on the day`);
        console.log(`${stat} is bearish -1`);
        console.log(`current score is ${score}`);
    }
    else if (open < close){
        score = score + 1;
        console.log(`Stock went up in price on the day`);
        console.log(`${stat} is bullish +1`);
        console.log(`current score is ${score}`);
    }
    else{
        console.log(`${stat} was not scored`);
    }
}

async function calcPERatio(stat: string, value: number){
    if (value >= 20){
        score = score + 1;
        console.log(`${stat} is bullish +1`);
        console.log(`current score is ${score}`);
    }
    else if (value < 20){
        score = score - 1;
        console.log(`${stat} is bearish -1`);
        console.log(`current score is ${score}`);
    }
    else{
        score = score - 2;
        console.log("Company is losing money");
        console.log(`${stat} was not scored -2`);
        console.log(`current score is ${score}`);
    }
}

async function calc52WeekHighLow(stat: string, dailyHigh: number, dailyLow: number, high: number, low: number, close: number){
    console.log(`${stat}`);
    if (dailyHigh > high){
        console.log("Trending towards 52 Week High. Moving Higher +1");
        score = score + 1;
        console.log(`current score is ${score}`);
    }
    if (dailyHigh < high){
        console.log("Daily high did not go above 52 week high +0");
        score = score + 0;
        console.log(`current score is ${score}`);
    }
    if (dailyLow < low){
        console.log("Trending towards 52 Week Low. Moving Lower -1");
        score = score - 1;
        console.log(`current score is ${score}`);
    }
    if (dailyLow > low){
        console.log("Daily low did not go below 52 week low +1");
        score = score + 1;
        console.log(`current score is ${score}`);
    }
    if (close >= high){
        console.log("Above 52 Week High. Moving Higher. Buy / Stop Gains +2");
        score = score + 2;
        console.log(`current score is ${score}`);
    }
    if (close <= low){
        console.log("Below 52 Week Low. Moving Lower. Sell. Good Time to Short -2");
        score = score - 2;
        console.log(`current score is ${score}`);
    }
}

async function calcMarketCap(marketCap: number){
    if (marketCap >= 200000000000){
        console.log("Mega Cap. Low Risk, Low Return. Blue Chip. +6");
        score = score + 6;
        console.log(`current score is ${score}`);
    }
    else if ((marketCap < 200000000000) && (marketCap > 10000000000)){
        console.log("Large Cap. Stable and Secure. Blue Chip. +5");
        score = score + 5;
        console.log(`current score is ${score}`);
    }
    else if ((marketCap < 10000000000) && (marketCap > 2000000000)){
        console.log("Mid Cap. Stable but more volatile. On way to becoming large cap stock. +4");
        score = score + 4;
        console.log(`current score is ${score}`);
    }
    else if ((marketCap < 2000000000) && (marketCap > 300000000)){
        console.log("Small Cap. More volatile. Greater Risk +3");
        score = score + 3;
        console.log(`current score is ${score}`);
    }
    else if ((marketCap < 300000000) && (marketCap > 50000000)){
        console.log("Micro Cap. Penny Stocks. Great Risk. Not a safe investment +2");
        score = score + 2;
        console.log(`current score is ${score}`);
    }
    else if (marketCap < 50000000){
        console.log("Nano Cap. Most Risky. Potential for gain is small. +1");
        score = score + 1;
        console.log(`current score is ${score}`);
    }
}

async function calcChange(change: number){
    if (change >= 0){
        console.log("Positive Change. +1");
        score = score + 1;
        console.log(`current score is ${score}`);
    }
    else if (change < 0){
        console.log("Negative Change. -1");
        score = score - 1;
        console.log(`current score is ${score}`);
    }
}

async function calcChangePercent(changePercent: number){
    if (changePercent >= 1){
        console.log("Positive Change. +2");
        score = score + 2;
        console.log(`current score is ${score}`);
    }
    else if (changePercent < 0){
        console.log("Negative Change. -1");
        score = score - 1;
        console.log(`current score is ${score}`);
    }
    else{
        console.log("Small Change. +1");
        score = score + 1;
        console.log(`current score is ${score}`);
    }
}

async function getScore(){
    return score;
}

async function setScore(){
    score = 0;
}
