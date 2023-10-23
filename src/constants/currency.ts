export enum Currency {
    USD = 'USD',
    EUR = 'EUR',
    GBP = 'GBP',
    KZT = 'KZT',
}

export const CURRENCY = Object.values(Currency as Record<string, string>) as [Currency, ...Currency[]];

export const CURRENCY_SYMBOLS: Record<string, string> = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'KZT': '₸',
};

export const getCurrencySymbol = (c: string) => {
    return CURRENCY_SYMBOLS[c] ?? c;
};

export const formatCurrency = (c: string, v: number) => {
    const value = Intl.NumberFormat().format(v);
    const symbol = getCurrencySymbol(c);

    if ((c as Currency) === Currency.USD) {
        return `${symbol}${value}`;
    }

    return `${value}${symbol}`;
};
