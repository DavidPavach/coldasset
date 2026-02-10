import { motion } from "framer-motion";

export default function AssetsSection() {
    const cryptoAssets = [
        { name: "Bitcoin", symbol: "BTC", logo: "/coins/bitcoin.svg" },
        { name: "Ethereum", symbol: "ETH", logo: "/coins/ethereum.svg" },
        { name: "Solana", symbol: "SOL", logo: "/coins/solana.svg" },
        { name: "XRP", symbol: "XRP", logo: "/coins/xrp.svg" },
        { name: "Cardano", symbol: "ADA", logo: "/coins/cardano.svg" },
        { name: "Dogecoin", symbol: "DOGE", logo: "/coins/dogecoin.svg" },
        { name: "Polygon", symbol: "MATIC", logo: "/coins/polygon.svg" },
        { name: "Chainlink", symbol: "LINK", logo: "/coins/chainlink.svg" },
        { name: "Polkadot", symbol: "DOT", logo: "/coins/polkadot.svg" },
        { name: "Litecoin", symbol: "LTC", logo: "/coins/litecoin.svg" },
        { name: "Avalanche", symbol: "AVAX", logo: "/coins/avalanche.svg" },
        { name: "Uniswap", symbol: "UNI", logo: "/coins/uniswap.svg" },
    ];

    return (
        <section className="relative bg-background py-24 overflow-hidden">
            {/* Background Accents */}
            <div className="absolute inset-0">
                <div className="bottom-0 left-0 absolute bg-primary/5 blur-[100px] rounded-full w-150 h-75" />
                <div className="top-0 right-0 absolute bg-accent/5 blur-[80px] rounded-full w-100 h-50" />
            </div>

            <div className="relative mx-auto px-4 md:px-6 xl:px-8 max-w-7xl">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="mx-auto mb-16 max-w-3xl text-center">
                    <span className="inline-block bg-primary/10 mb-6 px-4 py-1.5 border border-primary/20 rounded-full font-medium text-[11px] text-primary md:text-xs xl:text-sm">
                        Multi-Chain Support
                    </span>

                    <h2 className="mb-6 font-bold text-foreground text-3xl md:text-4xl xl:text-5xl">
                        One Wallet,{" "}
                        <span className="bg-clip-text bg-linear-to-r from-primary to-accent text-transparent">
                            500+ Assets
                        </span>
                    </h2>

                    <p className="text-muted-foreground text-sm md:text-base xl:text-lg">
                        From Bitcoin to the latest altcoins, Cold Asset supports all major
                        cryptocurrencies and thousands of tokens across multiple blockchains.
                    </p>
                </motion.div>

                {/* Row 1 */}
                <div className="relative mb-6">
                    <div className="flex gap-6 animate-scroll">
                        {[...cryptoAssets, ...cryptoAssets].map((asset, index) => (
                            <div key={`row1-${index}`}
                                className="group flex items-center gap-4 bg-card px-4 md:px-5 xl:px-6 py-4 border border-border hover:border-primary/30 rounded-2xl transition-all shrink-0">
                                <img src={asset.logo} alt={asset.name + " logo"} className="size-8 md:size-9 xl:size-10" />

                                <div>
                                    <p className="font-semibold text-foreground">
                                        {asset.name}
                                    </p>
                                    <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                                        {asset.symbol}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Row 2 */}
                <div className="relative">
                    <div className="flex gap-6 animate-scroll-reverse">
                        {[...cryptoAssets.slice().reverse(), ...cryptoAssets.slice().reverse()].map(
                            (asset, index) => (
                                <div key={`row2-${index}`} className="group flex items-center gap-4 bg-card px-4 md:px-5 xl:px-6 py-4 border border-border hover:border-primary/30 rounded-2xl transition-all shrink-0">
                                    <img src={asset.logo} alt={asset.name + " logo"} className="size-8 md:size-9 xl:size-10" />

                                    <div>
                                        <p className="font-semibold text-foreground">
                                            {asset.name}
                                        </p>
                                        <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                                            {asset.symbol}
                                        </p>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* Animations */}
            <style>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes scroll-reverse {
                    0% { transform: translateX(-50%); }
                100% { transform: translateX(0); }
                }
                .animate-scroll {
                    animation: scroll 30s linear infinite;
                }
                .animate-scroll-reverse {
                    animation: scroll-reverse 30s linear infinite;
                }
      `}</style>
        </section>
    );
}
