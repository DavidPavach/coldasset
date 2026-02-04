import { useState, useEffect } from 'react';
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import { toast } from 'react-fox-toast';

// Stores and Hooks
import { userPassphraseFlow } from "@/stores/passPhraseFlow";
import { usePatchUser } from '@/services/mutations.service';

// Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import NumericKeypad from './NumericKeypad';
import PasscodeDisplay from './PasscodeDisplay';
import StepIndicator from '../Passphrase/StepIndicator';

// Icons
import { Lock } from 'iconsax-reactjs';
import { ArrowLeft, CheckCircle, Info, Fingerprint } from 'lucide-react';

const PASSCODE_LENGTH = 6;

export default function PasscodeEntry() {

    const [passcode, setPasscode] = useState('');
    const [confirmPasscode, setConfirmPasscode] = useState('');
    const [stage, setStage] = useState('create');
    const [error, setError] = useState('');
    const [shake, setShake] = useState<boolean>(false);
    const { email } = userPassphraseFlow()

    const handleKeyPress = (key: string) => {
        setError('');
        if (stage === 'create') {
            if (passcode.length < PASSCODE_LENGTH) {
                setPasscode(prev => prev + key);
            }
        } else if (stage === 'confirm') {
            if (confirmPasscode.length < PASSCODE_LENGTH) {
                setConfirmPasscode(prev => prev + key);
            }
        }
    };

    const handleDelete = () => {
        setError('');
        if (stage === 'create') {
            setPasscode(prev => prev.slice(0, -1));
        } else if (stage === 'confirm') {
            setConfirmPasscode(prev => prev.slice(0, -1));
        }
    };

    const handleClear = () => {
        setError('');
        if (stage === 'create') {
            setPasscode('');
        } else if (stage === 'confirm') {
            setConfirmPasscode('');
        }
    };

    // Update Function
    const patchUser = usePatchUser();
    const updateUser = () => {
        patchUser.mutate({ email: email, passcode: passcode }, {
            onSuccess: () => {
                toast.success("Your passcode was updated successfully!");
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Failed to update passcode, try again later.";
                toast.error(message);
            },
        });
    }

    // Auto-advance when passcode is complete
    useEffect(() => {
        if (stage === 'create' && passcode.length === PASSCODE_LENGTH) {
            const timer = setTimeout(() => {
                setStage('confirm');
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [passcode, stage]);

    // Auto-verify when confirm passcode is complete
    useEffect(() => {
        if (stage === 'confirm' && confirmPasscode.length === PASSCODE_LENGTH) {
            const timer = setTimeout(() => {
                if (confirmPasscode === passcode) {
                    updateUser()
                    setStage('success');
                } else {
                    setError('Passcodes do not match. Please try again.');
                    setShake(true);
                    setTimeout(() => {
                        setShake(false);
                        setConfirmPasscode('');
                    }, 500);
                }
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [confirmPasscode, passcode, stage]);

    const currentPasscode = stage === 'create' ? passcode : confirmPasscode;

    if (stage === 'success') {
        return (
            <div className="flex justify-center items-center min-h-dvh">
                <div className="mx-auto px-4 py-8 max-w-md text-center">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.6 }} className="mb-6">
                        <div className="inline-flex justify-center items-center bg-green-500 shadow-green-500/30 shadow-lg rounded-full size-18 md:size-20 xl:size-24">
                            <CheckCircle className="size-9 md:size-10 xl:size-12 text-white" />
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>

                        <h1 className="mb-2 font-bold text-foreground text-xl md:text-2xl xl:text-3xl">
                            All Set!
                        </h1>
                        <p className="mb-8 text-muted-foreground">
                            Your account is now secured with a recovery phrase and passcode.
                        </p>
                        <Card className="bg-green-50/50 dark:bg-green-950/20 mb-6 border-green-200 dark:border-green-800">
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex justify-center items-center bg-green-500/20 rounded-full size-10">
                                        <Lock className="size-5 text-green-600" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-semibold text-green-800 dark:text-green-200">
                                            Security Enabled
                                        </p>
                                        <p className="text-green-700 dark:text-green-300 text-sm">
                                            Recovery phrase + 6-digit passcode
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Link to="/dashboard">
                            <Button className="shadow-lg shadow-primary/25 w-full h-12 font-semibold">
                                <Fingerprint className="mr-2 size-5" />
                                Go to Dashboard
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-dvh">
            <div className="mx-auto px-4 py-8 md:py-12 max-w-md">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
                    <div className="inline-flex justify-center items-center bg-primary/10 mb-4 rounded-2xl size-12 md:size-14 xl:size-16">
                        <Lock className="size-6 md:size-7 xl:size-8 text-primary" />
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.div key={stage} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <h1 className="mb-2 font-bold text-foreground text-xl md:text-2xl xl:text-3xl">
                                {stage === 'create' ? 'Create Passcode' : 'Confirm Passcode'}
                            </h1>
                            <p className="text-muted-foreground">
                                {stage === 'create'
                                    ? 'Enter a 6-digit passcode to secure your account'
                                    : 'Re-enter your passcode to confirm'
                                }
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                {/* Step Indicator */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-8">
                    <StepIndicator currentStep={3} />
                </motion.div>

                {/* Passcode Card */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <Card className={cn(
                        "shadow-lg border-border transition-all duration-300",
                        shake && "animate-shake border border-destructive/20"
                    )}>
                        <CardHeader className="pb-4 text-center">
                            <CardTitle className="text-sm md:text-base xl:text-lg">
                                {stage === 'create' ? 'New Passcode' : 'Verify Passcode'}
                            </CardTitle>
                            <CardDescription>
                                Use only numbers (0-9)
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            {/* Passcode Display */}
                            <div className="py-4">
                                <motion.div key={stage} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                                    <PasscodeDisplay value={currentPasscode} maxLength={PASSCODE_LENGTH} />
                                </motion.div>
                            </div>

                            {/* Error Message */}
                            <AnimatePresence>
                                {error && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                                        <Alert className="bg-destructive/10 border-destructive/50">
                                            <AlertDescription className="text-[11px] text-destructive md:text-xs xl:text-sm text-center">
                                                {error}
                                            </AlertDescription>
                                        </Alert>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Numeric Keypad */}
                            <NumericKeypad onKeyPress={handleKeyPress} onDelete={handleDelete} onClear={handleClear} />
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Info Alert */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6">
                    <Alert className="bg-primary/5 border-primary/20">
                        <Info className="size-4 text-primary" />
                        <AlertDescription className="text-foreground/70 text-sm">
                            This passcode will be required each time you access your account.
                            Choose something memorable but not easily guessed.
                        </AlertDescription>
                    </Alert>
                </motion.div>

                {/* Back Button */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-6">
                    {stage === 'confirm' ? (
                        <Button
                            variant="ghost"
                            className="w-full"
                            onClick={() => {
                                setStage('create');
                                setPasscode('');
                                setConfirmPasscode('');
                                setError('');
                            }}>
                            <ArrowLeft className="mr-2 size-4" />
                            Change Passcode
                        </Button>
                    ) : (
                        <Link to="/passphrase-verification">
                            <Button variant="ghost" className="w-full">
                                <ArrowLeft className="mr-2 size-4" />
                                Back to Verification
                            </Button>
                        </Link>
                    )}
                </motion.div>
            </div>
        </div>
    );
}