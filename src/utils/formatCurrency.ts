import type { Currency } from "../types";

export function formatCurrency(value: number, currency: Currency): string {
  //TODO: tie locale to language setting
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(value);
}
