import { createFileRoute } from '@tanstack/react-router';

// Components
import History from "@/pages/User/History";

export const Route = createFileRoute('/_user/history')({
  component: RouteComponent,
})

function RouteComponent() {
  return <History />
}
