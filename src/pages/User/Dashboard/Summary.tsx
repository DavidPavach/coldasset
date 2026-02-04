import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

// Utils
import { formatCurrency } from "@/utils/format";

//Icons
import { Loader2 } from "lucide-react";
import { Copy, CopySuccess, Eye, EyeSlash, Send2, DirectboxReceive, BitcoinConvert, BitcoinCard } from "iconsax-reactjs";


type BalanceSummaryProps = {
    walletId: string;
    balance: number;
    isLoading: boolean;
}

const BalanceSummary = ({ walletId, balance, isLoading }: BalanceSummaryProps) => {

    const [copied, setCopied] = useState<boolean>(false)
    const [see, setSee] = useState<boolean>(true);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(walletId)
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
    }

    const actions = [
        { icon: <Send2 className="size-4 md:size-5 xl:size-6" />, label: "Send", url: "/send" },
        { icon: <DirectboxReceive className="size-4 md:size-5 xl:size-6" />, label: "Receive", url: "/receive" },
        { icon: <BitcoinConvert className="size-4 md:size-5 xl:size-6" />, label: "Swap", url: "/swap" },
        { icon: <BitcoinCard className="size-4 md:size-5 xl:size-6" />, label: "Buy", url: "/buy" },
    ]

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-card border border-border rounded-2xl">
            <div className="p-4 md:p-5 xl:p-6 pb-0">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">COLD ASSET ID</span>
                    {isLoading && <Loader2 className="text-border size-4 animate-spin" />}
                </div>
                <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm md:text-base xl:text-lg">{walletId}</span>
                    <button onClick={copyToClipboard} className="hover:text-green-600 dark:hover:text-green-400 transition-colors cursor-pointer">
                        {copied ? <CopySuccess className="size-4 md:size-5 xl:size-6 text-green-600 dark:text-green-400" variant="Bold" /> : <Copy className="size-4 md:size-5 xl:size-6" />}
                        <span className="sr-only">Copy wallet ID</span>
                    </button>
                    {copied && (
                        <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-green-600 dark:text-green-400">
                            Copied!
                        </motion.span>
                    )}
                    <button onClick={() => setSee((prev) => !prev)} className="hover:text-destructive transition-colors cursor-pointer">
                        {see ? <Eye className="size-4 md:size-5 xl:size-6" /> : <EyeSlash className="size-4 md:size-5 xl:size-6" />}
                    </button>
                </div>
            </div>

            <div className="px-4 md:px-5 xl:px-6 py-4 montserrat">
                {isLoading ? (
                    <div className="flex items-center space-x-4 h-12">
                        <div className="bg-muted rounded w-24 h-8 animate-pulse"></div>
                    </div>
                ) : (
                    <div>
                        <p className="mb-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm">TOTAL BALANCE </p>
                        <h2 className="font-bold text-3xl md:text-4xl xl:text-5xl">{see ? formatCurrency(balance) : "*****"}</h2>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-4 border-border border-t divide-x divide-border">
                {actions.map((action, index) => (
                    <Link to={action.url} key={index} className="flex flex-col justify-center items-center hover:bg-primary/40 disabled:opacity-50 py-5 transition-colors disabled:cursor-not-allowed">
                        <div className="flex justify-center items-center bg-primary/20 mb-2 rounded-full size-10">
                            {isLoading ? <Loader2 size={16} className="text-border animate-spin" /> : action.icon}
                        </div>
                        <span className="text-xs">{action.label}</span>
                    </Link>
                ))}
            </div>
        </motion.div>
    )
}

export default BalanceSummary;