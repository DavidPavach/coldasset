import { useState } from "react";
import { motion } from "framer-motion";

// Hooks
import { useUserAllTxs } from "@/services/queries.service";

// Components
import TransactionItem from "@/components/TransactionItem";
import TransactionSkeleton from "@/components/TransactionLoading";
import TransactionReceipt from "@/components/TransactionReceipt";
import { ErrorScreen } from "@/components/ErrorComponents";
import Pagination from "@/components/Pagination";

// Icons
import { Receipt1 } from "iconsax-reactjs";

const Index = () => {

    const [page, setPage] = useState(1);
    const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

    const { data, isLoading, isFetching, isError, refetch } = useUserAllTxs(page, 50);

    if (isLoading || isFetching) {
        return (
            <main className="space-y-4 bg-background p-6 h-[80vh]">
                {Array.from({ length: 6 }).map((_, i) => (
                    <TransactionSkeleton key={i} />
                ))}
            </main>
        );
    }

    if (isError) {
        return (
            <ErrorScreen variant="fullscreen" size="sm" type="500" onRetry={refetch} />
        );
    }

    const transactions = data?.data?.data || [];
    const pagination = data?.data.pagination;

    return (
        <main className="mx-auto max-w-6xl">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} className="mb-12 text-center">
                <div className="inline-flex justify-center items-center bg-primary/10 mb-6 rounded-xl size-12 md:size-14 xl:size-16">
                    <Receipt1 variant="Linear" className="size-6 md:size-7 xl:size-8 text-primary" />
                </div>

                <h1 className="font-bold text-foreground text-2xl md:text-3xl xl:text-4xl tracking-tight">
                    Transaction History
                </h1>

                <p className="mt-2 text-muted-foreground text-sm md:text-base">
                    A complete record of your recent transactions.
                </p>
            </motion.div>


            {/* Empty State */}
            {!transactions.length && (
                <div className="bg-card mt-10 p-10 border border-border rounded-xl text-center">
                    <p className="text-destructive text-sm">
                        No transactions found.
                    </p>
                </div>
            )}

            {/* Transactions */}
            <div className="space-y-3 mt-10">
                {transactions.map((tx: Transaction, index: number) => (
                    <TransactionItem index={index} key={tx._id} transaction={tx} onClick={() => setSelectedTx(tx)} />
                ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.pages > 1 && (
                <div className="flex justify-center pt-6">
                    <Pagination pageSize={pagination.pages} page={page} defaultPage={page} onPageChange={(p) => setPage(p)} />
                </div>
            )}

            {/* Receipt Modal */}
            {
                selectedTx && (
                    <TransactionReceipt transaction={selectedTx} onClose={() => setSelectedTx(null)} />
                )
            }
        </main >
    );
}

export default Index;