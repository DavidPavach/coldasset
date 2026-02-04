import { Route } from "@/routes/_user/settings";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';

// Components
import { Card, CardContent } from "@/components/ui/card";

// Icons
import { ChevronRight } from 'lucide-react';
import { Setting2, UserTag, Coin1 } from "iconsax-reactjs";

const SETTINGS_OPTIONS = [
    {
        id: 'profile',
        title: 'Profile Settings',
        description: 'Manage your account information and preferences',
        icon: UserTag,
        color: 'from-blue-500 to-indigo-500',
        href: 'ProfileSettings'
    },
    {
        id: 'crypto',
        title: 'Manage Crypto',
        description: 'Configure your cryptocurrency wallets and assets',
        icon: Coin1,
        color: 'from-purple-500 to-pink-500',
        href: 'ManageCrypto'
    }
];

export default function Selection() {

    const navigate = useNavigate({ from: Route.fullPath });

    // Functions
    const setPage = (page: string) => {
        navigate({
            search: (prev) => ({
                ...prev,
                page
            })
        })
    }

    return (
        <main>
            <div className="relative mx-auto mt-10 max-w-6xl">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12 text-center">
                    <div className="inline-flex justify-center items-center bg-primary mb-4 rounded-2xl size-12 md:size-14 xl:size-16">
                        <Setting2 variant="Bold" className="size-6 md:size-7 xl:size-8 text-primary-foreground animate-spin" />
                    </div>

                    <h1 className="mb-2 font-bold text-foreground text-2xl md:text-3xl xl:text-4xl">
                        Settings
                    </h1>

                    <p className="text-muted-foreground">
                        Manage your account and preferences
                    </p>
                </motion.div>

                {/* Settings Options */}
                <div className="gap-6 grid md:grid-cols-2">
                    {SETTINGS_OPTIONS.map((option, index) => {
                        const Icon = option.icon;

                        return (
                            <motion.div key={option.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 + 0.2 }}>
                                <Card className={cn(
                                    "shadow-lg hover:shadow-xl border-border transition-all duration-300",
                                    "cursor-pointer group overflow-hidden relative")}
                                    onClick={() => setPage(option.id)}>
                                    {/* Gradient Background on Hover */}
                                    <div className={cn(
                                        "absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300",
                                        option.color
                                    )} />

                                    <CardContent className="relative">
                                        <div className="flex items-start gap-4">
                                            {/* Icon */}
                                            <div className={cn(
                                                "flex justify-center items-center bg-linear-to-br rounded-xl size-10 md:size-12 xl:size-14 shrink-0",
                                                "group-hover:scale-110 transition-transform duration-300 shadow-lg",
                                                option.color
                                            )}>
                                                <Icon className="size-5 md:size-6 xl:size-7 text-white" />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="mb-2 font-bold text-foreground group-hover:text-primary text-base md:text-lg xl:text-xl transition-colors">
                                                    {option.title}
                                                </h3>
                                                <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                                                    {option.description}
                                                </p>
                                            </div>

                                            {/* Arrow */}
                                            <ChevronRight className="size-5 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1 shrink-0" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}