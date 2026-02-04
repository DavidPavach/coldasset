import { createFileRoute } from '@tanstack/react-router';

// Components
import Receive from "@/pages/User/Receive";

export const Route = createFileRoute('/_user/receive')({
  validateSearch: (search: Record<string, unknown>) => ({
    coin: search.coin as string | undefined,
    type: search.type as string | undefined,
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <Receive />
}
