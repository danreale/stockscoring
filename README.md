# Stock Scoring
Scoring a stock based on technical indicators.

## How to run
Example on how to score Apple's stock
`node run.js -s=aapl`

## IPO's
`node weeklyipos.js`
Be sure to set the email addresses in the config.json before running

## How to compile typescript
`tsc -p ./tsconfig.json`
`tsc`

### Example config.json
```{
    "baseUrl": "https://api.iextrading.com/1.0",
    "emailAddress": "sentfrom@gmail.com",
    "emailPassword": "test",
    "emailTo": "sendto@gmail.com"
}```