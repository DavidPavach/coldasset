// Hooks
import { useUserDetails } from "@/services/queries.service";
import { useCoinDetails } from "@/Hooks/useCoinDetails";

// Components
import { ErrorScreen } from "@/components/ErrorComponents";
import BalanceSummary from "./Summary";
import RecentActivity from "./RecentActivity";
import Assets from "./Assets";
import Distribution from "./Distribution";

const Index = () => {

    const { loading, fetching, isError, refetch, getTotalBalance } = useCoinDetails();
    const userDetailsQuery = useUserDetails();

    const isLoading =
        loading || fetching ||
        userDetailsQuery.isLoading ||
        userDetailsQuery.isFetching;

    const hasError = isError || userDetailsQuery.isError;

    const handleRetry = () => {
        refetch();
        userDetailsQuery.refetch();
    };

    if (hasError) {
        return (
            <ErrorScreen
                variant="fullscreen"
                size="sm"
                type="500"
                onRetry={handleRetry}
            />
        );
    }

    const userDetails = userDetailsQuery.data?.data;

    if (!userDetails) {
        return null;
    }

    const totalBalance = getTotalBalance();

    return (
        <main>
            <BalanceSummary isLoading={isLoading} walletId={userDetails.accountId} balance={totalBalance} />
            <section className="flex lg:flex-row flex-col gap-4 md:gap-6 xl:gap-8 mt-4 md:mt-6 xl:mt-8">
                <RecentActivity />
                <Assets />
            </section>
            <Distribution />
        </main>
    );
};

export default Index;
