import type { Currency } from '../types';

export function formatCurrency(value: number, currency: Currency): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency.toUpperCase()
    }).format(value);

    //TODO: tie locale to language setting
}
