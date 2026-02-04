import { createFileRoute } from '@tanstack/react-router';

// Components
import PassphraseVerification from '@/pages/Auth/PassphraseVerification';

export const Route = createFileRoute('/_auth/passphrase-verification')({
  component: RouteComponent,
})

function RouteComponent() {
  return <PassphraseVerification />
}
