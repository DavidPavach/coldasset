import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

// Hooks, Enums and Utils
import { useCoinDetails } from "@/Hooks/useCoinDetails";
import { useCoinPreferences } from "@/Hooks/useCoinPreference";
import { formatCryptoAmount, formatCurrency, formatPercentage } from "@/utils/format";

// Components
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorScreen } from "@/components/ErrorComponents";

// Icons
import { Eye, EyeSlash, Refresh2 } from "iconsax-reactjs";

const AssetList = ({ route }: { route: string }) => {

    const { coins } = useCoinPreferences();
    const { loading, fetching, getAllCoinDetails, refetch, isError } = useCoinDetails();
    const [see, setSee] = useState<boolean>(true);

    if (loading || fetching) {
        return (
            <main className="w-full">
                <section className="bg-card p-2 md:p-3 xl:p-4 border border-border rounded-2xl">
                    {[...Array(10)].map((_, i) => (
                        <section key={`price-skeleton-${i}`} className="flex justify-between items-center my-4">
                            <div className="flex items-center space-x-4">
                                <Skeleton className="rounded-full size-10" />
                                <div className="space-y-2">
                                    <Skeleton className="w-50 h-3" />
                                    <Skeleton className="w-37.5 h-3" />
                                </div>
                            </div>
                            <div className="hidden sm:flex flex-col items-end space-y-2">
                                <Skeleton className="w-37.5 h-3" />
                                <Skeleton className="w-25 h-3" />
                            </div>
                        </section>
                    ))}
                </section>
            </main>
        );
    }

    if (isError) {
        return <ErrorScreen variant="fullscreen" size="sm" type="500" onRetry={refetch} />;
    }

    // Functions
    const toggleSee = () => setSee((prev) => !prev);
    const allAssets = getAllCoinDetails();
    const assets = allAssets.filter(asset => coins[asset.name.toLowerCase()] === true);

    return (
        <main>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <section className="bg-card p-4 border border-border rounded-2xl">
                    <div className="flex justify-between items-center pb-4 border-border border-b">
                        <h1 className="font-bold text-base md:text-lg xl:text-xl">Your Assets List</h1>
                        <div className="flex gap-x-5">
                            {see ? <Eye className="size-4 lg:size-5 hover:text-primary transition-colors cursor-pointer" onClick={toggleSee} /> : <EyeSlash className="size-4 lg:size-5 hover:text-primary transition-colors cursor-pointer" onClick={toggleSee} />}
                            <Refresh2 onClick={refetch} className="size-4 lg:size-5 hover:text-primary transition-colors cursor-pointer" />
                        </div>
                    </div>
                    {assets.map((asset) => (
                        <Link to={`${route}`} search={{ coin: asset.name.toLowerCase() }} key={asset.id} className="block bg-card p-2 border-border border-b transition-colors cursor-pointer">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-card rounded-full w-10 h-10 overflow-hidden shrink-0">
                                        <img src={asset.logo} alt={asset.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="font-medium">{asset.name}</div>
                                        <div className="text-muted-foreground text-sm">{asset.symbol}</div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="font-medium montserrat">{formatCurrency(asset.price)}</div>
                                    <div className={`text-sm ${asset.priceChange24h >= 0 ? "text-green-500" : "text-destructive"}`}>
                                        {formatPercentage(asset.priceChange24h)}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-3">
                                <div>
                                    <div className="text-muted-foreground text-sm">Holdings</div>
                                    <div className="font-medium montserrat">
                                        {!see ? "••••••" : `${formatCryptoAmount(asset.holdings)} ${asset.symbol}`}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-muted-foreground text-sm">Value</div>
                                    <div className="font-medium montserrat">
                                        {!see ? "••••••" : formatCurrency(asset.value)}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </section>
            </motion.div >
        </main>
    );
}

export default AssetList;