import { createFileRoute } from '@tanstack/react-router';

// Components
import Settings from "@/pages/User/Settings";

export const Route = createFileRoute('/_user/settings')({
  validateSearch: (search: Record<string, unknown>) => ({
    page: search.page as string | undefined,
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <Settings />
}
