require('dotenv').config();
const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
import * as common from './src/common';
import * as tiingo from './src/tiingo/tiingo';
import * as finnhub from './src/finn/finnhub';

// get stock symbol
export async function getStockSymbol() {
  const stock = [
      {
          type: "input",
          name: "stocksymbol",
          message: "Stock Symbol You'd like to score",
      },
  ];
  const answers = await inquirer.prompt(stock);
  const symbol: string = answers.stocksymbol.toUpperCase();
  return symbol;
}

// choose verbose option
export async function getVerboseOption() {
  const verb = [
      {
        type: "list",
        name: "verbose",
        message: "Would you like verbose logging?",
        choices: ["yes", "no"],
        default: "no",
      },
  ];
  const answers = await inquirer.prompt(verb);
  return answers.verbose;
}
export async function getNewsAndInfo() {
  const news = [
      {
        type: "list",
        name: "news",
        message: "Would you like to see News and Info?",
        choices: ["yes", "no"],
        default: "yes",
      },
  ];
  const answers = await inquirer.prompt(news);
  return answers.news;
}

// choose other optional information

// run the program
async function run() {
  common.resetStats();
  common.resetStatsData();
  const stock = await getStockSymbol();
  console.log(stock);
  const verbose = await getVerboseOption();
  console.log(verbose);

  const news = await getNewsAndInfo();
  common.addStats('company.stock', stock);

  const spinner = ora(`Running ${chalk.red(`Starting to Score ${stock}`)}`).start();
  await tiingoData(stock, verbose, spinner);
  spinner.text = `Scored ${chalk.red(`${stock}`)}`;
  await finnData(stock, verbose, news, spinner);
  spinner.text = `Scored ${chalk.red(`${stock}`)}`;

  const score = await scoreStock(stock, verbose, spinner);
  spinner.text = 'Scoring Complete!';
  spinner.succeed();
  console.log(score);
}

async function tiingoData(stock: string, verbose: string, spinner: any) {
  await tiingo.getLatestPrice(stock, verbose, spinner);
  // await tiingo.getBasicInfo(stock, verbose, spinner);
  await tiingo.getStockBook(stock, verbose, spinner);
}

async function finnData(stock: string, verbose: string, news: string, spinner: any) {
  await finnhub.getCompanyInfo(stock, verbose);

  // news
  if (news === 'yes') {
    await finnhub.getDailyStockNews(stock, verbose);
    await finnhub.getWeeklyStockNews(stock, verbose);
    await finnhub.getNewsSentiment(stock, verbose);
    // await finnhub.getGeneralMarketNews(verbose);
    // await finnhub.getMergerMarketNews(verbose);
    // await finnhub.getCryptoMarketNews(verbose);
  }
  // await finnhub.getBasicFinancials(stock, verbose, spinner);

  // await finnhub.getIPOS(verbose);
  await finnhub.getRecommendationTrends(stock, verbose);
  // await finnhub.getPriceTarget(stock, verbose);
  // await finnhub.getEarningsSurprises(stock, verbose);
  // await finnhub.getQuote(stock, verbose);
  // await finnhub.getETFIndustryExposure(stock, verbose);
  // await finnhub.getETFCountryExposure(stock, verbose);
  // await finnhub.getSupportResistanceLevels(stock, verbose);
  // await finnhub.getAggregateIndicators(stock, verbose);
  // await finnhub.getCovidStats(verbose);
    await finnhub.getStockPeers(stock, verbose, spinner);
}

async function scoreStock(stock: string, verbose: string, spinner: any) {
  spinner.text = `Scoring ${chalk.red(`${stock}`)}`;
  const priceScore = await common.calcPrice(verbose, spinner);

  const totalScore = priceScore;
  return totalScore;
}
run();

