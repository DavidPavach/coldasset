import { motion } from "framer-motion";

// Components
import { Button } from "@/components/ui/button";

// Icons
import { ArrowRight, Star } from "lucide-react";
import { Apple, Mobile, Chrome, Monitor } from "iconsax-reactjs";

export default function DownloadSection() {
    const platforms = [
        {
            icon: Apple,
            name: "iOS App",
            description: "iPhone & iPad",
            badge: "4.9 ★",
        },
        {
            icon: Mobile,
            name: "Android App",
            description: "Google Play",
            badge: "4.8 ★",
        },
        {
            icon: Monitor,
            name: "Desktop",
            description: "Mac, Windows, Linux",
            badge: "New",
        },
        {
            icon: Chrome,
            name: "Extension",
            description: "Chrome, Firefox, Brave",
            badge: "Popular",
        },
    ];

    return (
        <section className="relative py-20 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="top-1/2 left-1/2 absolute bg-linear-to-r from-primary/10 to-accent/10 blur-[120px] rounded-full w-250 h-125 -translate-x-1/2 -translate-y-1/2" />
            </div>

            <div className="relative mx-auto px-4 md:px-6 xl:px-8 max-w-7xl">
                {/* CTA Card */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="peer-first relative bg-linear-to-br from-card to-background p-8 md:p-12 lg:p-16 border border-border rounded-[2.5rem] overflow-hidden">
                    {/* Decorative Blurs */}
                    <div className="top-0 right-0 absolute bg-primary/10 blur-3xl rounded-full size-64" />
                    <div className="bottom-0 left-0 absolute bg-accent/10 blur-3xl rounded-full size-48" />

                    <div className="relative items-center gap-12 grid lg:grid-cols-2">
                        {/* Left Content */}
                        <div className="lg:text-left text-center">
                            <span className="inline-block bg-primary/10 mb-6 px-4 py-1.5 border border-primary/20 rounded-full font-medium text-[11px] text-primary md:text-xs xl:text-sm">
                                Download Now
                            </span>

                            <h2 className="mb-6 font-bold text-foreground text-3xl md:text-4xl xl:text-5xl leading-tight">
                                Start Securing Your{" "}
                                <span className="bg-clip-text bg-linear-to-r from-primary to-accent text-transparent">
                                    Crypto Today
                                </span>
                            </h2>

                            <p className="mx-auto lg:mx-0 mb-8 max-w-lg text-muted-foreground text-sm md:text-base xl:text-lg">
                                Join over 2 million users who trust Cold Asset with their digital
                                assets. Available on all platforms for seamless access.
                            </p>

                            {/* Ratings */}
                            <div className="flex justify-center lg:justify-start items-center gap-6 mb-10">
                                <div className="flex items-center gap-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="fill-yellow-500 size-5 text-yellow-500" />
                                        ))}
                                    </div>
                                    <span className="font-semibold text-foreground">4.9</span>
                                    <span className="text-muted-foreground">App Store</span>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex sm:flex-row flex-col sm:justify-center lg:justify-start gap-4">
                                <Button size="lg" className="group bg-linear-to-r from-primary to-accent hover:opacity-90 px-8 py-6 rounded-4xl text-primary-foreground">
                                    Download for Free
                                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                                </Button>

                                <Button size="lg" variant="outline" className="hover:bg-muted px-8 py-6 border-border rounded-4xl text-foreground" >
                                    View All Platforms
                                </Button>
                            </div>
                        </div>

                        {/* Platform Cards */}
                        <div className="gap-4 grid grid-cols-2">
                            {platforms.map((platform, index) => (
                                <motion.a key={index} href="/install" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }} className="group relative bg-card p-6 border border-border hover:border-primary/30 rounded-2xl transition-all duration-300">
                                    {/* Badge */}
                                    <span className="top-4 right-4 absolute bg-primary/20 px-2 py-0.5 rounded-full font-medium text-primary text-xs">
                                        {platform.badge}
                                    </span>

                                    <div className="flex justify-center items-center bg-primary/15 mb-4 rounded-2xl size-10 md:size-12 xl:size-14 group-hover:scale-110 transition-transform">
                                        <platform.icon className="size-5 md:size-6 xl:size-7 text-primary" variant="Outline" />
                                    </div>

                                    <h3 className="mb-1 font-semibold text-foreground">
                                        {platform.name}
                                    </h3>
                                    <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                                        {platform.description}
                                    </p>

                                    <ArrowRight className="right-6 bottom-6 absolute opacity-0 group-hover:opacity-100 size-5 text-primary transition-opacity" />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
