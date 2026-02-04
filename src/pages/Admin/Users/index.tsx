import { useState } from "react";
import { Route } from "@/routes/_admin/users";

// Hooks
import { useAdminAllUsers } from "@/services/queries.service";

// Components
import { ErrorScreen } from "@/components/ErrorComponents";
import Table from "./Table";
import Profile from "./Profile";
import Pagination from "@/components/Pagination";

// Icons
import { Loader2 } from "lucide-react";
import Search from "./Search";

const Index = () => {

    const [page, setPage] = useState(1);
    const { data, isLoading, isFetching, isError, refetch } = useAdminAllUsers(page, 50);
    const search = Route.useSearch();
    const profile = search.profile;

    if (isLoading || isFetching) {
        return (
            <div className="flex flex-col justify-center items-center h-[80vh]">
                <Loader2 className="size-6 text-primary animate-spin" />
                <p className="capitalize">Loading Users</p>
            </div>
        )
    }

    if (isError) {
        return (
            <ErrorScreen variant="fullscreen" size="sm" type="500" onRetry={refetch} />
        );
    }

    const users = data?.data.data ?? [];
    const pagination = data?.data.pagination;

    return (
        <main>
            {profile ? <Profile accountId={profile} /> :
                (
                    <main className="space-y-5">
                        <div className="text-center">
                            <h1 className="font-bold text-2xl md:text-3xl">User Management</h1>
                            <p>Manage Users</p>
                        </div>
                        <Search />
                        <Table users={users} />
                        {pagination && pagination.pages > 1 && <Pagination pageSize={pagination.pages ?? 1} defaultPage={page} page={page} onPageChange={(p) => setPage(p)} />}
                    </main>
                )}
        </main>
    );
}

export default Index;