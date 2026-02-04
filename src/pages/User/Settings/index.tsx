import { Route } from "@/routes/_user/settings";

// Hooks
import { useUserDetails } from "@/services/queries.service";

// Components
import Profile from "./Profile";
import Crypto from "./Crypto";
import Selection from "./Selection";
import { ErrorScreen } from "@/components/ErrorComponents";

// Icon
import { Setting2 } from "iconsax-reactjs";

const Index = () => {

    const { data, isLoading, isFetching, isError, refetch } = useUserDetails();
    const search = Route.useSearch();
    const page = search.page;

    if (isLoading || isFetching) {
        return (
            <div className="flex flex-col justify-center items-center gap-y-1 h-[80vh]">
                <Setting2 className="size-8 animate-spin" />
                <p>Loading Settings</p>
            </div>
        );
    }

    if (isError) {
        return (
            <ErrorScreen variant="fullscreen" size="sm" type="500" onRetry={refetch} />
        );
    }

    const user = data?.data;

    return (
        <main>
            {page === "profile" && user ? (
                <Profile user={user} />
            ) : page === "crypto" ? (
                <Crypto />
            ) : (
                <Selection />
            )}
        </main>
    );
}

export default Index;