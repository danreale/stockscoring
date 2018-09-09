import * as book from "./src/book";
import * as crypto from "./src/cryptocurrency";
import * as dividend from "./src/dividends";
import * as earnings from "./src/earnings";
import * as financials from "./src/financials";
import * as ip from "./src/iexPercent";
import * as iv from "./src/iexVolume";
import * as marketNews from "./src/marketNews";
import * as ma from "./src/mostActive";
import * as mf from "./src/mostFocus";
import * as mg from "./src/mostGained";
import * as ml from "./src/mostLosers";
import * as peer from "./src/peers";
import * as price from "./src/price";
import * as ref from "./src/ref";
import * as scoring from "./src/score";
import * as sector from "./src/sectors";
import * as stats from "./src/stats";
import * as stockNews from "./src/stockNews";
import * as ipo from "./src/weeklyIpos";

let score = 0;

const args = require("yargs")
    .usage("Usage: $0 <command> [options]")
    .describe("stock", "Stock symbol")
    .alias("s", "stock")
    .default("s", "no")
    .describe("scoring", "Stock symbol for scoring")
    .alias("sc", "scoring")
    .default("sc", "no")
    .describe("email", "Email address")
    .alias("e", "email")
    .default("email", "no")
    .describe("mostactive", "Most Active Stocks")
    .alias("ma", "mostactive")
    .default("ma", "no")
    .describe("mostgained", "Most Gained Stocks")
    .alias("mg", "mostgained")
    .default("mg", "no")
    .describe("mostlost", "Most Lost Stocks")
    .alias("ml", "mostlost")
    .default("ml", "no")
    .describe("mostfocus", "Most In Focus Stocks")
    .alias("mf", "mostfocus")
    .default("mf", "no")
    .describe("iexvolume", "IEX Volume")
    .alias("iv", "iexvolume")
    .default("iv", "no")
    .describe("iexpercent", "IEX Percent")
    .alias("ip", "iexpercent")
    .default("ip", "no")
    .describe("weeklyipo", "Weekly IPO\"s")
    .alias("ipo", "weeklyipo")
    .default("ipo", "no")
    .describe("cryptocurrency", "Cryptocurrencies")
    .alias("c", "cryptocurrency")
    .default("c", "no")
    .describe("peers", "Stock Peers")
    .alias("p", "peers")
    .default("p", "no")
    .describe("stocknews", "Stock News")
    .alias("sn", "stocknews")
    .default("sn", "no")
    .describe("marketnews", "Market News")
    .alias("mn", "marketnews")
    .default("mn", "no")
    .describe("verbose", "Verbose Logging")
    .alias("v", "verbose")
    .default("v", "no")
    .describe("sectors", "Sectors Change")
    .alias("sec", "sectors")
    .default("sec", "no")
    // .demandOption(["s"])
    .help("h")
    .alias("h", "help")
    .epilog("copyright 2018")
    .argv;

    const stockSymbol: string = args.stock;
    const stockSymbolScoring: string = args.scoring;
    const email = args.email;
    const mostActive: string = args.mostactive;
    const mostGained: string = args.mostgained;
    const mostLost: string = args.mostlost;
    const mostFocus: string = args.mostfocus;
    const iexVolume: string = args.iexvolume;
    const iexPercent: string = args.iexpercent;
    const weeklyIpo: string = args.weeklyipo;
    const cryptocurrency: string = args.cryptocurrency;
    const peers: string = args.peers;
    const stocknews: string = args.stocknews;
    const marketnews: string = args.marketnews;
    const verbose: string = args.verbose;
    const sectors: string = args.sectors;
// console.log(stockSymbol);
// console.log(mostActive);

async function getPrice(): Promise<void>{
    const stockPrice = await price.getPrice(stockSymbolScoring);
    console.log(`Current Stock Price ${stockPrice}`);
}

async function runStocks(): Promise<void>{
    const books: number = await book.getBook(stockSymbolScoring, verbose);
    score = score + books;
    if (verbose === "on") {
        console.log(`Updated Score after Books is ${score}`);
    }

    const dividends: number = await dividend.getDividends(stockSymbolScoring, verbose);
    score = score + dividends;
    if (verbose === "on") {
        console.log(`Updated Score after Dividends is ${score}`);
    }
    const earning: number = await earnings.getEarnings(stockSymbolScoring, verbose);
    score = score + earning;
    if (verbose === "on") {
        console.log(`Updated Score after Earnings is ${score}`);
    }
    const stat: number = await stats.getStats(stockSymbolScoring, verbose);
    score = score + stat;
    if (verbose === "on") {
        console.log(`Updated Score after Stats is ${score}`);
    }

    const financial: number = await financials.getFinancials(stockSymbolScoring, verbose);
    score = score + financial;
    if (verbose === "on") {
        console.log(`Updated Score after Financials is ${score}`);
    }
}

async function scoreStock(): Promise<void>{
    const finalScore = await scoring.interpretScore(score, 30, 20);
    console.log(finalScore);
}

async function runAll(): Promise<void>{
    const found = await ref.checkStock(stockSymbolScoring);
    if (found === "yes"){
        await getPrice();
        await runStocks();
        await scoreStock();
    }
    else {
        console.log(`Stock ${stockSymbolScoring} is not available for scoring.`);
    }
}
async function runIPO(): Promise<void>{
    await ipo.getIPOS(email);
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
    const found = await ref.checkStock(stockSymbol);
    if (found === "yes"){
        await peer.getPeerStocks(stockSymbol);
    }
    else {
        console.log(`Stock ${stockSymbol} is not found.`);
    }
}
async function runStockNews(): Promise<void>{
    const found = await ref.checkStock(stockSymbol);
    if (found === "yes"){
        await stockNews.getStockNews(stockSymbol, email);
    }
    else {
        console.log(`Stock ${stockSymbol} is not found.`);
    }
}
async function runMarketNews(): Promise<void>{
    await marketNews.getMarketNews(email);
}
async function runSectorPerformance(): Promise<void>{
    await sector.getSector();
}

if (stockSymbolScoring !== "no") {
    runAll();
}
if (weeklyIpo === "yes") {
    runIPO();
}
if (mostActive === "yes") {
    runMostActive();
}
if (mostGained === "yes") {
    runMostGained();
}
if (mostLost === "yes") {
    runMostLost();
}
if (mostFocus === "yes") {
    runMostFocus();
}
if (iexVolume === "yes") {
    runIexVolume();
}
if (iexPercent === "yes") {
    runIexPercent();
}
if (cryptocurrency === "yes") {
    runCryptocurrency();
}
if ((peers === "yes") && (stockSymbol !== "no")) {
    runPeers();
}
if ((stocknews === "yes") && (stockSymbol !== "no")) {
    runStockNews();
}
if (marketnews === "yes") {
    runMarketNews();
}
if (sectors === "yes") {
    runSectorPerformance();
}
