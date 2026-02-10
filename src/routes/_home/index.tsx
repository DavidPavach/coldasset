import { createFileRoute } from '@tanstack/react-router';

// Components
import Home from "@/pages/Home/Landing/index";

export const Route = createFileRoute('/_home/')({
  component: Home,
})
