// Hooks
import { useUserConWalFn } from "@/services/queries.service";

// Components
import { ErrorScreen } from "@/components/ErrorComponents";
import Wallet from "./Wallet";

const Index = () => {

    const { data, isLoading, isFetching, isError, refetch } = useUserConWalFn();

    // Loading
    if (isLoading || isFetching) {
        return (
            <div className="flex flex-col justify-center items-center gap-y-1 h-[80vh]">
                <div className="border-4 border-primary border-t-transparent rounded-full size-8 animate-spin" />
                <p>Loading Connect Wallet</p>
            </div>
        );
    }

    // Error
    if (isError) {
        return (
            <ErrorScreen variant="fullscreen" size="sm" type="500" onRetry={refetch} />
        );
    }

    // Safety check
    const exists = data?.data?.exists;
    const walletInfo = data?.data?.data;

    if (exists === undefined) {
        return (
            <ErrorScreen variant="fullscreen" size="sm" type="500" onRetry={refetch} />
        );
    }

    return (
        <>
            {exists === false ? (
                <Wallet />
            ) : (
                <Wallet connected connectedWalletName={walletInfo?.wallet} />
            )}
        </>
    );
};

export default Index;
