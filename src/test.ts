const axios = require("axios");

export async function getTestTiingo (stockSymbol: string) {
  const baseUrl = process.env.TIINGO_URL;
  const apiKey = process.env.TIINGO_APIKEY;
  const url: string = `${baseUrl}/daily/${stockSymbol}?token=${apiKey}`;
  const json = await axios.get(url);
  return json;
}
export async function getTestFINN (stockSymbol: string) {
  const baseUrl = process.env.FINNHUB_URL;
  const apiKey = process.env.FINNHUB_APIKEY;
  const url: string = `${baseUrl}/quote?symbol=${stockSymbol}&token=${apiKey}`;
  const json = await axios.get(url);
  return json;
}
export async function getTestIEX (stockSymbol: string) {
  const baseUrl = process.env.IEX_URL;
  const apiKey = process.env.IEX_APIKEY;
  const url: string = `${baseUrl}/stock/${stockSymbol}/stats?token=${apiKey}`;
  const json = await axios.get(url);
  return json;
}
