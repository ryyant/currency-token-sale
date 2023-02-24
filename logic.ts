const BigNumber = require("bignumber.js");

// main processing logic for each line
export const processLine = (
  linesInput: String[],
  btc_eth_rate: any,
  doge_eth_rate: any
) => {
  let res: string[] = [];
  for (let line of linesInput) {
    let l = line.split(" ");
    let saleDP = Number(l[1]);
    let purchaseCurr = l[2];
    let eth_sale_rate = BigNumber(l[0]);
    let purchaseAmt = BigNumber(l[3]);
    let saleValue = BigNumber();
    if (purchaseCurr === "ETH") {
      saleValue = eth_sale_rate.multipliedBy(purchaseAmt);
    } else if (purchaseCurr === "BTC") {
      let btc_sale_rate = btc_eth_rate.multipliedBy(eth_sale_rate);
      saleValue = btc_sale_rate.multipliedBy(purchaseAmt);
    } else {
      let doge_sale_rate = doge_eth_rate.multipliedBy(eth_sale_rate);
      saleValue = doge_sale_rate.multipliedBy(purchaseAmt);
    }

    BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_DOWN });
    res.push(saleValue.toFixed(saleDP).toString());
  }
  return res;
};
