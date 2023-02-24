// server.ts simulate backend calling live rates
const axios = require("axios");

let url = "https://api.coingecko.com/api/v3/simple/price";

export const getLiveRates = async () => {
  return await axios
    .get(url, {
      params: {
        ids: "ethereum-wormhole,bitcoin,binance-peg-dogecoin",
        vs_currencies: "usd",
        precision: "full",
      },
    })
    .then((response: any) => {
      return response.data;
    })
    .catch((error: Error) => {
      console.log(error);
    });
};
