import { motion } from "framer-motion";

// Components
import { Button } from "@/components/ui/button";

// Icons
import { Shield, Lock, Eye, Server, CheckCircle2 } from "lucide-react";

export default function SecuritySection() {
    const securityFeatures = [
        {
            icon: Lock,
            title: "Air-Gapped Cold Storage",
            description:
                "Private keys are stored offline, completely isolated from internet threats",
        },
        {
            icon: Eye,
            title: "Zero Knowledge Architecture",
            description:
                "We never have access to your private keys or recovery phrases",
        },
        {
            icon: Server,
            title: "Secure Element Chip",
            description:
                "Military-grade hardware encryption protects your sensitive data",
        },
    ];

    const certifications = [
        "SOC 2 Type II",
        "ISO 27001",
        "CCSS Level III",
        "PCI DSS",
    ];

    return (
        <section className="relative py-20">
            <div className="mx-auto px-4 md:px-6 xl:px-8 max-w-7xl">
                <div className="items-center gap-16 lg:gap-24 grid lg:grid-cols-2">
                    {/* Left – Visual */}
                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative order-2 lg:order-1">
                        <div className="relative">
                            {/* Glow */}
                            <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20 blur-3xl rounded-3xl" />

                            {/* Card */}
                            <div className="relative bg-linear-to-br from-card to-background p-4 md:p-6 xl:p-8 border border-border rounded-3xl">
                                {/* Shield */}
                                <div className="flex justify-center mb-8">
                                    <div className="relative">
                                        <div className="flex justify-center items-center bg-linear-to-br from-primary/20 to-accent/20 rounded-full size-24 md:size-28 xl:size-32">
                                            <Shield className="size-12 md:size-14 xl:size-16 text-primary" />
                                        </div>

                                        {/* Rings */}
                                        <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-ping" style={{ animationDuration: "2s" }} />
                                        <div className="absolute -inset-4 border border-primary/20 rounded-full animate-ping"
                                            style={{ animationDuration: "3s" }} />
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="mb-8 text-center">
                                    <div className="inline-flex items-center gap-2 bg-green-500/10 mb-4 px-4 py-2 border border-green-500/20 rounded-full">
                                        <div className="bg-green-500 rounded-full size-2 animate-pulse" />
                                        <span className="font-medium text-[11px] text-green-500 md:text-xs xl:text-sm">
                                            All Systems Secure
                                        </span>
                                    </div>

                                    <h3 className="font-bold text-foreground text-lg md:text-xl xl:text-2xl">
                                        Bank-Grade Protection
                                    </h3>
                                </div>

                                {/* Metrics */}
                                <div className="gap-4 grid grid-cols-3">
                                    {[
                                        { value: "256-bit", label: "AES Encryption" },
                                        { value: "24/7", label: "Monitoring" },
                                        { value: "0", label: "Breaches" },
                                    ].map((metric, i) => (
                                        <div key={i} className="p-4 rounded-2xl text-center">
                                            <p className="font-bold text-primary text-base md:text-lg xl:text-xl">
                                                {metric.value}
                                            </p>
                                            <p className="mt-1 text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
                                                {metric.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="-right-4 -bottom-6 absolute bg-card shadow-xl p-4 border border-border rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="size-8 text-green-500" />
                                    <div>
                                        <p className="font-medium text-[11px] text-foreground md:text-xs xl:text-sm">
                                            Independently
                                        </p>
                                        <p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">Audited</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right – Content */}
                    <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 lg:order-2">
                        <span className="inline-block bg-primary/10 mb-6 px-4 py-1.5 border border-primary/20 rounded-full font-medium text-[11px] text-primary md:text-xs xl:text-sm">
                            Security First
                        </span>

                        <h2 className="mb-6 font-bold text-foreground text-3xl md:text-4xl xl:text-5xl leading-tight">
                            Your Crypto,{" "}
                            <span className="bg-clip-text bg-linear-to-r from-primary to-accent text-transparent">
                                Untouchable
                            </span>
                        </h2>

                        <p className="mb-10 text-muted-foreground text-sm md:text-base xl:text-lg">
                            Cold Asset employs the most advanced security measures in the
                            industry. Your assets are protected by the same technology trusted
                            by governments and financial institutions.
                        </p>

                        {/* Feature List */}
                        <div className="space-y-6 mb-10">
                            {securityFeatures.map((feature, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="flex justify-center items-center bg-primary/15 rounded-xl size-10 md:size-12 shrink-0">
                                        <feature.icon className="size-5 md:size-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="mb-1 font-semibold text-foreground">
                                            {feature.title}
                                        </h4>
                                        <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Certifications */}
                        <div className="mb-10">
                            <p className="mb-4 text-muted-foreground text-sm">
                                Certified &amp; Compliant:
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {certifications.map((cert, i) => (
                                    <span key={i} className="bg-card px-4 py-2 border border-border rounded-xl font-medium text-[11px] text-foreground md:text-xs xl:text-sm">
                                        {cert}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <Button  size="lg" className="bg-linear-to-r from-primary to-accent hover:opacity-90 px-8 py-6 rounded-4xl text-primary-foreground">
                            Learn About Our Security
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
