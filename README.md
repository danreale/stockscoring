# Stock Scoring
Scoring a stock based on technical indicators.

## How to run Stock Score
Example on how to score Apple's stock

`node run.js --sc=aapl`

## IPO's
Be sure to set the email addresses in the config.json before trying to send an email

No Email `node run.js --ipo=yes` or `node run.js --ipo=yes --e=no`

With Email `node run.js --ipo=yes --e=yes`

## How to compile typescript
`tsc -p ./tsconfig.json`

`tsc`

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
Most Active Stocks `node run.js --ma=yes`

Most Gained Stocks `node run.js --mg=yes`

Most Loser Stocks `node run.js --ml=yes`

Most In Focus Stocks `node run.js --mf=yes`

IEX Volume Stocks `node run.js --iv=yes`

IEX Percent Stocks `node run.js --ip=yes`

## Cryptocurrency
`node run.js --c=yes`

## Get Peer Stocks
`node run.js --p=yes --s=aapl`

## Get Stock News
No Email `node run.js --sn=yes --s=aapl` or `node run.js --sn=yes --e=no --s=aapl`

With Email `node run.js --sn=yes --e=yes --s=aapl`

## Get Market News
No Email `node run.js --mn=yes` or `node run.js --mn=yes --e=no`

With Email `node run.js --mn=yes --e=yes`