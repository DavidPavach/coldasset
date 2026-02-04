import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "@/routes/_admin/users";

// Hooks
import { useAdminGetUser } from "@/services/queries.service";

// Components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Icons
import { LoaderCircle } from "lucide-react";

const Search = () => {

    const [user, setUser] = useState<string>('');
    const navigate = useNavigate({ from: Route.fullPath });
    const { data, isLoading, isFetching, isError } = useAdminGetUser(user.toLowerCase());

    // Functions
    const setProfile = (profile: string) => {
        navigate({
            search: (prev) => ({
                ...prev,
                profile
            })
        })
    }

    return (
        <main className="space-y-2">
            <div className="space-y-2">
                <Label htmlFor="user">User Search </Label>
                <Input id="user" value={user} onChange={(e) => setUser(e.target.value)} placeholder="Enter User's Email, AccountId or Username" />
            </div>

            {(isLoading || isFetching) && (
                <div className="flex items-center gap-x-2">
                    <LoaderCircle className="size-5 text-primary animate-spin" />
                    <p>Fetching User Details...</p>
                </div>
            )}
            {(data && !isLoading && !isFetching && !isError) && (
                <div className="bg-secondary/50 px-4 py-2 border border-secondary rounded-lg">
                    <p className="text-[11px] md:text-xs xl:text-sm cursor-pointer" onClick={() => setProfile(data.data.accountId)}>
                        User Details: <span className="font-semibold first-letter:uppercase">{data.data.userName} {data.data.email}</span>
                    </p>
                </div>
            )}

            {(isError) && (
                <p className="text-[11px] text-destructive md:text-xs xl:text-sm">No user found. Please try again.</p>
            )}
        </main>
    );
}

export default Search;