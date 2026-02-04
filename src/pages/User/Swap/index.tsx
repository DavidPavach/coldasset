import { useState, useEffect } from 'react';
import { toast } from 'react-fox-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

// Enums and Hooks
import { coinMeta, COINS } from '@/enum';
import { useCoinDetails } from '@/Hooks/useCoinDetails';

// Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Icons
import { ArrowDownUp, ArrowRight, TrendingUp, AlertCircle, Info, Zap, CheckCircle2 } from 'lucide-react';
import { BitcoinConvert } from 'iconsax-reactjs';
import { formatCurrency } from '@/utils/format';


const MINIMUM_BALANCE = 500000;

export default function Index() {

    const [formData, setFormData] = useState({
        fromCoin: '',
        toCoin: '',
        amount: ''
    });

    const { getCoinDetails } = useCoinDetails();
    const [conversionRate, setConversionRate] = useState<number | null>(null);
    const [estimatedReceive, setEstimatedReceive] = useState<number | null>(null);
    const [isCalculating, setIsCalculating] = useState<boolean>(false);
    const [errors, setErrors] = useState({ fromCoin: "", toCoin: "", amount: "" });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Simulate conversion rate calculation
    useEffect(() => {
        if (formData.fromCoin && formData.toCoin && formData.fromCoin !== formData.toCoin) {
            setIsCalculating(true);
            setTimeout(() => {
                const fromCoinDetails = getCoinDetails(formData.fromCoin);
                const toCoinDetails = getCoinDetails(formData.toCoin);

                const fromCoinAmount = fromCoinDetails.price;
                const toCoinAmount = toCoinDetails.price;

                // compute rate: 1 fromCoin = rate toCoin
                const rate = toCoinAmount === 0 ? 0 : fromCoinAmount / toCoinAmount;

                setConversionRate(rate);
                setIsCalculating(false);
            }, 800);
        } else {
            setConversionRate(null);
            setEstimatedReceive(null);
        }
    }, [formData.fromCoin, formData.toCoin]);

    useEffect(() => {
        if (formData.amount && conversionRate) {
            setEstimatedReceive((parseFloat(formData.amount) * conversionRate));
        } else {
            setEstimatedReceive(null);
        }
    }, [formData.amount, conversionRate]);

    // Functions

    const handleInputChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateSwap = () => {

        const newErrors: any = {}

        if (!formData.fromCoin) {
            newErrors.fromCoin = 'Please select a coin to swap from';
        }
        if (!formData.toCoin) {
            newErrors.toCoin = 'Please select a coin to swap to';
        }
        if (formData.fromCoin === formData.toCoin) {
            newErrors.toCoin = 'Cannot swap to the same coin';
        }
        if (!formData.amount || parseFloat(formData.amount) <= 0) {
            newErrors.amount = 'Please enter a valid amount';
        }
        if (formData.amount && parseFloat(formData.amount) < MINIMUM_BALANCE) {
            newErrors.amount = `Minimum swap amount is ${MINIMUM_BALANCE.toLocaleString()}`;
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

    }

    const handleSubmit = async () => {
        validateSwap();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            toast.error("Couldn't process swap now, try again later")
        }, 1000)
    };

    const handleSwapCoins = () => {
        setFormData(prev => ({
            ...prev,
            fromCoin: prev.toCoin,
            toCoin: prev.fromCoin
        }));
    };

    const fromCrypto = coinMeta[formData.fromCoin];
    const toCrypto = coinMeta[formData.toCoin];

    const canSwap = formData.amount && formData.fromCoin && getCoinDetails(formData.fromCoin).userBalance >= MINIMUM_BALANCE;

    return (
        <main className='mx-auto max-w-6xl'>
            <div className='mt-4'>
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8 text-center">
                    <div className="inline-flex justify-center items-center bg-primary mb-4 rounded-2xl size-12 md:size-14 xl:size-16">
                        <BitcoinConvert className="size-6 md:size-7 xl:size-8 text-white" />
                    </div>

                    <h1 className="mb-2 font-bold text-foreground text-2xl md:text-3xl xl:text-4xl">
                        Crypto Swap
                    </h1>

                    <p className="mb-4 text-muted-foreground">
                        Exchange one cryptocurrency for another instantly
                    </p>

                    <Badge className="bg-accent shadow-lg">
                        <Zap className="mr-1 size-3" />
                        Instant Swap
                    </Badge>
                </motion.div>

                {/* Main Form Card */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>

                    <Card className="bg-inherit border-border overflow-hidden">
                        <CardHeader className="border-border border-b">
                            <CardTitle className="text-base md:text-lg xl:text-xl">Swap Details</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 md:p-6 xl:p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* From Coin */}
                                <div className="space-y-2">
                                    <Label htmlFor="fromCoin" className="font-semibold">
                                        From
                                    </Label>
                                    <Select value={formData.fromCoin} onValueChange={(value) => handleInputChange('fromCoin', value)}>
                                        <SelectTrigger className={cn("py-6 md:py-7 xl:py-8 w-full", errors.fromCoin && "border-destructive")}>
                                            <SelectValue placeholder="Select cryptocurrency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {COINS.map((coin) => (
                                                <SelectItem key={`from_${coin}`} value={coin}>
                                                    <div className="flex items-center gap-3 py-1">
                                                        <img src={coinMeta[coin].logo} alt={coinMeta[coin].name + " logo"} className='size-7 md:size-8 xl:size-9' />
                                                        <div className='text-left'>
                                                            <p className="font-semibold">{coinMeta[coin].name}</p>
                                                            <p className="text-muted-foreground text-xs">{coinMeta[coin].symbol}</p>
                                                        </div>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.fromCoin && (
                                        <p className="flex items-center gap-1 text-[11px] text-destructive md:text-xs xl:text-sm">
                                            <AlertCircle className="size-3" />
                                            {errors.fromCoin}
                                        </p>
                                    )}
                                </div>

                                {/* Amount */}
                                <div className="space-y-2">
                                    <Label htmlFor="amount">
                                        Amount
                                    </Label>
                                    <div className="relative">
                                        <Input id="amount" type="number" step="0.00000001" placeholder="0.00" value={formData.amount} onChange={(e) => handleInputChange('amount', e.target.value)} className={cn(
                                            "pr-20 pl-4 h-12 font-semibold montserrat",
                                            errors.amount && "border-destructive focus-visible:ring-destructive"
                                        )}
                                        />
                                        {fromCrypto && (
                                            <div className="top-1/2 right-3 absolute flex items-center gap-2 bg-accent px-3 py-1.5 rounded-lg -translate-y-1/2">
                                                <span className="font-bold text-[11px] md:text-xs xl:text-sm">{fromCrypto.symbol}</span>
                                            </div>
                                        )}
                                    </div>
                                    {errors.amount && (
                                        <p className="flex items-center gap-1 text-[11px] text-destructive md:text-xs xl:text-sm">
                                            <AlertCircle className="size-3" />
                                            {errors.amount}
                                        </p>
                                    )}
                                    {!errors.amount && formData.amount && parseFloat(formData.amount) < MINIMUM_BALANCE && (
                                        <p className="text-muted-foreground text-xs">
                                            Minimum swap amount: {formatCurrency(MINIMUM_BALANCE)} {fromCrypto?.symbol}
                                        </p>
                                    )}
                                </div>

                                {/* Swap Button */}
                                <div className="z-10 relative flex justify-center my-3">
                                    <Button type="button" className='rounded-[50%] size-8 md:size-10 xl:size-12 cursor-pointer' onClick={handleSwapCoins} disabled={!formData.fromCoin || !formData.toCoin}>
                                        <ArrowDownUp className="size-5" />
                                    </Button>
                                </div>

                                {/* To Coin */}
                                <div className="space-y-2">
                                    <Label htmlFor="toCoin" className="font-semibold">
                                        To
                                    </Label>
                                    <Select value={formData.toCoin} onValueChange={(value) => handleInputChange('toCoin', value)}>
                                        <SelectTrigger className={cn("py-6 md:py-7 xl:py-8 w-full", errors.toCoin && "border-destructive")}>
                                            <SelectValue placeholder="Select cryptocurrency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {COINS.map((coin) => (
                                                <SelectItem key={`to_${coin}`} value={coin}>
                                                    <div className="flex items-center gap-3 py-1">
                                                        <img src={coinMeta[coin].logo} alt={coinMeta[coin].name + " logo"} className='size-7 md:size-8 xl:size-9' />
                                                        <div className='text-left'>
                                                            <p className="font-semibold">{coinMeta[coin].name}</p>
                                                            <p className="text-muted-foreground text-xs">{coinMeta[coin].symbol}</p>
                                                        </div>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.toCoin && (
                                        <p className="flex items-center gap-1 text-[11px] text-destructive md:text-xs xl:text-sm">
                                            <AlertCircle className="size-3" />
                                            {errors.toCoin}
                                        </p>
                                    )}
                                </div>

                                {/* Conversion Rate */}
                                <AnimatePresence>
                                    {conversionRate && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                                            className="bg-linear-to-r from-purple-50 dark:from-purple-950/20 to-blue-50 dark:to-blue-950/20 p-4 border border-purple-500/20 rounded-xl">
                                            <div className="flex justify-between items-center mb-3">
                                                <div className="flex items-center gap-2">
                                                    <TrendingUp className="size-4 text-purple-600" />
                                                    <span className="font-semibold text-[11px] text-foreground md:text-xs xl:text-sm">Conversion Rate</span>
                                                </div>
                                                {isCalculating && (
                                                    <div className="border-2 border-purple-500 border-t-transparent rounded-full size-4 animate-spin" />
                                                )}
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-[11px] text-muted-foreground md:text-xs xl:text-sm montserrat">
                                                    1 {fromCrypto?.symbol} =
                                                </span>
                                                <span className="font-bold text-purple-600 text-sm md:text-base xl:text-lg montserrat">
                                                    {conversionRate} {toCrypto?.symbol}
                                                </span>
                                            </div>
                                            {estimatedReceive && (
                                                <div className="mt-3 pt-3 border-purple-500/20 border-t">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">You'll receive</span>
                                                        <span className="font-bold text-foreground text-base md:text-lg xl:text-xl">
                                                            {estimatedReceive} {toCrypto?.symbol}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Minimum Balance Warning */}
                                {formData.fromCoin && !canSwap && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-amber-50/50 dark:bg-amber-950/20 p-4 border border-amber-500/30 rounded-xl">
                                        <div className="flex items-start gap-3">
                                            <AlertCircle className="mt-0.5 size-5 text-amber-600 shrink-0" />
                                            <div className="text-[11px] md:text-xs xl:text-sm">
                                                <p className="mb-1 font-semibold text-amber-800 dark:text-amber-200">
                                                    Minimum Balance Required
                                                </p>
                                                <p className="text-amber-700 dark:text-amber-300">
                                                    You need to have at least <span className="font-bold montserrat">{formatCurrency(MINIMUM_BALANCE)}</span> worth of {fromCrypto.name.toUpperCase()} ({fromCrypto?.symbol}) to perform a swap.
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Can Swap Indicator */}
                                {canSwap && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-emerald-50/50 dark:bg-emerald-950/20 p-4 border border-emerald-500/30 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <CheckCircle2 className="size-5 text-emerald-600" />
                                            <p className="font-semibold text-[11px] text-emerald-800 dark:text-emerald-200 md:text-xs xl:text-sm">
                                                Ready to swap!
                                            </p>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Submit Button */}
                                <Button type="submit" disabled={isSubmitting || !canSwap} className={cn(
                                    "gap-2 w-full h-10 md:h-12 xl:h-14 font-semibold",
                                    "hover:shadow-lg hover:shadow-purple-500/25 transition-all",
                                    "disabled:opacity-50 disabled:cursor-not-allowed"
                                )}>
                                    {isSubmitting ? (
                                        <>
                                            <div className="border-2 border-white border-t-transparent rounded-full size-4 animate-spin" />
                                            Processing Swap...
                                        </>
                                    ) : !canSwap ? (
                                        <>
                                            Insufficient Balance
                                        </>
                                    ) : (
                                        <>
                                            Swap {formData.amount || '0'} {fromCrypto?.symbol} → {toCrypto?.symbol}
                                            <ArrowRight className="size-5" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Info Cards */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="gap-4 grid md:grid-cols-2 mt-6">
                    <Card className="bg-card border-border/50">
                        <CardContent>
                            <div className="flex items-start gap-3">
                                <Info className="mt-0.5 size-5 text-yellow-700 dark:text-yellow-500 shrink-0" />
                                <div className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                                    <p className="mb-1 font-semibold text-foreground">Instant Processing</p>
                                    <p>Swaps are processed instantly with the best available rates from multiple exchanges.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card border-border/50">
                        <CardContent>
                            <div className="flex items-start gap-3">
                                <Zap className="mt-0.5 size-5 text-blue-600 shrink-0" />
                                <div className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                                    <p className="mb-1 font-semibold text-foreground">Best Rates</p>
                                    <p>We aggregate rates from top exchanges to give you the most competitive swap rates.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </main>
    );
}