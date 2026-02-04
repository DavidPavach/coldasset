import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-fox-toast";

// Utils and Hooks
import { cn } from "@/lib/utils";

// Components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import PasscodeDisplay from "@/pages/Auth/Passcode/PasscodeDisplay";
import NumericKeypad from "@/pages/Auth/Passcode/NumericKeypad";
import { Alert, AlertDescription } from "@/components/ui/alert";

const PASSCODE_LENGTH = 6;

const Verify = ({ code, update, cancel }: { code: string, update: () => void, cancel: () => void, }) => {

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
    const verifyPasscode = () => {
        if (code === passcode) {
            update();
            return toast.success("Passcode verification was successful");
        } else {
            return toast.error("Incorrect Passcode")
        }
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
                    <button onClick={cancel} className="bg-destructive my-4 mr-4 ml-auto px-4 py-2 rounded-lg w-fit text-[11px] md:text-xs xl:text-sm cursor-pointer">Cancel</button>
                </Card>
            </motion.div>
        </main>
    );
}

export default Verify;