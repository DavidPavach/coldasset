import { createFileRoute } from '@tanstack/react-router';

// Components
import Security from "@/pages/Home/Security";

export const Route = createFileRoute('/_home/security')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Security />
}
