import { createFileRoute } from '@tanstack/react-router';

// Components
import Passphrase from "@/pages/Auth/Passphrase";

export const Route = createFileRoute('/_auth/passphrase')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Passphrase />
}
