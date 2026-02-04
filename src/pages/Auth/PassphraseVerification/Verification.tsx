import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';

// Stores and Hooks
import { userPassphraseFlow } from "@/stores/passPhraseFlow";
import { useUserDetails } from '@/services/queries.service';

// Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import PassphraseLoader from '../Passphrase/Loader';
import { ErrorScreen } from '@/components/ErrorComponents';

// Icons
import { ArrowRight, ArrowLeft, ShieldCheck, Info, RefreshCw } from 'lucide-react';
import VerificationInput from './VerificationInput';
import StepIndicator from '../Passphrase/StepIndicator';

export default function PassphraseVerification() {

    const { data, isLoading, isFetching, isError, refetch } = useUserDetails();

    const [inputs, setInputs] = useState(Array(12).fill(''));
    const [allCorrect, setAllCorrect] = useState(false);
    const { setEmail } = userPassphraseFlow();

    const loading = isLoading || isFetching;

    const passphrases = (data && data.data && data.data.passPhrase) || [];

    // Hook
    useEffect(() => {
        if (!passphrases || passphrases.length === 0) {
            setAllCorrect(false);
            return;
        }

        if (data && data.data) {
            setEmail(data.data.email);
        }

        const correct = inputs.every((input, index) =>
            String(input).toLowerCase().trim() === String(passphrases[index]).toLowerCase()
        );
        setAllCorrect(correct);
    }, [inputs, passphrases]);

    // Render paths (returns) after all hooks
    if (loading) {
        return <PassphraseLoader />;
    }

    if (isError) {
        return (
            <ErrorScreen
                variant="fullscreen"
                type="500"
                title={`Couldn't fetch your passphrase details, kindly try again later`}
                onRetry={refetch}
            />
        );
    }

    // Functions
    const handleInputChange = (index: number, value: string) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
    };

    const handleClear = () => {
        setInputs(Array(12).fill(''));
    };

    const correctCount = inputs.filter((input, index) =>
        input.toLowerCase().trim() === passphrases[index]?.toLowerCase()
    ).length;

    return (
        <div>
            <div className="mx-auto px-4 py-8 md:py-12 max-w-2xl">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
                    <div className="inline-flex justify-center items-center bg-primary/10 mb-4 rounded-2xl size-12 md:size-14 xl:size-16">
                        <ShieldCheck className="size-6 md:size-7 xl:size-8 text-primary" />
                    </div>
                    <h1 className="mb-2 font-bold text-foreground text-xl md:text-2xl xl:text-3xl">
                        Verify Your Phrase
                    </h1>
                    <p className="text-muted-foreground">
                        Enter each word in the correct order to confirm you've saved it
                    </p>
                </motion.div>

                {/* Step Indicator */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-8">
                    <StepIndicator currentStep={2} />
                </motion.div>

                {/* Info Alert */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <Alert className="bg-primary/5 mb-6 border-primary/30">
                        <Info className="size-4 text-primary" />
                        <AlertDescription className="text-foreground/80">
                            Enter each of your 12 recovery words in the exact order they were shown.
                            This ensures you've correctly saved your backup.
                        </AlertDescription>
                    </Alert>
                </motion.div>

                {/* Progress Indicator */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-muted-foreground">Progress</span>
                        <span className={cn(
                            "font-semibold",
                            allCorrect ? "text-green-600" : "text-foreground"
                        )}>
                            {correctCount} / 12 correct
                        </span>
                    </div>
                    <div className="bg-muted rounded-full h-2 overflow-hidden">
                        <motion.div
                            className={cn(
                                "rounded-full h-full transition-colors duration-300",
                                allCorrect ? "bg-green-500" : "bg-primary"
                            )}
                            initial={{ width: 0 }}
                            animate={{ width: `${(correctCount / 12) * 100}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </motion.div>

                {/* Verification Card */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <Card className="shadow-lg border-border">
                        <CardHeader className="pb-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle className="text-sm md:text-base xl:text-lg">Enter Your Words</CardTitle>
                                    <CardDescription className='mt-1 text-[11px] md:text-xs xl:text-sm'>Type each word carefully</CardDescription>
                                </div>
                                <Button variant="ghost" size="sm" onClick={handleClear} className="text-muted-foreground hover:text-foreground">
                                    <RefreshCw className="mr-2 size-4" />
                                    Clear All
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="gap-3 grid grid-cols-2 md:grid-cols-3">
                                {Array.from({ length: 12 }).map((_, index) => (
                                    <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + index * 0.03 }}>
                                        <VerificationInput
                                            index={index + 1}
                                            correctWord={passphrases[index] || ''}
                                            value={inputs[index]}
                                            onChange={(value) => handleInputChange(index, value)}
                                        />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Success Message */}
                            {allCorrect && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                    className="bg-green-50 dark:bg-green-950/30 mt-6 p-4 border border-green-200 dark:border-green-800 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="flex justify-center items-center bg-green-500 rounded-full size-10">
                                            <ShieldCheck className="size-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-green-800 dark:text-green-200">
                                                Perfect! All words verified
                                            </p>
                                            <p className="text-green-700 dark:text-green-300 text-sm">
                                                You can now proceed to set your passcode
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Navigation Buttons */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex sm:flex-row flex-col gap-3 mt-8">
                    <Link to="/passphrase" className="sm:flex-1">
                        <Button variant="outline" className="w-full h-12">
                            <ArrowLeft className="mr-2 size-5" />
                            Back
                        </Button>
                    </Link>
                    <Link to={allCorrect ? "/passcode" : '/passphrase-verification'} className="sm:flex-2" onClick={(e) => !allCorrect && e.preventDefault()}>
                        <Button className={cn("w-full font-semibold transition-all duration-300", allCorrect
                            ? "shadow-lg shadow-primary/25 hover:shadow-primary/40"
                            : "opacity-50 cursor-not-allowed"
                        )} disabled={!allCorrect}>
                            Continue to Passcode
                            <ArrowRight className="ml-2 size-5" />
                        </Button>
                    </Link>
                </motion.div>

                <p className="mt-3 text-muted-foreground text-xs text-center">
                    {!allCorrect
                        ? `Enter all ${12 - correctCount} remaining words correctly to continue`
                        : 'Ready to set up your secure passcode'
                    }
                </p>
            </div>
        </div>
    );
}