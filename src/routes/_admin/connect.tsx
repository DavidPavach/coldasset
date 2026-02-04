import { createFileRoute } from '@tanstack/react-router';

// Components
import Connect from "@/pages/Admin/Connect";

export const Route = createFileRoute('/_admin/connect')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Connect />;
}
