// Hooks and Utils
import { useCoinDetails, type CoinDetails } from "@/Hooks/useCoins";
import { useGetUserBalance } from "@/services/queries.service";
import { formatCurrency, formatPercentage } from "@/utils/format";

// Components
import { ErrorScreen } from "@/components/ErrorComponents";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Icons
import { Loader2, TrendingUp, TrendingDown } from "lucide-react";

const UserBalance = ({ userId }: { userId: string }) => {

    const { getAllCoinDetails, loading, fetching, isError: detailsError, refetch: refetchCoinDetails } = useCoinDetails();
    const { data: balances, isFetching, isLoading, isError, refetch } = useGetUserBalance(userId);

    const isBusy = loading || fetching || isFetching || isLoading

    const refetchAll = () => {
        refetchCoinDetails()
        refetch()
    }

    if (isBusy) {
        return (
            <div className="flex flex-col justify-center items-center h-[40vh]">
                <Loader2 className="size-6 text-primary animate-spin" />
                <p className="mt-1 text-muted-foreground text-sm">
                    Loading balance details
                </p>
            </div>
        )
    }

    if (isError || detailsError) {
        return (
            <ErrorScreen variant="card" size="sm" type="500" onRetry={refetchAll} />
        )
    }

    const portfolioFn = () => {
        if (!balances) return []
        const coinDetails = getAllCoinDetails();

        return coinDetails.map((coin: CoinDetails) => {

            const balance = Number(balances[coin.id] ?? 0)
            const usdValue = balance * coin.price

            return {
                ...coin,
                balance,
                usdValue,
            }
        })
    }

    const portfolio = portfolioFn();
    const totalUsdValue = portfolio.reduce((sum, coin) => sum + coin.usdValue, 0)
    const nonZeroCoins = portfolio.filter((coin) => coin.balance > 0)

    return (
        <main className="space-y-6">

            <Card className="border-border">
                <CardHeader>
                    <CardTitle>Portfolio Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center">
                        <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                            Total Portfolio Value (Estimated)
                        </p>
                        <p className="mt-1 font-bold text-2xl md:text-3xl montserrat">
                            {formatCurrency(totalUsdValue)}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* ===== Coin Balances ===== */}
            <Card className="border-border">
                <CardHeader>
                    <CardTitle>Cryptocurrency Balances</CardTitle>
                </CardHeader>
                <CardContent>
                    {nonZeroCoins.length === 0 ? (
                        <div className="py-10 text-[11px] text-muted-foreground md:text-xs xl:text-sm text-center">
                            No assets in this wallet
                        </div>
                    ) : (
                        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {portfolio.map((coin) => {
                                const isUp = coin.priceChange24h >= 0

                                return (
                                    <div key={coin.id} className="bg-card hover:shadow-md p-4 border border-border rounded-2xl transition">
                                        <div className="flex items-center gap-3">
                                            <img src={coin.logo} alt={coin.name} className="size-8" />
                                            <div className="flex-1">
                                                <p className="font-medium">{coin.name}</p>
                                                <p className="text-muted-foreground text-xs">
                                                    {coin.symbol}
                                                </p>
                                            </div>
                                        </div>

                                        <section className="space-y-1 mt-4">
                                            <div>
                                                <p className="text-[11px] text-muted-foreground md:text-xs text-sm"> Balance </p>
                                                <p className="font-medium montserrat">
                                                    {coin.balance.toLocaleString()} {coin.symbol}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-[11px] text-muted-foreground md:text-xs text-sm"> Value</p>
                                                <p className="font-semibold montserrat">
                                                    {formatCurrency(coin.usdValue)}
                                                </p>
                                            </div>
                                        </section>

                                        <div className="flex items-center gap-1 mt-3 text-xs montserrat">
                                            {isUp ? (
                                                <TrendingUp className="size-4 text-emerald-500" />
                                            ) : (
                                                <TrendingDown className="size-4 text-destructive" />
                                            )}
                                            <span className={isUp ? "text-emerald-500" : "text-destructive"}>
                                                {formatPercentage(coin.priceChange24h)}%
                                            </span>
                                            <span className="text-muted-foreground">
                                                (24h)
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>
        </main>
    )
}

export default UserBalance
