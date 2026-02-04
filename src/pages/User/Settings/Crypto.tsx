import { motion } from "framer-motion";

// Enums
import { COINS, coinMeta } from "@/enum";

// Hooks
import { useCoinPreferences } from "@/Hooks/useCoinPreference";

// UI
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Crypto = () => {

    const { coins, toggleCoin } = useCoinPreferences();

    return (
        <motion.main className="mx-auto max-w-6xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Card>
                <CardHeader>
                    <CardTitle>Coin Visibility</CardTitle>
                    <CardDescription>
                        Choose which coins you want to see across the app.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    {COINS.map((coin) => {
                        const meta = coinMeta[coin];

                        return (
                            <div key={coin} className="flex justify-between items-center p-4 border border-border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <img src={meta.logo} alt={`${meta.name} logo`} className="size-6 md:size-7 xl:size-8" />
                                    <span className="font-medium capitalize">
                                        {meta.name}
                                    </span>
                                </div>

                                <Switch checked={coins[coin]} onCheckedChange={() => toggleCoin(coin)} className="cursor-pointer" />
                            </div>
                        );
                    })}
                </CardContent>
            </Card>
        </motion.main>
    );
};

export default Crypto;
