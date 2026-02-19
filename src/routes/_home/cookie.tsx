import { createFileRoute } from '@tanstack/react-router';

// Components
import CookiePolicy from '@/pages/Home/Cookie';

export const Route = createFileRoute('/_home/cookie')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CookiePolicy />
}
