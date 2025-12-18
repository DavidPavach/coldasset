import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { ToastContainer } from 'react-fox-toast';

// Theme
import { ThemeProviderEffect } from '@/components/ThemeProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      staleTime: 5 * 60000,
      refetchOnReconnect: true,
      refetchOnMount: true,
      gcTime: 10 * 60000
    }
  }
})

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <ToastContainer position="top-center" isPausedOnHover={true} duration={5000} />
      <ThemeProviderEffect />
      <TanStackDevtools config={{ position: 'bottom-right' }} plugins={[{ name: 'Tanstack Router', render: <TanStackRouterDevtoolsPanel />, }]} />
    </QueryClientProvider>
  ),
})
