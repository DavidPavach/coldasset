import { createFileRoute } from '@tanstack/react-router';

// Components
import Install from "@/pages/Home/Install";

export const Route = createFileRoute('/_home/install')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Install />
}
