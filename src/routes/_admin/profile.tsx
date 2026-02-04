import { createFileRoute } from '@tanstack/react-router';

// Components
import Profile from "@/pages/Admin/Profile";

export const Route = createFileRoute('/_admin/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Profile />
}
