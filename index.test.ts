import { describe, expect, test } from "@jest/globals";
import { setRates, setLiveRates } from "./index";
import { processLine } from "./logic";
const axios = require("axios");

let line1 = "3825.281112 138.8911 0.00198422341298374987";
let lines = [
  "1.5 3 ETH 3.5",
  "1.5 3 BTC 3.5",
  "1.5 3 DOGE 3.5",
  "1.5 3 DOGE 350000",
  "1.5 1 ETH 3.5",
  "6540825.876543210987654325 18 ETH 992465.123456789012345678",
  "6540825.876543210987654325 18 DOGE 992465.123456789012345678",
  "6540825.876543210987654325 18 BTC 992465.123456789012345678",
];
let expectedRes = [
  "5.250",
  "144.593",
  "0.000",
  "7.500",
  "5.2",
  "6491541561072.818099748528072316",
  "92739338.602961358374866197",
  "178787347219043.160674658985510029",
];
let url = "https://api.coingecko.com/api/v3/simple/price";

describe("Multi-currency Token Sale Test", () => {
  test("test add rates", () => {
    let l = line1.split(" ");
    let r = setRates(l);
    let res = processLine(lines, r.btc_eth_rate, r.doge_eth_rate);
    expect(res).toStrictEqual(expectedRes);
  });

  it("should fetch from coingecko", async () => {
    let response = await axios.get(url, {
      params: {
        ids: "ethereum-wormhole,bitcoin,binance-peg-dogecoin",
        vs_currencies: "usd",
        precision: "full",
      },
    });
    expect(response.status).toBe(200);
  });
});
