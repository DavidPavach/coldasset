import { createFileRoute } from '@tanstack/react-router';

// Components
import Passcode from "@/pages/Auth/Passcode";

export const Route = createFileRoute('/_auth/passcode')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Passcode />
}
