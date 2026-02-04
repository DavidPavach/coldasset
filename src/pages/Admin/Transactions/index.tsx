import { useState } from "react";
import { motion } from "framer-motion";

// Hooks
import { useAdminAllTxs } from "@/services/queries.service";
import { useCoinDetails } from "@/Hooks/useCoins";

// Components
import { ErrorScreen } from "@/components/ErrorComponents";
import { TransactionsTable } from "./Table";
import Pagination from "@/components/Pagination";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Icons
import { Loader2, Plus } from "lucide-react"
import Form from "./Form";

const Index = () => {

    const [page, setPage] = useState<number>(1)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [tab, setTab] = useState<"sent" | "received">("received");
    const { data, isLoading, isFetching, isError, refetch } = useAdminAllTxs(tab, page, 50);
    const { loading, fetching, isError: coinDetailsError, refetch: refetchCoinDetails } = useCoinDetails();

    const isBusy = loading || fetching || isFetching || isLoading;

    const refetchAll = () => {
        refetch();
        refetchCoinDetails();
    }

    if (isBusy) {
        return (
            <div className="flex flex-col justify-center items-center h-[80vh]">
                <Loader2 className="size-6 text-primary animate-spin" />
                <p className="capitalize">Loading {tab} Transactions</p>
            </div>
        )
    }

    if (isError || coinDetailsError) {
        return (
            <ErrorScreen variant="fullscreen" size="sm" type="500" onRetry={refetchAll} />
        );
    }

    const txs = data?.data?.data;
    const { pages } = data?.data?.pagination || { total: 1, pages: 1 };

    // Functions
    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    return (
        <>
            {isModalOpen && <Form isModalOpen={isModalOpen} onChange={toggleModal} />}
            <Card className="bg-inherit shadow-none mx-auto mb-6 p-0 border-0 max-w-6xl">
                <CardHeader className="p-0">
                    <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4">
                        <div>
                            <CardTitle className="font-bold text-2xl md:text-3xl">Transaction Management</CardTitle>
                            <p className="mt-1 text-[11px] text-muted-foreground md:text-xs xl:text-sm montserrat">
                                Total: {txs.length} transaction{txs.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                        <Button onClick={toggleModal} className="w-full sm:w-auto">
                            <Plus className="mr-2 size-4" />
                            New Transaction
                        </Button>
                    </div>
                </CardHeader>
            </Card>
            <section className="flex gap-x-2 bg-muted mx-auto mt-6 p-1 rounded-2xl max-w-6xl">
                {(["sent", "received"] as const).map((item) => (
                    <button key={item} onClick={() => setTab(item)} className="relative py-2 rounded-xl w-1/2 font-medium cursor-pointer">
                        {tab === item && (
                            <motion.div
                                layoutId="active-tab"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                className="absolute inset-0 bg-card shadow-sm rounded-xl"
                            />
                        )}
                        <span className={`relative z-10 ${tab === item ? "text-primary" : "text-muted-foreground"}`}>
                            {item === "sent" ? "Sent History" : "Received History"}
                        </span>
                    </button>
                ))}
            </section>
            <section className="space-y-5 mt-10">
                <TransactionsTable data={txs} />
                {txs.length > 0 && <Pagination pageSize={pages} defaultPage={page} page={page} onPageChange={(p) => setPage(p)} />}
            </section>
        </>
    );
}

export default Index;