import { createFileRoute } from '@tanstack/react-router';

// Component
import Buy from "@/pages/User/Buy";

export const Route = createFileRoute('/_user/buy')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Buy />
}
