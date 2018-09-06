export async function interpretScore(score: number, greatBuy: number, okBuy: number){
    if(score >= greatBuy){
        return `Total score is ${score}. This means the stock is a great buy.`;
    }
    else if((score < greatBuy) && (score >= okBuy)){
        return `Total score is ${score}. This means the stock is an ok buy.`
    }
    else if(score < okBuy){
        return `Total score is ${score}. This means the stock is a bad buy.`
    }
}