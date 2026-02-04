// Services and Enums
import { usePrices, useUserBalance } from '@/services/queries.service';
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

type BalanceResponse = {
    data: UserBalance;
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
    userBalance: number;
    holdings: number;
    value: number;
    marketCap: number;
    tradingVolume: number;
    percentage: number;
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

    const { data: balancesData, isLoading: balancesLoading, isFetching: balancesFetching, isError: balancesError, refetch: refetchBalances } = useUserBalance() as {
        data?: BalanceResponse;
        isLoading: boolean;
        isFetching: boolean;
        isError: boolean;
        refetch: () => void;
    };

    const loading = pricesLoading || balancesLoading;
    const fetching = pricesFetching || balancesFetching;
    const isError = !!pricesError || !!balancesError;

    const refetch = () => {
        refetchPrices();
        refetchBalances();
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

        const userBalance = balancesData?.data?.[key as keyof BalanceResponse['data']] ?? 0;

        const holdings = userBalance;
        const value = userBalance * price;

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
            userBalance,
            holdings,
            value,
            marketCap,
            tradingVolume,
            percentage: 0,
        };
    };

    // Get total balance in USD
    const getTotalBalance = (): number => {
        if (!balancesData?.data || !pricesData?.data) return 0;

        return Object.entries(balancesData.data).reduce(
            (total, [coinKey, amount]) => {
                const key = coinKey.toLowerCase();
                const apiKey = coinMap[key];
                const priceObj = pricesData.data[apiKey];
                const price = priceObj?.usd ?? 0;

                return total + amount * price;
            },
            0
        );
    };

    // Get all coins, sorted, with percentages
    const getAllCoinDetails = (): CoinDetails[] => {
        if (!balancesData?.data || !pricesData?.data) return [];

        const totalBalance = getTotalBalance();

        const result = Object.keys(balancesData.data).map((coinKey) => {
            const asset = getCoinDetails(coinKey);

            const percentage = totalBalance > 0 ? Number(((asset.value / totalBalance) * 100).toFixed(2)) : 0;

            return { ...asset, percentage };
        });

        // Sort descending by USD value
        return result.sort((a, b) => b.value - a.value);
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
