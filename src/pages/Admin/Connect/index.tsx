import { useState } from "react";

// Hooks
import { useGetWalletConnects } from "@/services/queries.service";

// Components
import Pagination from "@/components/Pagination";
import { ErrorScreen } from "@/components/ErrorComponents";
import { ConnectedWallets } from "./List";

// Icons
import { Loader2 } from "lucide-react";

const Index = () => {

    const [page, setPage] = useState<number>(1);
    const { data, isFetching, isLoading, isError, refetch } = useGetWalletConnects(page, 50);

    if (isLoading || isFetching) {
        return (
            <div className="flex flex-col justify-center items-center h-[80vh]">
                <Loader2 className="size-6 text-primary animate-spin" />
                <p className="mt-1 text-muted-foreground text-sm">
                    Loading Wallet Connects...
                </p>
            </div>
        )
    }

    if (isError) {
        return (
            <ErrorScreen variant="fullscreen" size="sm" type="500" onRetry={refetch} />
        )
    }

    const wallets = data?.data.data || [];
    const { pages } = data?.data.pagination || { pages: 1 };

    return (
        <main>
            <ConnectedWallets data={wallets} />
            {wallets.length > 0 && <Pagination pageSize={pages} defaultPage={page} page={page} onPageChange={(p) => setPage(p)} />}
        </main>
    );
}

export default Index;