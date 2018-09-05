import * as book from "./book";
import * as scoring from "./score";
let score = 0; 

var args = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .describe('stock', 'Stock symbol')
    .alias('s', 'stock')
    //.describe('email', 'Email address')
    //.alias('e', 'email')
    //.default('email', 'off')
    .demandOption(['s'])
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2018')
    .argv;

let stockSymbol:string = args.stock;
//var email = args.email; // on or off

async function runStocks(): Promise<void>{

let books: number = await book.getBook(stockSymbol);
//console.log(books);
score = score + books;

//console.log('Score: ' + score);

}

async function scoreStock(): Promise<void>{
    let finalScore = await scoring.interpretScore(score, 30, 20)
    console.log(finalScore);
}

async function runAll(): Promise<void>{
    await runStocks();
    await scoreStock();
}

runAll();