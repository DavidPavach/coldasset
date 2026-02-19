import { createFileRoute } from '@tanstack/react-router';

// Components
import Compliance from '@/pages/Home/Compliance';

export const Route = createFileRoute('/_home/compliance')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Compliance />
}
