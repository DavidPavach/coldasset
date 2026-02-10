import { motion } from "framer-motion";

// Components
import { Button } from "@/components/ui/button";

// Icons
import { ArrowRight, Shield, Download } from "lucide-react";
import { BitcoinConvert, DirectDown, Mobile, Send2, ShieldSecurity, WalletMoney } from "iconsax-reactjs";

const MENU = [
    { icon: <Send2 className="size-5" />, title: "Send" },
    { icon: <DirectDown className="size-5" />, title: "Receive" },
    { icon: <BitcoinConvert className="size-5" />, title: "Swap" },
    { icon: <WalletMoney className="size-5" />, title: "Buy" },
]

// Time
const now = new Date();
let hours = now.getHours();
const minutes = now.getMinutes();
const ampm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12;
hours = hours ? hours : 12;
const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;


export default function HeroSection() {

    return (
        <section className="relative flex justify-center items-center pb-10 min-h-dvh overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="top-1/4 left-1/4 absolute bg-primary/10 blur-[120px] rounded-full size-150 animate-pulse" />
                <div className="right-1/4 bottom-1/4 absolute bg-accent/10 blur-[100px] rounded-full size-125 animate-pulse" style={{ animationDelay: "1s" }} />
                <div className="top-1/2 left-1/2 absolute bg-[radial-gradient(circle,var(--color-primary)_0%,transparent_65%)] opacity-5 rounded-full -translate-y-1/2 h-200-translate-x-1/2" />
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(color-mix(in_srgb,var(--color-primary)_3%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--color-primary)_3%,transparent)_1px,transparent_1px)] bg-size-[60px_60px]" />


            <div className="relative mx-auto px-4 md:px-6 xl:px-8 py-20 max-w-7xl">
                <div className="items-center gap-12 lg:gap-20 grid lg:grid-cols-2">
                    {/* Content */}
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="lg:text-left text-center">
                        {/* Badge */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 bg-primary/10 mb-8 px-4 py-2 border border-primary/20 rounded-full">
                            <span className="bg-primary rounded-full size-2 animate-pulse" />
                            <span className="font-medium text-[11px] text-primary md:text-xs xl:text-sm">
                                Secure Cold Storage Wallet
                            </span>
                        </motion.div>

                        <h1 className="mb-6 font-bold text-foreground text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1]">
                            Your Assets,{" "}
                            <span className="bg-clip-text bg-linear-to-r from-primary to-accent text-transparent">
                                Ice Cold
                            </span>{" "}
                            Secure
                        </h1>

                        <p className="mx-auto lg:mx-0 mb-10 max-w-xl text-muted-foreground text-base md:text-lg xl:text-xl leading-relaxed">
                            Experience institutional-grade security with the most advanced cold
                            storage wallet. Protect your crypto with military-grade encryption.
                        </p>

                        {/* CTA */}
                        <div className="flex sm:flex-row flex-col sm:justify-center lg:justify-start gap-4 mb-12">
                            <Button size="lg" className="group bg-linear-to-r from-primary to-accent hover:opacity-90 px-4 md:px-6 xl:px-8 py-6 rounded-4xl text-primary-foreground">
                                <Download className="mr-2 size-5" />
                                Download App
                                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                            </Button>

                            <Button size="lg" variant="outline" className="hover:bg-muted px-4 md:px-6 xl:px-8 py-6 border-border rounded-4xl text-foreground">
                                Explore Products
                            </Button>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap justify-center lg:justify-start items-center gap-8">
                            {[
                                { icon: ShieldSecurity, label: "Military-Grade", sub: "Encryption" },
                                { icon: Mobile, label: "Multi-Platform", sub: "Support" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="flex justify-center items-center bg-muted rounded-xl size-8 md:size-10 xl:size-12">
                                        <item.icon className="size-4 md:size-5 xl:size-6 text-primary" variant="Outline" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-[11px] text-foreground md:text-xs xl:text-sm">
                                            {item.label}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
                                            {item.sub}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Device Mockup */}
                    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative">
                        <div className="z-10 relative">
                            {/* Glow */}
                            <div className="absolute inset-0 bg-linear-to-br from-primary/30 to-accent/30 blur-3xl rounded-[3rem]" />

                            {/* Phone */}
                            <div className="relative bg-card shadow-xl p-4 border border-border rounded-[3rem]">
                                <div className="bg-background rounded-[2.5rem] overflow-hidden">
                                    {/* Status Bar */}
                                    <div className="flex justify-between items-center bg-card px-4 md:px-5 xl:px-6 py-3">
                                        <span className="text-muted-foreground text-xs montserrat">{formattedTime}</span>
                                        <div className="bg-primary rounded-sm w-4 h-2" />
                                    </div>

                                    {/* App */}
                                    <div className="px-4 md:px-5 xl:px-6 py-8">
                                        <div className="mb-8 text-center">
                                            <p className="mb-2 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                                                Total Balance
                                            </p>
                                            <p className="font-bold text-foreground text-2xl md:text-3xl xl:text-4xl montserrat">
                                                $127,842.50
                                            </p>
                                            <p className="mt-2 text-[11px] text-accent md:text-xs xl:text-sm">
                                                +12.4% this week
                                            </p>
                                        </div>

                                        {/* Quick Actions */}
                                        <div className="gap-4 grid grid-cols-4 mb-8">
                                            {MENU.map((a) => (
                                                <div key={a.title} className="text-center">
                                                    <div className="flex justify-center items-center bg-muted mx-auto mb-2 border border-border rounded-2xl w-12 h-12">
                                                        {a.icon}
                                                    </div>
                                                    <span className="text-muted-foreground text-xs">
                                                        {a.title}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Assets */}
                                        <div className="space-y-4">
                                            {[
                                                { name: "Bitcoin", symbol: "BTC", amount: "2.4521", value: "$98,084.00", change: "+5.2%", logo: "/coins/bitcoin.svg" },
                                                { name: "Ethereum", symbol: "ETH", amount: "12.842", value: "$24,519.80", change: "+3.8%", logo: "/coins/ethereum.svg" },
                                                { name: "Solana", symbol: "SOL", amount: "156.23", value: "$5,238.70", change: "+8.1%", logo: "/coins/solana.svg" },
                                            ].map((asset) => (
                                                <div key={asset.symbol} className="flex justify-between items-center bg-muted/50 p-4 border border-border rounded-2xl">
                                                    <div className="flex gap-x-1">
                                                        <img src={asset.logo} alt={asset.symbol + " logo"} className="size-7 md:size-8 xl:size-9" />
                                                        <div>
                                                            <p className="font-medium text-[11px] text-foreground md:text-xs xl:text-sm">
                                                                {asset.name}
                                                            </p>
                                                            <p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs montserrat">
                                                                {asset.amount} {asset.symbol}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-medium text-[11px] text-foreground md:text-xs xl:text-sm montserrat">
                                                            {asset.value}
                                                        </p>
                                                        <p className="text-[10px] text-accent md:text-[11px] xl:text-xs">
                                                            {asset.change}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Card */}
                        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="-top-12 -right-4 absolute bg-card shadow-xl p-4 border border-border rounded-2xl">
                            <div className="flex items-center gap-3">
                                <div className="flex justify-center items-center bg-accent/20 rounded-xl size-8 md:size-9 xl:size-10">
                                    <Shield className="size-4 md:size-4.5 xl:size-5 text-accent" />
                                </div>
                                <div>
                                    <p className="font-medium text-[11px] text-foreground md:text-xs xl:text-sm">Secured</p>
                                    <p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">256-bit AES</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
