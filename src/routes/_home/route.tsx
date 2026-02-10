import { Outlet, createFileRoute } from '@tanstack/react-router';

// Layout
import HomeLayout from '@/layouts/HomeLayout';

export const Route = createFileRoute('/_home')({
  component: UseHomeWrapper,
})

function UseHomeWrapper() {
  return (
    <HomeLayout>
      <Outlet />
    </HomeLayout>
  )
}