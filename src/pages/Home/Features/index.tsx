import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';

// Components
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Icons
import { ArrowLeftRight, PieChart, Bell, Globe, Zap, LineChart, QrCode, Smartphone, Users, Clock, Coins, TrendingUp, CreditCard, Shield, CheckCircle2 } from 'lucide-react';
import { Wallet } from 'iconsax-reactjs';

export default function Features() {
    const mainFeatures = [
        {
            icon: Wallet,
            title: "Multi-Currency Support",
            description: "Store Bitcoin, Ethereum, and 10,000+ tokens in one secure wallet. Full support for all major blockchains.",
            stats: "10,000+ Tokens"
        },
        {
            icon: ArrowLeftRight,
            title: "Instant Swaps",
            description: "Exchange cryptocurrencies directly in-app with competitive rates. No external exchanges needed.",
            stats: "0.1% Fees"
        },
        {
            icon: PieChart,
            title: "Portfolio Analytics",
            description: "Track performance, analyze trends, and get insights on your holdings with advanced analytics.",
            stats: "Real-time Data"
        },
        {
            icon: Bell,
            title: "Smart Alerts",
            description: "Set price alerts, transaction notifications, and security warnings to stay informed 24/7.",
            stats: "Instant Alerts"
        },
        {
            icon: Globe,
            title: "DeFi Integration",
            description: "Connect to DeFi protocols, stake your assets, and earn yield directly from your wallet.",
            stats: "200+ Protocols"
        },
        {
            icon: Zap,
            title: "Lightning Fast",
            description: "Optimized for speed with instant balance updates and rapid transaction broadcasting.",
            stats: "<1s Response"
        }
    ];

    const supportedChains = [
        { name: "Bitcoin", symbol: "BTC", color: "#F7931A", logo: "/coins/bitcoin.svg" },
        { name: "Ethereum", symbol: "ETH", color: "#627EEA", logo: "/coins/ethereum.svg" },
        { name: "Solana", symbol: "SOL", color: "#00FFA3", logo: "/coins/solana.svg" },
        { name: "Polygon", symbol: "MATIC", color: "#8247E5", logo: "/coins/polygon.svg" },
        { name: "Avalanche", symbol: "AVAX", color: "#E84142", logo: "/coins/avalanche.svg" },
        { name: "BNB Chain", symbol: "BNB", color: "#F3BA2F", logo: "/coins/binance coin.svg" },
        { name: "Arbitrum", symbol: "ARB", color: "#28A0F0", logo: "/coins/arbitrum.svg" },
        { name: "Optimism", symbol: "OP", color: "#FF0420", logo: "/coins/optimism.svg" },
    ];

    const advancedFeatures = {
        trading: [
            { icon: LineChart, title: "Live Charts", description: "Professional trading charts with technical indicators" },
            { icon: TrendingUp, title: "Market Analysis", description: "AI-powered market insights and predictions" },
            { icon: Clock, title: "Price History", description: "Complete historical data for all assets" },
            { icon: CreditCard, title: "Fiat On-Ramp", description: "Buy crypto with credit card or bank transfer" }
        ],
        security: [
            { icon: Shield, title: "Cold Storage", description: "Air-gapped security for your private keys" },
            { icon: QrCode, title: "QR Verification", description: "Verify addresses before sending" },
            { icon: Users, title: "Multi-Sig", description: "Require multiple approvals for transactions" },
            { icon: Smartphone, title: "Biometric Lock", description: "Face ID and fingerprint protection" }
        ],
        management: [
            { icon: Wallet, title: "Multiple Wallets", description: "Create unlimited wallets for different purposes" },
            { icon: Coins, title: "NFT Gallery", description: "View and manage your NFT collection" },
            { icon: Globe, title: "dApp Browser", description: "Access decentralized applications" },
            { icon: Bell, title: "Tax Reports", description: "Generate reports for tax purposes" }
        ]
    };

    const comparisonFeatures = [
        { feature: "Cold Storage", coldAsset: true, others: false },
        { feature: "10,000+ Tokens", coldAsset: true, others: true },
        { feature: "Built-in Swaps", coldAsset: true, others: true },
        { feature: "DeFi Integration", coldAsset: true, others: false },
        { feature: "Multi-Signature", coldAsset: true, others: false },
        { feature: "Zero Fees on Transfers", coldAsset: true, others: false },
        { feature: "24/7 Support", coldAsset: true, others: false },
        { feature: "Open Source", coldAsset: true, others: false }
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5" />
                <div className="top-40 right-1/4 absolute bg-primary/10 blur-3xl rounded-full w-96 h-96" />

                <div className="z-10 relative mx-auto px-6 container">
                    <motion.div className="mx-auto max-w-4xl text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <Badge variant="outline" className="bg-primary/5 mb-6 px-4 py-2 border-primary/30 text-[11px] md:text-xs xl:text-sm">
                            <Zap className="mr-2 size-4 text-primary" />
                            Powerful Features
                        </Badge>

                        <h1 className="mb-6 font-bold text-5xl md:text-6xl xl:text-7xl tracking-tight">
                            Everything You Need,
                            <span className="block text-primary">Nothing You Don't</span>
                        </h1>

                        <p className="mx-auto mb-10 max-w-2xl text-muted-foreground text-base md:text-lg xl:text-xl leading-relaxed">
                            A complete cryptocurrency management solution designed for both beginners
                            and power users. Simple interface, powerful capabilities.
                        </p>
                        <Link to='/install'>
                            <Button size="lg" className="bg-primary hover:bg-primary/90 px-4 md:px-6 xl:px-8 py-6 rounded-4xl text-primary-foreground text-sm md:text-base xl:text-lg">
                                <Wallet className="mr-0.5 size-5 md:size-6 xl:size-7" />
                                Get Started Free
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Main Features Grid */}
            <section className="bg-muted/30 py-20">
                <div className="mx-auto px-4 md:px-5 xl:px-6 container">
                    <motion.div className="mb-16 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        <h2 className="mb-4 font-bold text-3xl md:text-4xl xl:text-5xl">
                            Core Features
                        </h2>
                        <p className="mx-auto max-w-2xl text-muted-foreground text-sm md:text-base xl:text-lg">
                            Built for the way you manage crypto
                        </p>
                    </motion.div>

                    <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-3">
                        {mainFeatures.map((feature, index) => (
                            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                                <Card className="group bg-card hover:shadow-primary/5 hover:shadow-xl border-border hover:border-primary/30 h-full overflow-hidden transition-all duration-300">
                                    <CardContent className="relative p-4 md:p-6 xl:p-8">
                                        <div className="top-0 right-0 absolute bg-primary/5 group-hover:bg-primary/10 rounded-full size-32 transition-colors -translate-y-1/2 translate-x-1/2" />

                                        <div className="relative flex justify-between items-start mb-6">
                                            <div className="flex justify-center items-center bg-primary/10 group-hover:bg-primary/20 rounded-2xl size-10 md:size-12 xl:size-14 transition-colors">
                                                <feature.icon className="size-5 md:size-6 xl:size-7 text-primary" />
                                            </div>
                                            <Badge className="bg-accent/10 border-0 text-accent">
                                                {feature.stats}
                                            </Badge>
                                        </div>

                                        <h3 className="relative mb-3 font-semibold text-base md:text-lg xl:text-xl">
                                            {feature.title}
                                        </h3>
                                        <p className="relative text-muted-foreground leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Supported Chains */}
            <section className="py-20">
                <div className="mx-auto px-6 container">
                    <motion.div className="mb-16 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        <h2 className="mb-4 font-bold text-3xl md:text-4xl xl:text-5xl">
                            Supported Blockchains
                        </h2>
                        <p className="mx-auto max-w-2xl text-muted-foreground text-sm md:text-base xl:text-lg">
                            One wallet for all your favorite chains
                        </p>
                    </motion.div>

                    <div className="gap-4 grid grid-cols-2 md:grid-cols-4">
                        {supportedChains.map((chain, index) => (
                            <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}
                                className="group bg-card hover:shadow-lg p-4 md:p-5 xl:p-6 border border-border hover:border-primary/30 rounded-2xl transition-all duration-300 cursor-pointer">
                                <img src={chain.logo} alt={chain.name + " logo"} className='size-8' />
                                <p className="font-semibold">{chain.name}</p>
                                <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">{chain.symbol}</p>
                            </motion.div>
                        ))}
                    </div>

                    <p className="mt-8 text-muted-foreground text-center">
                        And 50+ more blockchains supported
                    </p>
                </div>
            </section>

            {/* Advanced Features Tabs */}
            <section className="bg-muted/30 py-20">
                <div className="mx-auto px-4 md:px-5 xl:px-6 container">
                    <motion.div className="mb-16 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        <h2 className="mb-4 font-bold text-3xl md:text-4xl xl:text-5xl">
                            Advanced Capabilities
                        </h2>
                        <p className="mx-auto max-w-2xl text-muted-foreground text-sm md:text-base xl:text-lg">
                            Power tools for serious crypto users
                        </p>
                    </motion.div>

                    <Tabs defaultValue="trading" className="mx-auto max-w-4xl">
                        <TabsList className="grid grid-cols-3 bg-muted mb-12 p-1 rounded-xl w-full">
                            <TabsTrigger value="trading" className="data-[state=active]:bg-card rounded-lg">
                                Trading
                            </TabsTrigger>
                            <TabsTrigger value="security" className="data-[state=active]:bg-card rounded-lg">
                                Security
                            </TabsTrigger>
                            <TabsTrigger value="management" className="data-[state=active]:bg-card rounded-lg">
                                Management
                            </TabsTrigger>
                        </TabsList>

                        {Object.entries(advancedFeatures).map(([key, features]) => (
                            <TabsContent key={key} value={key}>
                                <div className="gap-6 grid md:grid-cols-2">
                                    {features.map((feature, index) => (
                                        <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                                            className="flex gap-4 bg-card p-4 md:p-5 xl:p-6 border border-border rounded-2xl">
                                            <div className="flex justify-center items-center bg-primary/10 rounded-xl size-12 shrink-0">
                                                <feature.icon className="size-6 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="mb-1 font-semibold">{feature.title}</h4>
                                                <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">{feature.description}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-20">
                <div className="mx-auto px-6 container">
                    <motion.div className="mb-16 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        <h2 className="mb-4 font-bold text-3xl md:text-4xl xl:text-5xl">
                            Why Cold Asset?
                        </h2>
                        <p className="mx-auto max-w-2xl text-muted-foreground text-sm md:text-base xl:text-lg">
                            See how we compare to other wallets
                        </p>
                    </motion.div>

                    <motion.div className="mx-auto max-w-3xl" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <Card className="border-border overflow-hidden">
                            <div className="grid grid-cols-3 bg-muted/50 p-4 md:p-5 xl:p-6 border-border border-b">
                                <div className="font-semibold">Feature</div>
                                <div className="font-semibold text-primary text-center">Cold Asset</div>
                                <div className="font-semibold text-muted-foreground text-center">Others</div>
                            </div>
                            {comparisonFeatures.map((item, index) => (
                                <div key={index} className={`grid grid-cols-3 p-4 md:p-5 xl:p-6 ${index !== comparisonFeatures.length - 1 ? 'border-b border-border' : ''}`}>
                                    <div>{item.feature}</div>
                                    <div className="text-center">
                                        {item.coldAsset ? (
                                            <CheckCircle2 className="mx-auto size-6 text-green-500" />
                                        ) : (
                                            <span className="text-muted-foreground">—</span>
                                        )}
                                    </div>
                                    <div className="text-center">
                                        {item.others ? (
                                            <CheckCircle2 className="mx-auto size-6 text-muted-foreground" />
                                        ) : (
                                            <span className="text-muted-foreground">—</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-linear-to-br from-foreground to-foreground/90 py-20">
                <div className="mx-auto px-4 md:px-5 xl:px-6 text-center container">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <h2 className="mb-6 font-bold text-background text-3xl md:text-4xl xl:text-5xl">
                            Experience the Difference
                        </h2>
                        <p className="mx-auto mb-10 max-w-2xl text-background/70 yetext-xl">
                            Download Cold Asset today and see why millions trust us with their crypto.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/install">
                                <Button size="lg" className="bg-primary hover:bg-primary/90 px-8 py-6 rounded-4xl text-primary-foreground text-sm md:text-base xl:text-lg">
                                    Install Now
                                </Button>
                            </Link>
                            <Link to="/security">
                                <Button size="lg" variant="outline" className="hover:bg-background/10 px-8 py-6 border-background/30 rounded-4xl text-background text-sm md:text-base xl:text-lg">
                                    Learn About Security
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}