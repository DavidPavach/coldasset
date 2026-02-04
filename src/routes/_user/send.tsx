import { createFileRoute } from '@tanstack/react-router';

// Component
import Send from "@/pages/User/Send";

export const Route = createFileRoute('/_user/send')({
  validateSearch: (search: Record<string, unknown>) => ({
        coin: search.coin as string | undefined,
        type: search.type as string | undefined,
    }),
  component: RouteComponent,
})

function RouteComponent() {
  return <Send />
}
