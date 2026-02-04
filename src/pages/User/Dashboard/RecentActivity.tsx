import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

// Hooks
import { useUserLastTx } from "@/services/queries.service";

// Components
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TransactionSkeleton from "@/components/TransactionLoading";

// Icons
import { ChevronRight, RefreshCw } from "lucide-react";
import { ErrorScreen } from "@/components/ErrorComponents";
import TransactionItem from "@/components/TransactionItem";


const RecentActivity = () => {

    const { data, isLoading, isFetching, isError, refetch } = useUserLastTx();

    if (isLoading || isFetching) {
        return <div className="space-y-4 w-full lg:w-[55%] xl:w-[60%]">
            {Array.from({ length: 5 }).map((_, i) => (
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

    return (
        <main className="w-full lg:w-[55%] xl:w-[60%]">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="border-border">
                    <CardHeader className="pb-4">
                        <div className="flex justify-between items-center">
                            <CardTitle className="font-bold text-base md:text-lg xl:text-xl">Recent Activity</CardTitle>
                            <Button variant="ghost" size="icon" className="size-8" onClick={() => refetch()}>
                                <RefreshCw className="size-4" />
                            </Button>
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
                                    <TransactionItem key={transaction._id} transaction={transaction} index={index} />
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
        </main >
    );
}

export default RecentActivity;