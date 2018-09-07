# Stock Scoring
Scoring a stock based on technical indicators.

## How to run Stock Score
Example on how to score Apple's stock

`node ./js/run.js --sc=aapl`

## IPO's
Be sure to set the email addresses in the config.json before trying to send an email

No Email `node ./js/run.js --ipo=yes` or `node ./js/run.js --ipo=yes --e=no`

With Email `node ./js/run.js --ipo=yes --e=yes`

## How to compile typescript to javascript in project
`npm run compilets`

### Example config.json
```
{
    "baseUrl": "https://api.iextrading.com/1.0",
    "emailAddress": "sentfrom@gmail.com",
    "emailPassword": "test",
    "emailTo": "sendto@gmail.com"
}
```

## How to run List Examples
Most Active Stocks `node ./js/run.js --ma=yes`

Most Gained Stocks `node ./js/run.js --mg=yes`

Most Loser Stocks `node ./js/run.js --ml=yes`

Most In Focus Stocks `node ./js/run.js --mf=yes`

IEX Volume Stocks `node ./js/run.js --iv=yes`

IEX Percent Stocks `node ./js/run.js --ip=yes`

## Cryptocurrency
`node ./js/run.js --c=yes`

## Get Peer Stocks
`node ./js/run.js --p=yes --s=aapl`

## Get Stock News
No Email `node ./js/run.js --sn=yes --s=aapl` or `node ./js/run.js --sn=yes --e=no --s=aapl`

With Email `node ./js/run.js --sn=yes --e=yes --s=aapl`

## Get Market News
No Email `node ./js/run.js --mn=yes` or `node ./js/run.js --mn=yes --e=no`

With Email `node ./js/run.js --mn=yes --e=yes`