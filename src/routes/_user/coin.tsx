import { createFileRoute } from '@tanstack/react-router';

// Components
import Coin from "@/pages/User/Coin";

export const Route = createFileRoute('/_user/coin')({
    validateSearch: (search: Record<string, unknown>) => ({
        coin: search.coin as string | undefined,
    }),
    component: RouteComponent,
})

function RouteComponent() {
    return <Coin />
}
