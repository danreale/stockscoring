import * as book from "./src/book";
import * as scoring from "./src/score";
import * as price from "./src/price";
import * as ipo from "./src/weeklyIpos";
import * as ma from "./src/mostActive";
import * as mg from "./src/mostGained";
import * as ml from "./src/mostLosers";
import * as mf from "./src/mostFocus";
import * as iv from "./src/iexVolume";
import * as ip from "./src/iexPercent";
import * as crypto from "./src/cryptocurrency";
import * as dividend from "./src/dividends";
import * as earnings from "./src/earnings";
import * as peer from "./src/peers";
import * as stockNews from "./src/stockNews";
import * as marketNews from "./src/marketNews";
import * as stats from "./src/stats";
import * as financials from "./src/financials";
let score = 0; 

var args = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .describe('stock', 'Stock symbol')
    .alias('s', 'stock')
    .default('s', 'no')
    .describe('scoring', 'Stock symbol for scoring')
    .alias('sc', 'scoring')
    .default('sc', 'no')
    .describe('email', 'Email address')
    .alias('e', 'email')
    .default('email', 'no')
    .describe('mostactive', 'Most Active Stocks')
    .alias('ma', 'mostactive')
    .default('ma', 'no')
    .describe('mostgained', 'Most Gained Stocks')
    .alias('mg', 'mostgained')
    .default('mg', 'no')
    .describe('mostlost', 'Most Lost Stocks')
    .alias('ml', 'mostlost')
    .default('ml', 'no')
    .describe('mostfocus', 'Most In Focus Stocks')
    .alias('mf', 'mostfocus')
    .default('mf', 'no')
    .describe('iexvolume', 'IEX Volume')
    .alias('iv', 'iexvolume')
    .default('iv', 'no')
    .describe('iexpercent', 'IEX Percent')
    .alias('ip', 'iexpercent')
    .default('ip', 'no')
    .describe('weeklyipo', 'Weekly IPO\'s')
    .alias('ipo', 'weeklyipo')
    .default('ipo', 'no')
    .describe('cryptocurrency', 'Cryptocurrencies')
    .alias('c', 'cryptocurrency')
    .default('c', 'no')
    .describe('peers', 'Stock Peers')
    .alias('p', 'peers')
    .default('p', 'no')
    .describe('stocknews', 'Stock News')
    .alias('sn', 'stocknews')
    .default('sn', 'no')
    .describe('marketnews', 'Market News')
    .alias('mn', 'marketnews')
    .default('mn', 'no')
    //.demandOption(['s'])
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2018')
    .argv;

let stockSymbol:string = args.stock;
let stockSymbolScoring:string = args.scoring;
var email = args.email;
let mostActive:string = args.mostactive;
let mostGained:string = args.mostgained;
let mostLost:string = args.mostlost;
let mostFocus:string = args.mostfocus;
let iexVolume:string = args.iexvolume;
let iexPercent:string = args.iexpercent;
let weeklyIpo:string = args.weeklyipo;
let cryptocurrency:string = args.cryptocurrency;
let peers:string = args.peers;
let stocknews:string = args.stocknews;
let marketnews:string = args.marketnews;

//console.log(stockSymbol);
//console.log(mostActive);


async function getPrice(): Promise<void>{
    let stockPrice = await price.getPrice(stockSymbolScoring);
    console.log(`Current Stock Price ${stockPrice}`);
}

async function runStocks(): Promise<void>{
let books: number = await book.getBook(stockSymbolScoring);
score = score + books;

let dividends: number = await dividend.getDividends(stockSymbolScoring);
score = score + dividends;

let earning: number = await earnings.getEarnings(stockSymbolScoring);
score = score + earning;

let stat: number = await stats.getStats(stockSymbolScoring);
score = score + stat;

let financial: number = await financials.getFinancials(stockSymbolScoring);
score = score + financial;
}

async function scoreStock(): Promise<void>{
    let finalScore = await scoring.interpretScore(score, 30, 20)
    console.log(finalScore);
}

async function runAll(): Promise<void>{
    await getPrice();
    await runStocks();
    await scoreStock();
}
async function runIPO(): Promise<void>{
    await ipo.getIPOS(email)
}
async function runMostActive(): Promise<void>{
    await ma.getMostActive();
}
async function runMostGained(): Promise<void>{
    await mg.getMostGained();
}
async function runMostLost(): Promise<void>{
    await ml.getMostLost();
}
async function runMostFocus(): Promise<void>{
    await mf.getMostInFocus();
}
async function runIexVolume(): Promise<void>{
    await iv.getIexVolume();
}
async function runIexPercent(): Promise<void>{
    await ip.getIexPercent();
}
async function runCryptocurrency(): Promise<void>{
    await crypto.getCryptocurrency();
}
async function runPeers(): Promise<void>{
    await peer.getPeerStocks(stockSymbol);
}
async function runStockNews(): Promise<void>{
    await stockNews.getStockNews(stockSymbol, email);
}
async function runMarketNews(): Promise<void>{
    await marketNews.getMarketNews(email);
}

if(stockSymbolScoring != 'no'){
    runAll();
}
if(weeklyIpo === 'yes'){
    runIPO();
}
if(mostActive === 'yes'){
    runMostActive();
}
if(mostGained === 'yes'){
    runMostGained();
}
if(mostLost === 'yes'){
    runMostLost();
}
if(mostFocus === 'yes'){
    runMostFocus();
}
if(iexVolume === 'yes'){
    runIexVolume();
}
if(iexPercent === 'yes'){
    runIexPercent();
}
if(cryptocurrency === 'yes'){
    runCryptocurrency();
}
if((peers === 'yes') && (stockSymbol != 'no')){
    runPeers();
}
if((stocknews === 'yes') && (stockSymbol != 'no')){
    runStockNews();
}
if(marketnews === 'yes'){
    runMarketNews();
}