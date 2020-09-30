const axios = require("axios");
const baseUrl = process.env.FINNHUB_URL;
const apiKey = process.env.FINNHUB_APIKEY;
import moment = require('moment');
import * as common from '../common';

export async function getCompanyInfo (stockSymbol: string, verbose: string) {
  const url: string = `${baseUrl}/stock/profile2?symbol=${stockSymbol}&token=${apiKey}`;
  const json = await axios.get(url);
  if (verbose === 'yes') {
    // console.log(url);
    // console.log(json.data);
  }
  common.addStats('company.marketCap', json.data.marketCapitalization);
}
export async function getGeneralMarketNews (verbose: string) {
  const url: string = `${baseUrl}/news?category=general&token=${apiKey}`;
  if (verbose === 'yes') {
    console.log(url);
  }
  const json = await axios.get(url);
  console.log(json.data);
}
export async function getCryptoMarketNews (verbose: string) {
  const url: string = `${baseUrl}/news?category=crypto&token=${apiKey}`;
  if (verbose === 'yes') {
    console.log(url);
  }
  const json = await axios.get(url);
  console.log(json.data);
}
export async function getMergerMarketNews (verbose: string) {
  const url: string = `${baseUrl}/news?category=merger&token=${apiKey}`;
  if (verbose === 'yes') {
    console.log(url);
  }
  const json = await axios.get(url);
  console.log(json.data);
}
export async function getWeeklyStockNews (stock: string, verbose: string) {
  const today = moment()
  const from_date = today.startOf('week').format('YYYY-MM-DD');
  const today_date = today.format('YYYY-MM-DD');
  const url: string = `${baseUrl}/company-news?symbol=${stock}&from=${from_date}&to=${today_date}&token=${apiKey}`;
  const json = await axios.get(url);
  if (verbose === 'yes') {
    console.log(url);
    console.log(json.data);
    for (let i = 0; i < json.data.length; i++) {
      console.log(json.data[i].headline);
      console.log(json.data[i].summary);
    }
  }
  
}
export async function getDailyStockNews (stock: string, verbose: string) {
  const today = moment().format('YYYY-MM-DD');
  const url: string = `${baseUrl}/company-news?symbol=${stock}&from=${today}&to=${today}&token=${apiKey}`;
  const json = await axios.get(url);
  if (verbose === 'yes') {
    console.log(url);
    console.log(json.data);
    for (let i = 0; i < json.data.length; i++) {
      console.log(json.data[i].headline);
      console.log(json.data[i].summary);
    }
  }
}
export async function getNewsSentiment (stock: string, verbose: string) {
  const url: string = `${baseUrl}/news-sentiment?symbol=${stock}&token=${apiKey}`;
  if (verbose === 'yes') {
    console.log(url);
  }
  const json = await axios.get(url);
  console.log(json.data);
}
export async function getStockPeers (stock: string, verbose: string, spinner: any) {
  spinner.text = 'Getting Stock Peers'
  const url: string = `${baseUrl}/stock/peers?symbol=${stock}&token=${apiKey}`;
  if (verbose === 'yes') {
    // console.log(url);
  }
  const json = await axios.get(url);
  common.addStats('peers', json.data);
}
export async function getBasicFinancials (stock: string, verbose: string, spinner: any) {
  spinner.text = "Getting Basic Financial Data";
  const url: string = `${baseUrl}/stock/metric?symbol=${stock}&metric=all&token=${apiKey}`;
  if (verbose === 'yes') {
    console.log(url);
  }
  const json = await axios.get(url);
  console.log(json.data);
}
export async function getIPOS (verbose: string) {
  const today = moment()
  const from_date = today.startOf('week').format('YYYY-MM-DD');
  const today_date = today.format('YYYY-MM-DD');
  const url: string = `${baseUrl}/calendar/ipo?from=${from_date}&to=${today_date}&token=${apiKey}`;
  if (verbose === 'yes') {
    console.log(url);
  }
  const json = await axios.get(url);
  console.log(json.data);
}
export async function getRecommendationTrends (stock: string, verbose: string) {
  const url: string = `${baseUrl}/stock/recommendation?symbol=${stock}&token=${apiKey}`;
  if (verbose === 'yes') {
    console.log(url);
  }
  const json = await axios.get(url);
  console.log(json.data);
}
export async function getPriceTarget (stock: string, verbose: string) {
  const url: string = `${baseUrl}/stock/price-target?symbol=${stock}&token=${apiKey}`;
  if (verbose === 'yes') {
    console.log(url);
  }
  const json = await axios.get(url);
  console.log(json.data);
}
export async function getEarningsSurprises (stock: string, verbose: string) {
  const url: string = `${baseUrl}/stock/earnings?symbol=${stock}&token=${apiKey}`;
  if (verbose === 'yes') {
    console.log(url);
  }
  const json = await axios.get(url);
  console.log(json.data);
}
export async function getQuote (stock: string, verbose: string) {
  const url: string = `${baseUrl}/quote?symbol=${stock}&token=${apiKey}`;
  if (verbose === 'yes') {
    console.log(url);
  }
  const json = await axios.get(url);
  console.log(json.data);
}
export async function getETFIndustryExposure (stock: string, verbose: string) {
  const url: string = `${baseUrl}/etf/sector?symbol=${stock}&token=${apiKey}`;
  if (verbose === 'yes') {
    console.log(url);
  }
  const json = await axios.get(url);
  console.log(json.data);
}
export async function getETFCountryExposure (stock: string, verbose: string) {
  const url: string = `${baseUrl}/etf/country?symbol=${stock}&token=${apiKey}`;
  if (verbose === 'yes') {
    console.log(url);
  }
  const json = await axios.get(url);
  console.log(json.data);
}
export async function getSupportResistanceLevels (stock: string, verbose: string) {
  const url: string = `${baseUrl}/scan/support-resistance?symbol=${stock}&resolution=D&token=${apiKey}`;
  if (verbose === 'yes') {
    console.log(url);
  }
  const json = await axios.get(url);
  console.log(json.data);
}
export async function getAggregateIndicators (stock: string, verbose: string) {
  const url: string = `${baseUrl}/scan/technical-indicator?symbol=${stock}&resolution=M&token=${apiKey}`;
  if (verbose === 'yes') {
    console.log(url);
  }
  const json = await axios.get(url);
  console.log(json.data);
}
export async function getCovidStats (verbose: string) {
  const url: string = `${baseUrl}/covid19/us?token=${apiKey}`;
  if (verbose === 'yes') {
    console.log(url);
  }
  const json = await axios.get(url);
  console.log(json.data);
}