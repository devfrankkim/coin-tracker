const BASE_URL = "https://api.coinpaprika.com/v1";

const fetchCoins = async () => {
  return await fetch(`${BASE_URL}/coins`).then((res) => res.json());
};

const fetchInfoData = async (id: string) => {
  return await fetch(`${BASE_URL}/coins/${id}`).then((res) => res.json());
};

const fetchPriceData = async (id: string) => {
  return await fetch(`${BASE_URL}/tickers/${id}`).then((res) => res.json());
};

const fetchCoinHistory = async (coinId: string) => {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 23.99;

  return await fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((response) => response.json());
};

export { fetchCoins, fetchInfoData, fetchPriceData, fetchCoinHistory };
