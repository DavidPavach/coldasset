import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

// Utils
import { formatAddress, formatCurrency, formatDate } from '@/utils/format';

// Icons
import { CheckCircle2, Clock, XCircle } from 'lucide-react';
import { BitcoinConvert, DirectboxReceive, Send2 } from 'iconsax-reactjs';

const ICONS = {
    sent: Send2,
    received: DirectboxReceive,
    swap: BitcoinConvert
};

const STATUS_CONFIG = {
    successful: {
        icon: CheckCircle2,
        color: 'text-green-600 bg-green-50 dark:bg-green-950/30',
        label: 'Successful'
    },
    pending: {
        icon: Clock,
        color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/30',
        label: 'Pending'
    },
    failed: {
        icon: XCircle,
        color: 'text-red-600 bg-red-50 dark:bg-red-950/30',
        label: 'Failed'
    }
};

export default function TransactionItem({ transaction, onClick, index }: { transaction: Transaction, onClick?: (tx: Transaction) => void; index: number }) {

    const Icon = ICONS[transaction.transactionType] || BitcoinConvert;
    const StatusIcon = STATUS_CONFIG[transaction.status]?.icon || Clock;
    const statusConfig = STATUS_CONFIG[transaction.status] || STATUS_CONFIG.pending;

    return (
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}
            className="group flex items-center gap-4 hover:bg-accent/10 mb-2 p-4 border border-border rounded-xl transition-colors cursor-pointer" onClick={() => onClick?.(transaction)}>
            {/* Icon */}
            <div className={cn(
                "flex justify-center items-center rounded-xl size-10 group-hover:scale-110 transition-transform shrink-0",
                transaction.transactionType === 'sent' && "bg-red-50 dark:bg-red-950/30 text-red-600",
                transaction.transactionType === 'received' && "bg-green-50 dark:bg-green-950/30 text-green-600",
                transaction.transactionType === 'swap' && "bg-blue-50 dark:bg-blue-950/30 text-blue-600"
            )}>
                <Icon variant='Bold' className="size-5" />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground text-sm capitalize">
                        {transaction.coin}
                    </h4>
                    <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium text-[10px]", statusConfig.color)}>
                        <StatusIcon className="size-3" />
                        {statusConfig.label}
                    </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    {transaction.network && <span className='hidden min-[500px]:block capitalize'>{transaction.network}</span>}
                    {transaction.network && <span className='hidden min-[500px]:block'>•</span>}
                    <span>{formatDate(transaction.createdAt, "short")}</span>
                </div>
            </div>

            {transaction.walletAddress && (
                <p className="hidden min-[500px]:block mt-1 font-mono text-muted-foreground text-xs truncate">
                    {formatAddress(transaction.walletAddress)}
                </p>
            )}

            {/* Amount */}
            <div className="text-right shrink-0">
                <p className={cn(
                    "font-bold text-sm montserrat",
                    transaction.transactionType === 'sent' && "text-red-600",
                    transaction.transactionType === 'received' && "text-green-600",
                    transaction.transactionType === 'swap' && "text-foreground"
                )}>
                    {transaction.transactionType === 'sent' ? '-' : transaction.transactionType === 'received' ? '+' : ''}
                    {transaction.amount}
                </p>
                <p className="mt-0.5 text-muted-foreground text-xs montserrat">
                    {formatCurrency(transaction.amount)}
                </p>
            </div>
        </motion.div>
    );
}