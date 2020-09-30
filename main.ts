// require('dotenv').config();
// const inquirer = require('inquirer');
// // const ora = require('ora');
// // const chalk = require('chalk');
// // const delay = require('delay');

// import * as book from "./src/book";
// // import * as crypto from "./src/cryptocurrency";
// // import * as dividend from "./src/dividends";
// // import * as earnings from "./src/earnings";
// // import * as financials from "./src/financials";
// // import * as ip from "./src/iexPercent";
// // import * as iv from "./src/iexVolume";
// // import * as marketNews from "./src/marketNews";
// // import * as ma from "./src/mostActive";
// // import * as mf from "./src/mostFocus";
// // import * as mg from "./src/mostGained";
// // import * as ml from "./src/mostLosers";
// // import * as peer from "./src/peers";
// // import * as price from "./src/price";
// // import * as ref from "./src/ref";
// import * as scoring from "./src/score";
// // import * as sector from "./src/sectors";
// import * as stats from "./src/stats";
// // import * as stockNews from "./src/stockNews";
// // import * as ipo from "./src/weeklyIpos";

// let score = 0;

// export async function getStockSymbol() {
//   const stock = [
//       {
//           type: "input",
//           name: "stocksymbol",
//           message: "Stock Symbol You'd like to score",
//       },
//   ];
//   const answers = await inquirer.prompt(stock);
//   return answers.stocksymbol;
// }
// export async function getVerboseOption() {
//   const verb = [
//       {
//         type: "list",
//         name: "verbose",
//         message: "Would you like verbose logging?",
//         choices: ["yes", "no"],
//         default: "yes",
//       },
//   ];
//   const answers = await inquirer.prompt(verb);
//   return answers.verbose;
// }

// export async function getRunOptions() {
//   const options = [
//       {
//         type: "checkbox",
//         name: "options",
//         message: "Please choose other options you'd like to see for the stock",
//         choices: ["news", "peers"],
//         default: ["news", "peers"]
//       },
//   ];
//   const answers = await inquirer.prompt(options);
//   return answers.options;
// }



// // spinner effects
// // const startingspinner = ora(`Loading ${chalk.red('Starting to Score Stock')}`);

// // async function test() {
// //   const spinner = ora(`Loading ${chalk.red('Starting to Score Pricing Information')}`).start();
// //   try {
// //     if(process.env.DAN === 'dan') {
// //       spinner.text = `Scored ${chalk.red('Price Information')}`;
// //       spinner.succeed();
// //     } else {
// //       spinner.fail();
// //     }
// //   } catch (error) {
// //     spinner.fail();
// //   }
// // }
// // async function test2() {
// //   const spinner = ora(`Loading ${chalk.red('Starting to Score Book Information')}`).start();
// //   try {
// //     if(true) {
// //       spinner.text = `Scored ${chalk.red('Book Information')}`;
// //       spinner.succeed();
// //     } else {
// //       spinner.fail();
// //     }
// //   } catch (error) {
// //     spinner.fail();
// //   }
// // }

// async function run() {
//   const stock = await getStockSymbol();
//   console.log(stock);

//   const verbose = await getVerboseOption();
//   console.log(verbose);
//   // const stockPrice = await price.getPrice(stock);
//   // console.log(`Current Stock Price ${stockPrice}`);

//   const books = await book.getBook(stock, verbose);
//   score = score + books;
//   if (verbose === "yes") {
//       console.log(`Updated Score after Books is ${score}`);
//   }
//   // const dividends: number = await dividend.getDividends(stock, verbose);
//   //   score = score + dividends;
//   //   if (verbose === "yes") {
//   //       console.log(`Updated Score after Dividends is ${score}`);
//   //   }
//     // const earning: number = await earnings.getEarnings(stock, verbose);
//     // score = score + earning;
//     // if (verbose === "yes") {
//     //     console.log(`Updated Score after Earnings is ${score}`);
//     // }
//     const stat: number = await stats.getStats(stock, verbose);
//     score = score + stat;
//     if (verbose === "yes") {
//         console.log(`Updated Score after Stats is ${score}`);
//     }

//     // const financial: number = await financials.getFinancials(stock, verbose);
//     // score = score + financial;
//     // if (verbose === "yes") {
//     //     console.log(`Updated Score after Financials is ${score}`);
//     // }

//     const finalScore = await scoring.interpretScore(score, 30, 20);
//     console.log(finalScore);

//   // startingspinner.start();
//   // await delay(3000);
//   // startingspinner.info();
//   // await test();
//   // await test2();

// }

// async function runOption () {
//   async function runIPO(): Promise<void>{
//     await ipo.getIPOS(email);
// }
// async function runMostActive(): Promise<void>{
//     await ma.getMostActive();
// }
// async function runMostGained(): Promise<void>{
//     await mg.getMostGained();
// }
// async function runMostLost(): Promise<void>{
//     await ml.getMostLost();
// }
// async function runMostFocus(): Promise<void>{
//     await mf.getMostInFocus();
// }
// async function runIexVolume(): Promise<void>{
//     await iv.getIexVolume();
// }
// async function runIexPercent(): Promise<void>{
//     await ip.getIexPercent();
// }
// async function runCryptocurrency(): Promise<void>{
//     await crypto.getCryptocurrency();
// }
// async function runPeers(): Promise<void>{
//     const found = await ref.checkStock(stockSymbol);
//     if (found === "yes"){
//         await peer.getPeerStocks(stockSymbol);
//     }
//     else {
//         console.log(`Stock ${stockSymbol} is not found.`);
//     }
// }
// async function runStockNews(): Promise<void>{
//     const found = await ref.checkStock(stockSymbol);
//     if (found === "yes"){
//         await stockNews.getStockNews(stockSymbol, email);
//     }
//     else {
//         console.log(`Stock ${stockSymbol} is not found.`);
//     }
// }
// async function runMarketNews(): Promise<void>{
//     await marketNews.getMarketNews(email);
// }
// async function runSectorPerformance(): Promise<void>{
//     await sector.getSector();
// }
// }

// run();