import { createFileRoute } from '@tanstack/react-router';

// Components
import Privacy from "@/pages/Home/Privacy";

export const Route = createFileRoute('/_home/privacy')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Privacy />
}
