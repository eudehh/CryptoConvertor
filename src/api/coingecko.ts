import type {
  Currency,
  PricePoint,
  SimplePriceResponse,
  MarketChartResponse,
} from "../types";

const API_BASE_URL = "https://api.coingecko.com/api/v3";

export async function fetchBitcoinPrice(
  currency: Currency,
  signal?: AbortSignal,
): Promise<number> {
  const url = `${API_BASE_URL}/simple/price?ids=bitcoin&vs_currencies=${currency}`;
  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(`CoinGecko request failed (${res.status})`);
  }
  const data = (await res.json()) as SimplePriceResponse;
  const price = data.bitcoin[currency];

  if (price === undefined) {
    throw new Error(`Price not found for ${currency}`);
  }
  return price;
}

export async function fetchPriceHistory(
  currency: Currency,
  signal?: AbortSignal,
): Promise<PricePoint[]> {
  const url = `${API_BASE_URL}/coins/bitcoin/market_chart?vs_currency=${currency}&days=7`;
  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(`CoinGecko request failed (${res.status})`);
  }
  const data = (await res.json()) as MarketChartResponse;
  return data.prices.map(([timestamp, price]) => ({
    date: new Date(timestamp).toLocaleDateString("en-GB", {
      day: "2-digit", // TODO: tie locale to language setting
      month: "2-digit",
    }),
    price: Number(price.toFixed(2)),
  }));
}
