import { Outlet, createFileRoute } from '@tanstack/react-router';

//Layout


export const Route = createFileRoute('/_home')({
  component: UseHomeWrapper,
})

function UseHomeWrapper() {
  return (
    <div>
      <Outlet />
    </div>
  )
}