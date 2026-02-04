import { Outlet, createFileRoute } from '@tanstack/react-router';

//Layout


export const Route = createFileRoute('/_user')({
  component: UseHomeWrapper,
})

function UseHomeWrapper() {
  return (
    <div>
      <Outlet />
    </div>
  )
}