import { createFileRoute } from '@tanstack/react-router';

// Components
import Dashboard from "@/pages/User/Dashboard";

export const Route = createFileRoute('/_user/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Dashboard />
}
