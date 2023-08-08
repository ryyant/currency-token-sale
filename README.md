# Multi-currency Token Sale

## Problem statement
Supposedly there's a token sale that sells token X for token Y. For ease of discussion, let's call token X (token for sale), SALE token and token Y (base currency) ETH.

This simple CLI app is to allow us to quickly determine the amount of SALE token a given amount of ETH would fetch. ETHSALE rate is the rate of amount of SALE that 1 ETH can get and is provided as an input with the app.

A token sale may also want to accept another cryptocurrency other than ETH, such as BTC and DOGE. As the price of SALE is fixed at ETH, and BTCUSD price fluctuates according to market, BTCSALE has to be computed based on market rate of BTCUSD and ETHUSD.

### Example:
ETHSALE rate is determined to be 1 ETH to 5000 SALE at start of app.
BTCUSD is given as 10000, ETHUSD is 200. It can be worked out that BTCETH is thus 50.
A purchase with 5 ETH would yield 25,000 SALE
A purchase with 2.4 BTC would yield 600,000 SALE

### Installation

```typescript
npm install
```

### Run against Input Files

```typescript
npx ts-node index.ts < input.txt
```

(For Live Rates)

```typescript
npx ts-node index.ts < input0.txt
```

### Testing

```typescript
npm test
```
