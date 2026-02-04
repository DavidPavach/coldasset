import { motion } from "framer-motion";

// Hooks
import { useCoinDetails } from "@/Hooks/useCoinDetails";

// Components
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ErrorScreen } from "@/components/ErrorComponents";

const Distribution = () => {
    const { loading, fetching, isError, refetch, getAllCoinDetails } = useCoinDetails();

    const assets = getAllCoinDetails().slice(0, 5);

    if (loading || fetching) {
        return (
            <Card className="shadow-lg p-6 border-border">
                <div className="space-y-4 animate-pulse">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="space-y-2">
                            <div className="flex justify-between">
                                <div className="bg-muted rounded w-24 h-4" />
                                <div className="bg-muted rounded w-12 h-4" />
                            </div>
                            <div className="bg-muted rounded-full h-2" />
                        </div>
                    ))}
                </div>
            </Card>
        );
    }

    if (isError) {
        return (
            <ErrorScreen
                variant="card"
                type="500"
                title={`Couldn't fetch your passphrase details, kindly try again later`}
                onRetry={refetch}
            />
        );
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-4 md:mt-6 xl:mt-8">
            <Card className="shadow-lg border-border">
                <CardHeader className="pb-4">
                    <CardTitle className="font-bold text-base md:text-lg xl:text-xl">
                        Portfolio Distribution
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="space-y-4">
                        {assets.map((asset, index) => (
                            <div key={asset.id}>
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className={`size-6 rounded-full bg-linear-to-br ${asset.fromColor} ${asset.toColor}`} />
                                        <span className="font-semibold text-sm">
                                            {asset.name}
                                        </span>
                                    </div>
                                    <span className="text-muted-foreground text-sm">
                                        {asset.percentage}%
                                    </span>
                                </div>

                                <div className="bg-muted rounded-full h-2 overflow-hidden">
                                    <motion.div
                                        className={`h-full bg-linear-to-r ${asset.fromColor} ${asset.toColor}`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${asset.percentage}%` }}
                                        transition={{
                                            delay: 0.4 + index * 0.1,
                                            duration: 0.8,
                                            ease: "easeOut",
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default Distribution;
