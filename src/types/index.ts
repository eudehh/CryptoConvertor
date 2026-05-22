export type Currency = "usd" | "eur" | "brl";

export type SimplePriceResponse = {
    bitcoin: Partial<Record<Currency, number>>; 
}

export type MarketChartResponse ={
    prices: Array<[number, number]>;

}

export type PricePoint = {
    date: string;
    price: number;
}

