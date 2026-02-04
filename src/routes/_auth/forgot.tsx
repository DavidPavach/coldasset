import { createFileRoute } from '@tanstack/react-router';

// UI
import Forgot from "@/pages/Auth/Forgot";

export const Route = createFileRoute('/_auth/forgot')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => ({
    email: search.email as string | undefined,
    verify: search.verify as string | undefined,
  }),
})

function RouteComponent() {
  return <Forgot />
}
