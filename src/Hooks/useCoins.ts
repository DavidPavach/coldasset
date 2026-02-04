// Services and Enums
import { usePrices } from '@/services/queries.service';
import { coinMap, coinMeta } from '@/enum';

type PriceObj = {
    usd?: number;
    usd_24h_change?: number;
    usd_market_cap?: number;
    usd_24h_vol?: number;
};

type PricesResponse = {
    data: Record<string, PriceObj>;
};

export type CoinDetails = {
    id: string;
    name: string;
    symbol: string;
    logo: string;
    fromColor: string;
    toColor: string;
    price: number;
    priceChange24h: number;
    marketCap: number;
    tradingVolume: number;
};

export const useCoinDetails = () => {
    const {
        data: pricesData,
        isLoading: pricesLoading,
        isFetching: pricesFetching,
        isError: pricesError,
        refetch: refetchPrices,
    } = usePrices() as {
        data?: PricesResponse;
        isLoading: boolean;
        isFetching: boolean;
        isError: boolean;
        refetch: () => void;
    };

    const loading = pricesLoading;
    const fetching = pricesFetching;
    const isError = !!pricesError;

    const refetch = () => {
        refetchPrices();
    };

    // Get single coin details
    const getCoinDetails = (coinKey: string): CoinDetails => {
        const key = coinKey.toLowerCase();
        const apiKey = coinMap[key];
        const priceObj = pricesData?.data?.[apiKey];

        const price = priceObj?.usd ?? 0;
        const priceChange = priceObj?.usd_24h_change ?? 0;
        const marketCap = priceObj?.usd_market_cap ?? 0;
        const tradingVolume = priceObj?.usd_24h_vol ?? 0;

        const meta = coinMeta[key] ?? {
            name: coinKey,
            symbol: coinKey.toUpperCase(),
            logo: undefined,
        };

        return {
            id: coinKey,
            name: meta.name,
            symbol: meta.symbol,
            logo: meta.logo,
            fromColor: meta.colorFrom,
            toColor: meta.colorTo,
            price,
            priceChange24h: priceChange,
            marketCap,
            tradingVolume,
        };
    };

    // Kept for API compatibility
    const getTotalBalance = (): number => 0;

    // Get all coins (no balances, sorted by market cap)
    const getAllCoinDetails = (): CoinDetails[] => {
        if (!pricesData?.data) return [];

        return Object.keys(coinMap)
            .map((coinKey) => getCoinDetails(coinKey))
            .sort((a, b) => b.marketCap - a.marketCap);
    };

    return {
        getCoinDetails,
        getAllCoinDetails,
        getTotalBalance,
        loading,
        fetching,
        isError,
        refetch,
    };
};
