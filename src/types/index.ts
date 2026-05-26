export type Currency = "usd" | "eur" | "brl";

export type SimplePriceResponse = {
  bitcoin: Partial<Record<Currency, number>>;
};

export type MarketChartResponse = {
  prices: Array<[number, number]>;
};

export type PricePoint = {
  date: string;
  price: number;
};

export type Language = "pt" | "en";

export type LanguageContextType = {
  language: Language;
  toggleLanguage: () => void;
};

export type Translations = {
  title: string;
  amountLabel: string;
};
