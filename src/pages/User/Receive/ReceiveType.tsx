import { useState } from 'react';
import { Route } from '@/routes/_user/receive';
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';

// Components
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Icons
import { ArrowRight, Users, Building2, Zap, Shield, Sparkles, Check, Download, QrCode, Info } from 'lucide-react';
import { DirectboxReceive } from 'iconsax-reactjs';

const TRANSFER_RECEIVE_OPTIONS = [
    {
        id: 'internal',
        title: 'From Cold Asset User',
        subtitle: 'Receive from another Cold Asset account',
        description: 'Fast and Instant, secure incoming transfers from other Cold Asset users',
        icon: Users,
        gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
        features: [
            { icon: Zap, text: 'Instant credit', highlight: true },
            { icon: Shield, text: 'Auto-verified within network' },
            { icon: Check, text: 'No fees' }
        ],
        badge: 'Recommended',
        badgeColor: 'bg-emerald-500 text-white',
        accentColor: 'from-emerald-400 to-teal-500'
    },
    {
        id: 'external',
        title: 'From External Wallet',
        subtitle: 'Receive from any blockchain address',
        description: 'Provide an on-chain address or QR to accept deposits from external wallets',
        icon: Building2,
        gradient: 'from-blue-500 via-indigo-500 to-purple-500',
        features: [
            { icon: Download, text: 'Supports multiple blockchains' },
            { icon: QrCode, text: 'Generate address & QR' },
            { icon: Info, text: 'Network fees paid by sender' }
        ],
        badge: 'Standard',
        badgeColor: 'bg-blue-500 text-white',
        accentColor: 'from-blue-400 to-indigo-500'
    }
];

export default function ReceiveType() {

    const navigate = Route.useNavigate();
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleSelect = (optionId: string) => {
        setSelectedOption(optionId);

        setTimeout(() => {
            navigate({
                search: (prev) => ({ ...prev, type: optionId }),
            });
        }, 300);
    };

    return (
        <main>
            <div className="relative mx-auto mt-10 max-w-6xl">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-10 text-center">
                    <div className="inline-flex justify-center items-center bg-primary/10 mb-6 rounded-3xl size-14 md:size-16 xl:size-18">
                        <DirectboxReceive className="size-7 md:size-8 xl:size-9 text-primary" />
                    </div>

                    <h1 className="mb-2 font-bold text-foreground text-2xl md:text-3xl xl:text-4xl tracking-tight">
                        Choose how to Receive Assets
                    </h1>

                    <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
                        Select how you'd like to receive your assets securely
                    </p>
                </motion.div>

                {/* Transfer Options */}
                <div className="gap-8 grid md:grid-cols-2 mx-auto mb-12 max-w-6xl">
                    {TRANSFER_RECEIVE_OPTIONS.map((option, index) => {

                        const Icon = option.icon;
                        const isSelected = selectedOption === option.id;

                        return (
                            <motion.div
                                key={option.id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.15, duration: 0.6 }}
                                className="group relative">

                                <Card className={cn("relative p-0 border-2 h-full overflow-hidden transition-all duration-500 cursor-pointer",
                                    "hover:shadow-lg hover:scale-[1.01]",
                                    isSelected ? "border-primary shadow-lg shadow-primary/10 scale-[1.01]" : "border-border/50 hover:border-primary/40"
                                )} onClick={() => handleSelect(option.id)}>
                                    {/* Subtle hover gradient */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div
                                            className={cn(
                                                "absolute inset-0 bg-linear-to-br opacity-[0.03]",
                                                option.gradient
                                            )}
                                        />
                                    </div>

                                    <div className="relative p-4 md:p-5 xl:p-6">
                                        {/* Badge */}
                                        <div className="flex justify-between items-start mb-6">
                                            <Badge
                                                className={cn(
                                                    "shadow-sm px-3 py-1 font-semibold text-xs",
                                                    option.badgeColor
                                                )}>
                                                {option.badge}
                                            </Badge>

                                            {option.id === 'internal' && (
                                                <motion.div
                                                    animate={{ rotate: [0, 5, -5, 0] }}
                                                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
                                                    <Sparkles className="size-6 text-emerald-500" />
                                                </motion.div>
                                            )}
                                        </div>

                                        {/* Icon */}
                                        <div className="mb-6">
                                            <div
                                                className={cn(
                                                    "inline-flex justify-center items-center rounded-2xl size-12 md:size-14 xl:size-16",
                                                    "bg-linear-to-br shadow-md transition-transform duration-500",
                                                    "group-hover:scale-105",
                                                    option.gradient
                                                )}>
                                                <Icon className="size-6 md:size-7 xl:size-8 text-white" />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="mb-8">
                                            <h3 className="mb-2 font-bold text-foreground text-lg md:text-xl xl:text-2xl">
                                                {option.title}
                                            </h3>
                                            <p className="mb-3 text-muted-foreground text-xs">
                                                {option.subtitle}
                                            </p>
                                            <p className="text-foreground/80">
                                                {option.description}
                                            </p>
                                        </div>

                                        {/* Features */}
                                        <div className="space-y-4 mb-8">
                                            {option.features.map((feature, idx) => {
                                                const FeatureIcon = feature.icon;
                                                return (
                                                    <motion.div
                                                        key={idx}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.3 + index * 0.15 + idx * 0.1 }}
                                                        className="flex items-center gap-3">
                                                        <div
                                                            className={cn(
                                                                "flex justify-center items-center rounded-lg size-8",
                                                                feature.highlight
                                                                    ? `bg-linear-to-br ${option.gradient} text-white shadow-sm`
                                                                    : "bg-accent text-muted"
                                                            )}>
                                                            <FeatureIcon className="size-4" />
                                                        </div>
                                                        <span
                                                            className={cn(
                                                                "text-xs",
                                                                feature.highlight
                                                                    ? "font-semibold text-foreground"
                                                                    : "text-muted-foreground"
                                                            )}>
                                                            {feature.text}
                                                        </span>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>

                                        {/* CTA */}
                                        <Button
                                            className={cn(
                                                "group/btn gap-2 w-full h-8 md:h-10 xl:h-12 font-semibold",
                                                "bg-linear-to-r text-white shadow-md",
                                                "hover:shadow-lg transition-all duration-300",
                                                option.accentColor
                                            )}>
                                            <span>Select {option.title}</span>
                                            <ArrowRight className="size-5 transition-transform group-hover/btn:translate-x-1" />
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
            {/* Info Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mx-auto max-w-6xl">
                <Card className="bg-accent/30 backdrop-blur-sm p-0 border-border/50">
                    <div className="p-4 md:p-6 xl:p-8">
                        <div className="flex items-start gap-4">
                            <div className="flex justify-center items-center bg-primary/10 rounded-xl size-10 shrink-0">
                                <Shield className="size-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="mb-2 font-semibold text-foreground">
                                    Secure & Protected
                                </h4>
                                <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-relaxed">
                                    All transfers are protected with enterprise-grade encryption and multi-signature verification.
                                    Your assets remain secure throughout the entire transaction process.
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </main>
    );
}
