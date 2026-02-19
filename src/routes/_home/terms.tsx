import { createFileRoute } from '@tanstack/react-router';

// Components
import Terms from "@/pages/Home/Terms";

export const Route = createFileRoute('/_home/terms')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Terms />
}
