import { motion } from "framer-motion";

// Icons
import { Coin1, Global, Profile2User, ShieldSecurity } from "iconsax-reactjs";

export default function StatsSection() {
    const stats = [
        {
            icon: Profile2User,
            value: "2M+",
            label: "Active Users",
            description: "Trust us worldwide",
        },
        {
            icon: ShieldSecurity,
            value: "$12B+",
            label: "Assets Secured",
            description: "In cold storage",
        },
        {
            icon: Coin1,
            value: "500+",
            label: "Cryptocurrencies",
            description: "Supported assets",
        },
        {
            icon: Global,
            value: "150+",
            label: "Countries",
            description: "Global coverage",
        },
    ];

    return (
        <section className="relative py-20 border-border border-y">
            <div className="mx-auto px-4 md:px-6 xl:px-8 max-w-7xl">
                <div className="gap-8 grid grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <motion.div key={stat.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group text-center">
                            <div className="flex justify-center items-center bg-linear-to-br from-muted to-card mx-auto mb-4 border border-border group-hover:border-primary/30 rounded-2xl size-12 md:size-14 xl:size-16 group-hover:scale-105 transition-all">
                                <stat.icon className="size-6 md:size-7 xl:size-8 text-primary" />
                            </div>

                            <div className="mb-1 font-bold text-foreground text-2xl md:text-3xl xl:text-4xl">
                                {stat.value}
                            </div>

                            <div className="mb-1 font-medium text-foreground">
                                {stat.label}
                            </div>

                            <div className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                                {stat.description}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
