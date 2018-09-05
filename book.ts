declare var require: any
const axios = require("axios");
let score = 0;

export async function getBook(stockSymbol: string): Promise<number>{
    let url: string = `https://api.iextrading.com/1.0/stock/${stockSymbol}/book`;
    //console.log(url);

    await setScore();

    //get response
    let json = await axios.get(url);

    //Response Numbers needed for calculations
    let openPrice: number = await json.data.quote.open;
    let closePrice: number = await json.data.quote.close;

    //Technical Indicator Calculations
    await calcPrice('Open Close Price', openPrice, closePrice);
    let scoring: number = await getScore();

    //return score
    return scoring;
}

async function calcPrice(stat:string, open:number, close:number){
    if (open > close){
        score = score - 1;
        //console.log(score);
        //common.appendToFile(symbol, suffix, `Stock went down in price\n`)
        //common.appendToFile(symbol, suffix, `${stat} is bearish\n`)
        //common.appendToFile(symbol, suffix, `current score is ${score}\n`)
    }
    else if (open < close){
        score = score + 1;
        //console.log(score);
        //common.appendToFile(symbol, suffix, `Stock went up in price\n`)
        //common.appendToFile(symbol, suffix, `${stat} is bullish\n`)
        //common.appendToFile(symbol, suffix, `current score is ${score}\n`)
    }
    else{
        //common.appendToFile(symbol, suffix, `${stat} was not scored\n`)
    }
}

async function getScore(){
    return score;
}

async function setScore(){
    score = 0;
}