const BASE_URL = `https://api.coinpaprika.com/v1`;
const nomadapi = `https://ohlcv-api.nomadcoders.workers.dev`;

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((respond) => respond.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((respond) => respond.json());
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((respond) =>
    respond.json()
  );
}

export function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000); // 오늘시간을 ms로 변경
  const startDate = endDate - 60 * 60 * 24 * 7 * 2; //api변경으로 의미 없음 2주?
  return fetch(`${nomadapi}/?coinId=${coinId}`).then((response) =>
    response.json()
  );
}
