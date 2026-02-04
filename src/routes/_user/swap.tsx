import { createFileRoute } from '@tanstack/react-router';

// Components
import Swap from "@/pages/User/Swap";

export const Route = createFileRoute('/_user/swap')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Swap />
}
