import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

// Hooks
import { useUserCoinTxs } from "@/services/queries.service";

// Components
import TransactionItem from "@/components/TransactionItem";
import TransactionSkeleton from "@/components/TransactionLoading";
import { ErrorScreen } from "@/components/ErrorComponents";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TransactionReceipt from "@/components/TransactionReceipt";

// Icons
import { ChevronRight } from "lucide-react";

const Transactions = ({ coin }: { coin: string }) => {

    const { data, isLoading, isFetching, isError, refetch } = useUserCoinTxs({ coin });
    const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

    if (isLoading || isFetching) {
        return <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
                <TransactionSkeleton key={i} />
            ))}
        </div>
    }

    if (isError) {
        return (
            <ErrorScreen variant="card" size="sm" type="500" onRetry={refetch} />
        );
    }

    const transactions = data.data;

    const onClose = () => setSelectedTx(null);

    return (
        <>
            {selectedTx && <TransactionReceipt transaction={selectedTx} onClose={onClose} />}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="shadow-lg border-border">
                    <CardHeader className="pb-4">
                        <div className="flex justify-between items-center">
                            <CardTitle className="font-bold text-base md:text-lg xl:text-xl capitalize">{coin} Transactions</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        {transactions.length === 0 ? (
                            <div className="py-4 text-destructive text-sm md:text-base xl:text-lg text-center">
                                No Transactions Yet
                            </div>
                        ) : (
                            <>
                                {transactions.map((transaction: Transaction, index: number) => (
                                    <TransactionItem key={transaction._id} transaction={transaction} index={index} onClick={() => setSelectedTx(transaction)} />
                                ))}

                                <Link to="/history">
                                    <Button variant="ghost" className="mt-4 w-full">
                                        View All Transactions
                                        <ChevronRight className="ml-2 size-4" />
                                    </Button>
                                </Link>
                            </>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </>
    );
}

export default Transactions;