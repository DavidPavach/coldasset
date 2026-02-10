import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

// Components
import { Button } from "@/components/ui/button";

// Icons
import { RefreshCw, Zap, ArrowRight } from "lucide-react";
import { FingerScan, ShieldTick, Lock, Mobile } from "iconsax-reactjs";

export default function FeaturesSection() {
    const features = [
        {
            icon: ShieldTick,
            title: "Air-Gapped Security",
            description:
                "Your private keys never connect to the internet. Complete isolation from online threats.",
        },
        {
            icon: FingerScan,
            title: "Biometric Authentication",
            description:
                "Advanced fingerprint and facial recognition ensures only you can access your wallet.",
        },
        {
            icon: Lock,
            title: "Multi-Signature Support",
            description:
                "Require multiple approvals for transactions. Perfect for teams and institutions.",
        },
        {
            icon: RefreshCw,
            title: "Seamless Backup & Recovery",
            description:
                "Industry-leading recovery options including encrypted cloud backup and seed phrase.",
        },
        {
            icon: Mobile,
            title: "Cross-Platform",
            description:
                "Access your wallet from any device. iOS, Android, Desktop, and Browser Extension.",
        },
        {
            icon: Zap,
            title: "Instant Transactions",
            description:
                "Send and receive crypto in seconds with our optimized transaction engine.",
        },
    ];

    return (
        <section id="features" className="relative py-24 md:py-28 lg:py-32">
            {/* Background Accent */}
            <div className="absolute inset-0">
                <div className="top-0 left-1/2 absolute bg-primary/5 blur-[100px] rounded-full w-80 sm:w-100 md:w-160 xl:w-200 h-100 -translate-x-1/2" />
            </div>

            <div className="relative mx-auto px-4 md:px-6 xl:px-8 max-w-7xl">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="mx-auto mb-16 lg:mb-20 max-w-3xl text-center">
                    <span className="inline-block bg-primary/10 mb-6 px-4 py-1.5 border border-primary/20 rounded-full font-medium text-[11px] text-primary md:text-xs xl:text-sm">
                        Features
                    </span>

                    <h2 className="mb-6 font-bold text-foreground text-3xl md:text-4xl xl:text-5xl">
                        Security Without{" "}
                        <span className="bg-clip-text bg-linear-to-r from-primary to-accent text-transparent">
                            Compromise
                        </span>
                    </h2>

                    <p className="text-muted-foreground text-sm md:text-base xl:text-lg">
                        Cold Asset combines cutting-edge security technology with an intuitive
                        user experience. Your crypto deserves nothing less than the best
                        protection.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="gap-6 lg:gap-8 grid min-[600px]:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <motion.div key={feature.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group relative">
                            <div className="relative bg-linear-to-br from-card to-background p-8 border border-border hover:border-primary/30 rounded-3xl h-full overflow-hidden transition-all duration-500">
                                {/* Hover Glow */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="top-0 right-0 absolute bg-primary/10 blur-2xl rounded-full size-40" />
                                </div>

                                {/* Icon */}
                                <div className="relative flex justify-center items-center bg-primary/15 mb-6 rounded-2xl size-10 md:size-12 xl:size-14 group-hover:scale-110 transition-transform">
                                    <feature.icon className="size-5 md:size-6 xl:size-7 text-primary" variant="Outline" />
                                </div>

                                {/* Content */}
                                <h3 className="relative mb-3 font-semibold text-foreground text-base md:text-lg xl:text-xl">
                                    {feature.title}
                                </h3>

                                <p className="relative text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Learn More */}
                                <Link to="/features" className="relative flex items-center opacity-0 group-hover:opacity-100 mt-6 font-medium text-[11px] text-primary md:text-xs xl:text-sm transition-opacity">
                                    <span>Learn more</span>
                                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 text-center">
                    <Button size="lg"
                        className="bg-linear-to-r from-primary to-accent hover:opacity-90 px-4 md:px-6 xl:px-8 py-6 rounded-4xl text-primary-foreground">
                        Explore All Features
                        <ArrowRight className="ml-2 size-4" />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
