import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';

// Components
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Icons
import { Lock, Key, Fingerprint, Server, Eye, CheckCircle2, Cpu, Database, Layers, Scan } from 'lucide-react';
import { ShieldSecurity, ShieldTick } from 'iconsax-reactjs';


const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
};

export default function Security() {
    const securityFeatures = [
        {
            icon: Server,
            title: "Cold Storage",
            description: "Your private keys never touch the internet. 100% offline storage ensures maximum protection against online threats.",
            highlight: "Air-gapped"
        },
        {
            icon: Lock,
            title: "Military-Grade Encryption",
            description: "AES-256 encryption protects your assets with the same standard used by governments and financial institutions.",
            highlight: "AES-256"
        },
        {
            icon: Key,
            title: "Multi-Signature Support",
            description: "Require multiple approvals for transactions. Perfect for businesses and high-value accounts.",
            highlight: "Multi-Sig"
        },
        {
            icon: Fingerprint,
            title: "Biometric Authentication",
            description: "Secure access with fingerprint or face recognition. Your body is your password.",
            highlight: "Biometric"
        },
        {
            icon: Cpu,
            title: "Secure Element Chip",
            description: "Hardware-level protection with certified secure element technology, resistant to physical tampering.",
            highlight: "CC EAL5+"
        },
        {
            icon: Eye,
            title: "Privacy First",
            description: "No KYC required for basic features. We don't track, store, or sell your personal data.",
            highlight: "Zero-Knowledge"
        }
    ];

    const certifications = [
        { name: "SOC 2 Type II", description: "Audited annually" },
        { name: "ISO 27001", description: "Information security" },
        { name: "GDPR Compliant", description: "Data protection" },
        { name: "PCI DSS", description: "Payment security" }
    ];

    const securityLayers = [
        { icon: Layers, title: "Network Security", items: ["DDoS protection", "SSL/TLS encryption", "Firewall monitoring"] },
        { icon: Database, title: "Data Protection", items: ["Encrypted backups", "Secure key derivation", "Memory protection"] },
        { icon: Scan, title: "Access Control", items: ["2FA authentication", "Session management", "IP whitelisting"] }
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5" />
                <div className="top-20 left-1/4 absolute bg-primary/10 blur-3xl rounded-full w-96 h-96" />
                <div className="right-1/4 bottom-0 absolute bg-accent/10 blur-3xl rounded-full w-80 h-80" />

                <div className="z-10 relative mx-auto px-4 md:px-5 xl:px-6 container">
                    <motion.div className="mx-auto max-w-6xl text-center" initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <Badge variant="outline" className="bg-primary/5 mb-6 px-4 py-2 border-primary/30 text-[11px] md:text-xs xl:text-sm">
                            <ShieldTick className="mr-2 size-4 text-primary" />
                            Bank-Grade Security
                        </Badge>

                        <h1 className="mb-6 font-bold text-foreground text-4xl md:text-5xl xl:text-7xl tracking-tight">
                            Your Assets,
                            <span className="block text-primary">Unbreakable</span>
                        </h1>

                        <p className="mx-auto mb-10 max-w-2xl text-muted-foreground text-base md:text-lg xl:text-xl leading-relaxed">
                            Cold Asset combines military-grade encryption with air-gapped cold storage
                            to provide the most secure cryptocurrency wallet available.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Button size="lg" className="bg-primary hover:bg-primary/90 px-8 py-6 rounded-xl text-primary-foreground text-sm md:text-base xl:text-lg">
                                <ShieldSecurity className="mr-2 size-5" />
                                Get Protected
                            </Button>
                            <Button size="lg" variant="outline" className="hover:bg-muted px-4 md:px-6 xl:px-8 py-6 border-border rounded-xl text-lg">
                                View Audit Reports
                            </Button>
                        </div>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div className="gap-6 grid grid-cols-2 md:grid-cols-4 mt-20" initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
                        {certifications.map((cert, index) => (
                            <div key={index} className="bg-card p-4 md:p-5 xl:p-6 border border-border rounded-2xl text-center">
                                <CheckCircle2 className="mx-auto mb-3 size-6 md:size-7 xl:size-8 text-primary" />
                                <p className="font-semibold text-foreground">{cert.name}</p>
                                <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">{cert.description}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Security Features Grid */}
            <section className="bg-muted/30 py-20">
                <div className="mx-auto px-6 container">
                    <motion.div className="mb-16 text-center" initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        <h2 className="mb-4 font-bold text-foreground text-3xl md:text-4xl xl:text-5xl">
                            Multi-Layer Protection
                        </h2>
                        <p className="mx-auto max-w-2xl text-muted-foreground text-sm md:text-base xl:text-lg">
                            Every layer of Cold Asset is designed with security as the foundation
                        </p>
                    </motion.div>

                    <motion.div className="gap-6 grid md:grid-cols-2 lg:grid-cols-3"
                        variants={staggerContainer} initial="initial"
                        whileInView="animate" viewport={{ once: true }}>
                        {securityFeatures.map((feature, index) => (
                            <motion.div key={index} variants={fadeInUp}>
                                <Card className="group bg-card hover:shadow-primary/5 hover:shadow-xl border-border hover:border-primary/30 h-full transition-all duration-300">
                                    <CardContent className="p-4 md:p-6 xl:p-8">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="flex justify-center items-center bg-primary/10 group-hover:bg-primary/20 rounded-2xl size-10 md:size-12 xl:size-14 transition-colors">
                                                <feature.icon className="size-5 md:size-6 xl:size-7 text-primary" />
                                            </div>
                                            <Badge variant="secondary" className="bg-accent/10 border-0 text-accent">
                                                {feature.highlight}
                                            </Badge>
                                        </div>
                                        <h3 className="mb-3 font-semibold text-foreground text-sm md:text-base xl:text-xl">
                                            {feature.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Security Architecture */}
            <section className="py-24">
                <div className="mx-auto px-6 container">
                    <div className="items-center gap-16 grid lg:grid-cols-2">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }} transition={{ duration: 0.6 }}>
                            <h2 className="mb-6 font-bold text-foreground text-3xl md:text-4xl xl:text-5xl">
                                Defense in Depth
                            </h2>
                            <p className="mb-8 text-muted-foreground text-sm md:text-base xl:text-lg leading-relaxed">
                                Our security architecture implements multiple independent layers of protection.
                                Even if one layer is compromised, your assets remain secure.
                            </p>

                            <div className="space-y-6">
                                {securityLayers.map((layer, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="flex justify-center items-center bg-primary/10 rounded-xl size-10 md:size-12 shrink-0">
                                            <layer.icon className="size-6 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="mb-2 font-semibold text-foreground">{layer.title}</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {layer.items.map((item, i) => (
                                                    <Badge key={i} variant="outline" className="bg-muted/50 border-border">
                                                        {item}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div className="relative" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }} transition={{ duration: 0.6 }}>
                            <div className="relative mx-auto max-w-lg aspect-square">
                                <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20 blur-3xl rounded-full" />
                                <div className="relative flex justify-center items-center w-full h-full">
                                    {/* Animated Security Rings */}
                                    <div className="absolute border-2 border-primary/20 rounded-full w-full h-full animate-pulse" />
                                    <div className="absolute border-2 border-primary/30 rounded-full w-4/5 h-4/5 animate-pulse" style={{ animationDelay: '0.2s' }} />
                                    <div className="absolute border-2 border-primary/40 rounded-full w-3/5 h-3/5 animate-pulse" style={{ animationDelay: '0.4s' }} />
                                    <div className="absolute border-2 border-primary/50 rounded-full w-2/5 h-2/5 animate-pulse" style={{ animationDelay: '0.6s' }} />
                                    <div className="flex justify-center items-center bg-primary shadow-2xl shadow-primary/30 rounded-full size-20 md:size-22 xl:size-24">
                                        <ShieldSecurity className="size-10 md:size-11 xl:size-12 text-primary-foreground" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-linear-to-br from-foreground to-foreground/90 py-20">
                <div className="mx-auto px-4 md:px-5 xl:px-6 text-center container">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <h2 className="mb-6 font-bold text-background text-3xl md:text-4xl xl:text-5xl">
                            Ready to Secure Your Assets?
                        </h2>
                        <p className="mx-auto mb-10 max-w-2xl text-background/70 text-base md:text-lg xl:text-xl">
                            Join over 2 million users who trust Cold Asset to protect their cryptocurrency investments.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/install">
                                <Button size="lg" className="bg-primary hover:bg-primary/90 px-8 py-6 rounded-xl text-primary-foreground text-sm md:text-base xl:text-lg">
                                    Install Cold Asset
                                </Button>
                            </Link>
                            <Link to="/contact">
                                <Button size="lg" variant="outline" className="hover:bg-background/10 px-8 py-6 border-background/30 rounded-xl text-background text-sm md:text-base xl:text-lg">
                                    Talk to Security Team
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}