import { createFileRoute } from '@tanstack/react-router';

// Components
import Connect from "@/pages/User/Connect";

export const Route = createFileRoute('/_user/connect-wallet')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Connect />
}
