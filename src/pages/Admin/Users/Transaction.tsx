import { useState } from "react";

// Hooks, Utils, Constants and Enums
import { useGetUserTxs } from "@/services/queries.service";
import { formatAddress, formatDate } from "@/utils/format";
import { STATUS_COLORS, TYPE_COLORS } from "../Transactions/constants";
import { coinMeta } from "@/enum";

// Components
import { Badge } from "@/components/ui/badge";
import { ErrorScreen } from "@/components/ErrorComponents";
import Pagination from "@/components/Pagination";

// Icons
import { Loader2 } from "lucide-react";

const Transaction = ({ userId, userName }: { userId: string, userName: string }) => {

    const [page, setPage] = useState<number>(1)
    const { data, isLoading, isError, isFetching, refetch } = useGetUserTxs({ page: page.toString(), limit: "7", userId });

    const transactions: Transaction[] = data?.data?.data || [];
    const pages = data?.data?.pagination?.pages || 1;

    if (isLoading || isFetching) {
        return (
            <div className="flex flex-col justify-center items-center h-[40vh]">
                <Loader2 className="size-6 text-primary animate-spin" />
                <p className="mt-1 text-muted-foreground text-sm">
                    Loading transactions
                </p>
            </div>
        )
    }

    if (isError) {
        return (
            <ErrorScreen variant="card" size="sm" type="500" onRetry={refetch} />
        )
    }


    return (
        <main>
            {transactions.length === 0 ?
                <div className="flex justify-center items-center bg-card mx-auto py-12 rounded-xl max-w-6xl">
                    <p className="text-destructive capitalize">No Transactions Yet For {userName}</p>
                </div> :
                <main className="space-y-5">
                    <section className="pb-4 rounded-xl overflow-x-auto">
                        <table className="w-full text-nowrap border-collapse">
                            <thead>
                                <tr className="bg-muted/40 border-border border-b font-semibold text-muted-foreground text-xs text-left uppercase tracking-wide">
                                    <th className="px-4 py-3">Coin</th>
                                    <th className="px-4 py-3">Type</th>
                                    <th className="px-4 py-3">Amount</th>
                                    <th className="px-4 py-3">Network</th>
                                    <th className="px-4 py-3">Tx Hash</th>
                                    <th className="px-4 py-3">Wallet Address</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                {transactions.map((tx) => {
                                    const meta = coinMeta[tx.coin]

                                    return (
                                        <tr key={tx._id} className="hover:bg-accent/20 border-border border-b transition-colors">
                                            {/* Coin */}
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className={`flex size-9 items-center justify-center rounded-full bg-linear-to-br ${meta.colorFrom} ${meta.colorTo}`}>
                                                        <img src={meta.logo} alt={meta.name} className="size-6" />
                                                    </div>
                                                    <div className="leading-tight">
                                                        <p className="font-medium">{meta.name}</p>
                                                        <p className="text-muted-foreground text-xs">
                                                            {meta.symbol}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Type */}
                                            <td className="px-4 py-3">
                                                <Badge className={`${TYPE_COLORS[tx.transactionType]} capitalize`}>
                                                    {tx.transactionType}
                                                </Badge>
                                            </td>

                                            {/* Amount */}
                                            <td className="px-4 py-3 font-medium montserrat">
                                                {tx.amount.toLocaleString()} {meta.symbol}
                                            </td>

                                            {/* Network */}
                                            <td className="px-4 py-3 font-medium capitalize">
                                                {tx.network || "No Network"}
                                            </td>

                                            {/* Hash */}
                                            <td className="px-4 py-3 font-medium capitalize">
                                                {tx.transactionHash ? formatAddress(tx.transactionHash) : "No Hash"}
                                            </td>

                                            {/* Wallet Address */}
                                            <td className="px-4 py-3 font-medium capitalize">
                                                {tx.walletAddress ? formatAddress(tx.walletAddress) : "No Wallet Address"}
                                            </td>

                                            {/* Status */}
                                            <td className="px-4 py-3">
                                                <Badge className={`${STATUS_COLORS[tx.status]} capitalize`}>
                                                    {tx.status}
                                                </Badge>
                                            </td>

                                            {/* Date */}
                                            <td className="px-4 py-3 text-muted-foreground text-sm">
                                                {formatDate(tx.createdAt, "short")}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                    </section>
                    {transactions.length > 0 && <Pagination pageSize={pages} defaultPage={page} page={page} onPageChange={(p) => setPage(p)} />}
                </main>
            }
        </main>
    );
}

export default Transaction;