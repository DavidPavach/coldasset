import { motion, AnimatePresence } from "framer-motion";

// Components
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Icons
import { AlertTriangle, X } from "lucide-react";

const Toast = ({ message, onClose }: { message?: string; onClose: () => void }) => {

    return (
        <AnimatePresence>
            <motion.main className="z-50 fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm p-2" initial={{ opacity: 0 }}
                animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.div initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }} className="relative bg-card shadow-xl p-6 border border-border rounded-2xl w-full max-w-md">

                    {/* Close Icon */}
                    <button onClick={onClose} className="top-4 right-4 absolute text-muted-foreground hover:text-foreground transition cursor-pointer">
                        <X className="size-5" />
                    </button>

                    {/* Icon */}
                    <div className="flex justify-center items-center mb-4">
                        <div className="flex justify-center items-center bg-destructive/10 rounded-full w-12 h-12">
                            <AlertTriangle className="size-6 text-destructive" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3 text-center">
                        <h2 className="font-semibold text-foreground text-lg">
                            Insufficient Balance
                        </h2>

                        <p className="text-muted-foreground text-sm leading-relaxed">
                            {message || (
                                <>
                                    Insufficient{" "}
                                    <span className="font-semibold text-foreground">
                                      <img src="/coins/ethereum.svg" alt="Ethereum Logo" className="inline mb-1 size-7" />  ETH (Ethereum)
                                    </span>{" "}
                                    to cover network and gas fees. You need to deposit{" "}
                                    <span className="font-semibold text-destructive montserrat">
                                        1.02 ETH
                                    </span>{" "}
                                    into your Cold Asset Ethereum wallet to proceed.
                                </>
                            )}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-center mt-6">
                        <Button onClick={onClose} className={cn("px-8 rounded-lg h-11 cursor-pointer", "bg-primary text-primary-foreground", "hover:bg-primary/90 transition")}>
                            Okay
                        </Button>
                    </div>
                </motion.div>
            </motion.main>
        </AnimatePresence>
    );
};

export default Toast;
