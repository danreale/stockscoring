import * as common from '../common';
const axios = require("axios");
const baseUrl = process.env.TIINGO_URL;
const apiKey = process.env.TIINGO_APIKEY;

export async function getLatestPrice (stockSymbol: string, verbose: string, spinner: any) {
  spinner.text = 'Getting Latest Price';
  const url: string = `${baseUrl}/tiingo/daily/${stockSymbol}/prices?token=${apiKey}`;
  const json = await axios.get(url);
  if (verbose === 'yes') {
    // console.log(url);
    // console.log(json.data);
  }
  common.addStats('company.open', json.data[0].open);
  common.addStats('company.close', json.data[0].close);
  common.addStats('company.high', json.data[0].high);
  common.addStats('company.low', json.data[0].low);
  common.addStats('company.volume', json.data[0].volume);
  common.addStats('company.splitFactor', json.data[0].splitFactor);
}
// export async function getBasicInfo (stockSymbol: string, verbose: string, spinner: any) {
//   spinner.text = 'Getting Basic Stock Info';
//   const url: string = `${baseUrl}/tiingo/daily/${stockSymbol}?token=${apiKey}`;
//   const json = await axios.get(url);
//   if (verbose === 'yes') {
//     // console.log(url);
//     // console.log(json.data.description);
//   }
// }
export async function getStockBook (stockSymbol: string, verbose: string, spinner: any) {
  spinner.text = 'Getting Book Data';
  const url: string = `${baseUrl}/iex?tickers=${stockSymbol}&token=${apiKey}`;
  const json = await axios.get(url);
  if (verbose === 'yes') {
    // console.log(url);
    // console.log(json.data);
  }
  common.addStats('company.previousClose', json.data.prevClose);
}