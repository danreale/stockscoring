export async function interpretScore(stat: string, score: number, greatBuy: number, okBuy: number): Promise<any>{
    if (score >= greatBuy){
        return `${stat} score is ${score}. This means ${stat} is great`;
    }
    else if ((score < greatBuy) && (score >= okBuy)){
        return `${stat} score is ${score}. This means ${stat} is ok.`;
    }
    else if (score < okBuy){
        return `${stat} score is ${score}. This means ${stat} is bad`;
    }
}
