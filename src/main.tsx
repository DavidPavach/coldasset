import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { toast } from 'react-fox-toast';

// @ts-ignore
import { registerSW } from "virtual:pwa-register";

// Import the generated route tree
import { routeTree } from './routeTree.gen'

import './styles.css'
import reportWebVitals from './reportWebVitals.ts'

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Register PWA
const updateSW = registerSW({
  immediate: true,

  onOfflineReady() {
    toast.success("Offline ready. You can use Cold Asset without internet.");
  },

  onNeedRefresh() {
    toast.custom(
      <div className="flex items-center gap-x-4 bg-blue-100 px-3 py-2 text-xs md:text-sm xl:text-base">
        <p>✨ New version available!</p>
        <button onClick={() => { updateSW(true) }}
          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg font-medium text-white text-xs">
          Reload
        </button>
      </div>,
      {
        position: "top-center",
        duration: 10000,
        icon: "🔔",
      }
    );
  },

  onRegisterError(error: Error) {
    console.warn("[PWA] SW register error:", error);
  },
});

// Render the app
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
