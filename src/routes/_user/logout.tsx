import { createFileRoute } from '@tanstack/react-router';

// Components
import Logout from "@/pages/User/Logout";

export const Route = createFileRoute('/_user/logout')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Logout />
}
