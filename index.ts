const readline = require("readline");
const BigNumber = require("bignumber.js");
import { processLine } from "./logic";
import { getLiveRates } from "./server";

const rl = readline.createInterface({
  input: process.stdin,
});

let line1 = "";
let lines: string[] = [];

// read line by line
rl.on("line", (line: string) => {
  if (line1 === "") {
    line1 = line;
  } else {
    lines.push(line);
  }
});

rl.on("close", async () => {
  // process for live rates
  if (line1 === "CURRENT") {
    let liveRates = await getLiveRates();
    if (liveRates) {
      let r = setLiveRates(liveRates);
      let res = processLine(lines, r.btc_eth_rate, r.doge_eth_rate);
      res.forEach((r) => console.log(r));
    }
  } else {
    // process line 1 for input rates
    let l = line1.split(" ");
    let r = setRates(l);
    let res = processLine(lines, r.btc_eth_rate, r.doge_eth_rate);
    res.forEach((r) => console.log(r));
  }
});

export const setLiveRates = (liveRates: any) => {
  let btc_usd_rate = BigNumber(String(liveRates["bitcoin"]["usd"]));
  let eth_usd_rate = BigNumber(String(liveRates["ethereum-wormhole"]["usd"]));
  let doge_usd_rate = BigNumber(
    String(liveRates["binance-peg-dogecoin"]["usd"])
  );
  let btc_eth_rate = BigNumber(btc_usd_rate).dividedBy(eth_usd_rate);
  let doge_eth_rate = BigNumber(doge_usd_rate).dividedBy(eth_usd_rate);
  return { btc_eth_rate, doge_eth_rate };
};

export const setRates = (rates: string[]) => {
  let btc_usd_rate = BigNumber(rates[0]);
  let eth_usd_rate = BigNumber(rates[1]);
  let doge_usd_rate = BigNumber(rates[2]);
  let btc_eth_rate = BigNumber(btc_usd_rate).dividedBy(eth_usd_rate);
  let doge_eth_rate = BigNumber(doge_usd_rate).dividedBy(eth_usd_rate);
  return { btc_eth_rate, doge_eth_rate };
};
