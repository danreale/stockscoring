const chalk = require('chalk');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('stats.json')
const db = low(adapter)

export function formatResult(text: string, style: string) {
  if (style === 'positive') {
    console.log(chalk.green(text));
  }
  if (style === 'neutral') {
    console.log(chalk.yellow(text));
  }
  if (style === 'negative') {
    console.log(chalk.red(text));
  }
  if (style === 'score') {
    console.log(chalk.blue(text));
  }
  if (style === 'other') {
    console.log(chalk.white(text));
  }
}
export function getScore(score: any) {
  const sum = score.reduce(function(a: any, b: any){
    return a + b;
  }, 0);
  return sum;
}

export async function calcPrice(verbose: string, spinner: any){
  spinner.text = 'Scoring Price Data';
  const openPrice = db.get('company.open').value();
  const closePrice = db.get('company.close').value();
  if (openPrice > closePrice){
      if (verbose === "yes") {
        formatResult(`Stock went down in price on the day`, 'negative');
        formatResult(`Price is bearish -1`, 'negative');
        formatResult(`Price score is -1`, 'score');
      }
      return -1;
  }
  else if (openPrice < closePrice){
      if (verbose === "yes") {
        formatResult(`Stock went up in price on the day`, 'positive');
        formatResult(`Price is bullish +1`, 'positive');
        formatResult(`Price score is +1`, 'score');
      }
      return 1;
  }
  else{
      if (verbose === "yes") {
        formatResult(`Price was not scored`, 'other');
      }
      return 0;
  }
}

// async function calcPERatio(stat: string, value: number, verbose: string){
//   if (value >= 20){
//       score = score + 1;
//       if (verbose === "yes") {
//           console.log(`${stat} is bullish +1`);
//           console.log(`current score is ${score}`);
//       }
//   }
//   else if (value < 20){
//       score = score - 1;
//       if (verbose === "yes") {
//           console.log(`${stat} is bearish -1`);
//           console.log(`current score is ${score}`);
//       }
//   }
//   else{
//       score = score - 2;
//       if (verbose === "yes") {
//           console.log("Company is losing money");
//           console.log(`${stat} was not scored -2`);
//           console.log(`current score is ${score}`);
//       }
//   }
// }

// async function calc52WeekHighLow(stat: string, dailyHigh: number, dailyLow: number, high: number, low: number, close: number, verbose: string){
//   if (verbose === "yes") {
//       console.log(`${stat}`);
//   }
//   if (dailyHigh > high){
//       score = score + 1;
//       if (verbose === "yes") {
//           console.log("Trending towards 52 Week High. Moving Higher +1");
//           console.log(`current score is ${score}`);
//       }
//   }
//   if (dailyHigh < high){
//       score = score + 0;
//       if (verbose === "yes") {
//           console.log("Daily high did not go above 52 week high +0");
//           console.log(`current score is ${score}`);
//       }
//   }
//   if (dailyLow < low){
//       score = score - 1;
//       if (verbose === "yes") {
//           console.log("Trending towards 52 Week Low. Moving Lower -1");
//           console.log(`current score is ${score}`);
//       }
//   }
//   if (dailyLow > low){
//       score = score + 1;
//       if (verbose === "yes") {
//           console.log("Daily low did not go below 52 week low +1");
//           console.log(`current score is ${score}`);
//       }
//   }
//   if (close >= high){
//       score = score + 2;
//       if (verbose === "yes") {
//           console.log("Above 52 Week High. Moving Higher. Buy / Stop Gains +2");
//           console.log(`current score is ${score}`);
//       }
//   }
//   if (close <= low){
//       score = score - 2;
//       if (verbose === "yes") {
//           console.log("Below 52 Week Low. Moving Lower. Sell. Good Time to Short -2");
//           console.log(`current score is ${score}`);
//       }
//   }
// }

// async function calcMarketCap(marketCap: number, verbose: string){
//   if (marketCap >= 200000000000){
//       score = score + 6;
//       if (verbose === "yes") {
//           console.log("Mega Cap. Low Risk, Low Return. Blue Chip. +6");
//           console.log(`current score is ${score}`);
//       }
//   }
//   else if ((marketCap < 200000000000) && (marketCap > 10000000000)){
//       score = score + 5;
//       if (verbose === "yes") {
//           console.log("Large Cap. Stable and Secure. Blue Chip. +5");
//           console.log(`current score is ${score}`);
//       }
//   }
//   else if ((marketCap < 10000000000) && (marketCap > 2000000000)){
//       score = score + 4;
//       if (verbose === "yes") {
//           console.log("Mid Cap. Stable but more volatile. On way to becoming large cap stock. +4");
//           console.log(`current score is ${score}`);
//       }
//   }
//   else if ((marketCap < 2000000000) && (marketCap > 300000000)){
//       score = score + 3;
//       if (verbose === "yes") {
//           console.log("Small Cap. More volatile. Greater Risk +3");
//           console.log(`current score is ${score}`);
//       }
//   }
//   else if ((marketCap < 300000000) && (marketCap > 50000000)){
//       score = score + 2;
//       if (verbose === "yes") {
//           console.log("Micro Cap. Penny Stocks. Great Risk. Not a safe investment +2");
//           console.log(`current score is ${score}`);
//       }
//   }
//   else if (marketCap < 50000000){
//       score = score + 1;
//       if (verbose === "yes") {
//           console.log("Nano Cap. Most Risky. Potential for gain is small. +1");
//           console.log(`current score is ${score}`);
//       }
//   }
// }

// async function calcChange(change: number, verbose: string){
//   if (change >= 0){
//       score = score + 1;
//       if (verbose === "yes") {
//           console.log("Positive Change. +1");
//           console.log(`current score is ${score}`);
//       }
//   }
//   else if (change < 0){
//       score = score - 1;
//       if (verbose === "yes") {
//           console.log("Negative Change. -1");
//           console.log(`current score is ${score}`);
//       }
//   }
// }

// async function calcChangePercent(changePercent: number, verbose: string){
//   if (changePercent >= 1){
//       score = score + 2;
//       if (verbose === "yes") {
//           console.log("Positive Change. +2");
//           console.log(`current score is ${score}`);
//       }
//   }
//   else if (changePercent < 0){
//       score = score - 1;
//       if (verbose === "yes") {
//           console.log("Negative Change. -1");
//           console.log(`current score is ${score}`);
//       }
//   }
//   else{
//       score = score + 1;
//       if (verbose === "yes") {
//           console.log("Small Change. +1");
//           console.log(`current score is ${score}`);
//       }
//   }
// }
// async function calcEarnings(stat: string, value: number, verbose: string){
//   if (value >= 30){
//       score = score + 3;
//       if (verbose === "yes") {
//           console.log(`${stat} is bullish +3`);
//           console.log(`current score is ${score}`);
//       }
//   }
//   else if ((value >= 18) && (value < 25)){
//       score = score + 1;
//       if (verbose === "yes") {
//           console.log(`${stat} is bullish +1`);
//           console.log(`current score is ${score}`);
//       }
//   }
//   else if ((value >= 25) && (value < 30)){
//       score = score + 2;
//       if (verbose === "yes") {
//           console.log(`${stat} is bullish +2`);
//           console.log(`current score is ${score}`);
//       }
//   }
//   else if (value < 18){
//       score = score - 1;
//       if (verbose === "yes") {
//           console.log(`${stat} is bearish -1`);
//           console.log(`current score is ${score}`);
//       }
//   }
// }
// async function calcYearAgo(stat: string, yearAgo: number, actual: number, verbose: string){
//   if (actual > yearAgo){
//       score = score + 1;
//       if (verbose === "yes") {
//           console.log(`${stat} is bullish +1`);
//           console.log(`current score is ${score}`);
//       }
//   }
//   else if (actual < yearAgo){
//       score = score - 1;
//       if (verbose === "yes") {
//           console.log(`${stat} is bearish -1`);
//           console.log(`current score is ${score}`);
//       }
//   }
// }


export function addStats(stat: string, value: string) {
  db.set(stat, value)
  .write()
}
export function resetStats() {
// Set some defaults
db.defaults({ company: {}, peers: [] })
  .write()
}
export function resetStatsData() {
  db.set('company', {})
  .write()
  db.set('peers', [])
  .write()
}