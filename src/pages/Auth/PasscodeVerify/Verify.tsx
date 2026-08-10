import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-fox-toast";
import { useNavigate } from "@tanstack/react-router";

// Utils and Hooks
import { cn } from "@/lib/utils";
import { setPasscodeAccess } from "@/lib/token";
import { usePasscodeVerify } from "@/services/mutations.service";

// Components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import PasscodeDisplay from "../Passcode/PasscodeDisplay";
import NumericKeypad from "../Passcode/NumericKeypad";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Icons
import { Lock } from "iconsax-reactjs";

const PASSCODE_LENGTH = 6;

const Verify = () => {

    const navigate = useNavigate();
    const [passcode, setPasscode] = useState('');
    const [error, setError] = useState('');
    const [shake, setShake] = useState<boolean>(false);

    // Functions
    const reset = () => {
        if (shake) {
            setShake(false);
        }
        setError('')
    }
    const handleKeyPress = (key: string) => {
        reset()
        if (passcode.length < PASSCODE_LENGTH) {
            setPasscode(prev => prev + key);
        }
    };

    const handleDelete = () => {
        reset();
        setPasscode(prev => prev.slice(0, -1));
    };

    const handleClear = () => {
        reset();
        setPasscode('');
    };

    // Update Function
    const passcodeVerify = usePasscodeVerify();
    const verifyPasscode = () => {
        toast.info("Verifying Passcode...")
        passcodeVerify.mutate({ passcode: passcode }, {
            onSuccess: (response) => {
                setPasscodeAccess(response.data);
                toast.success("Your passcode was verified successfully!");
                navigate({ to: "/dashboard" })
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                setShake(true);
                const message = error?.response?.data?.message || "Failed to verified passcode, try again later.";
                setError(message)
                toast.error(message);
            },
        });
    }

    useEffect(() => {
        if (passcode.length === PASSCODE_LENGTH) {
            const timer = setTimeout(() => {
                verifyPasscode();
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [passcode]);

    return (
        <main>
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
                <div className="inline-flex justify-center items-center bg-primary/10 mb-4 rounded-2xl size-12 md:size-14 xl:size-16">
                    <Lock className="size-6 md:size-7 xl:size-8 text-primary" />
                </div>
                <AnimatePresence mode="wait">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                        <h1 className="mb-2 font-bold text-foreground text-xl md:text-2xl xl:text-3xl">
                            Confirm Passcode
                        </h1>
                        <p className="text-muted-foreground">
                            Enter a 6-digit passcode to access your account'
                        </p>
                    </motion.div>
                </AnimatePresence>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className={cn("shadow-lg border-border transition-all duration-300", shake && "animate-shake border border-destructive/20")}>
                    <CardHeader className="pb-4 text-center">
                        <CardTitle className="text-sm md:text-base xl:text-lg">
                            Verify Passcode
                        </CardTitle>
                        <CardDescription>
                            Use only numbers (0-9)
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        {/* Passcode Display */}
                        <div className="py-4">
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                                <PasscodeDisplay value={passcode} maxLength={PASSCODE_LENGTH} />
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
        </main>
    );
}

export default Verify;