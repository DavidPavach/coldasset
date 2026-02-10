import { createFileRoute } from '@tanstack/react-router';

// Components
import Features from '@/pages/Home/Features/index';

export const Route = createFileRoute('/_home/features')({
    component: RouteComponent,
})

function RouteComponent() {
    return <Features />
}
