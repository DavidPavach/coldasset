import { createFileRoute } from '@tanstack/react-router';

// Components
import PasscodeVerify from "@/pages/Auth/PasscodeVerify";

export const Route = createFileRoute('/_auth/passcode-verify')({
  component: RouteComponent,
})

function RouteComponent() {
  return <PasscodeVerify />
}
