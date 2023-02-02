import { Currency } from "@prisma/client";

export const CURRENCY = Object.values(Currency as Record<string, string>) as [Currency, ...Currency[]];

export const CURRENCY_SYMBOLS: Record<string, string> = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'KZT': '₸',
};

export const getCurrencySymbol = (c: string) => {
    return CURRENCY_SYMBOLS[c] ?? c;
}

export const formatCurrency = (c: string, v: number) => {
    const symbol = getCurrencySymbol(c);
    if (c === 'USD') {
        return `${symbol}${v}`;
    }
    return `${v} ${symbol}`;
}
