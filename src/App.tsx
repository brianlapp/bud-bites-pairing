import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { Suspense, lazy } from "react";
import "./App.css";
import Index from "./pages/Index";

// Lazy load route components
const Recipe = lazy(() => import("./pages/Recipe"));
const Calculator = lazy(() => import("./pages/Calculator"));
const Budget = lazy(() => import("./pages/Budget"));
const CannabisGame = lazy(() => import("./pages/CannabisGame"));
const CannabisWordle = lazy(() => import("./pages/CannabisWordle"));
const Auth = lazy(() => import("./pages/Auth"));
const Profile = lazy(() => import("./pages/Profile"));
const Contact = lazy(() => import("./pages/Contact"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
      gcTime: 1000 * 60 * 30, // Cache is kept for 30 minutes
      retry: 3, // Retry failed requests 3 times
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false, // Don't refetch on window focus
      refetchOnReconnect: 'always', // Always refetch on reconnect
    },
    mutations: {
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-sage-500"></div>
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<AnimatePresence mode="wait"><Index /></AnimatePresence>} />
            <Route path="/recipe/:id" element={<AnimatePresence mode="wait"><Recipe /></AnimatePresence>} />
            <Route path="/calculator" element={<AnimatePresence mode="wait"><Calculator /></AnimatePresence>} />
            <Route path="/tools/calculator" element={<AnimatePresence mode="wait"><Calculator /></AnimatePresence>} />
            <Route path="/tools/budget" element={<AnimatePresence mode="wait"><Budget /></AnimatePresence>} />
            <Route path="/tools" element={<AnimatePresence mode="wait"><Index /></AnimatePresence>} />
            <Route path="/games" element={<AnimatePresence mode="wait"><Index /></AnimatePresence>} />
            <Route path="/games/tycoon" element={<AnimatePresence mode="wait"><CannabisGame /></AnimatePresence>} />
            <Route path="/games/wordle" element={<AnimatePresence mode="wait"><CannabisWordle /></AnimatePresence>} />
            <Route path="/about" element={<AnimatePresence mode="wait"><Index /></AnimatePresence>} />
            <Route path="/contact" element={<AnimatePresence mode="wait"><Contact /></AnimatePresence>} />
            <Route path="/auth" element={<AnimatePresence mode="wait"><Auth /></AnimatePresence>} />
            <Route path="/profile" element={<AnimatePresence mode="wait"><Profile /></AnimatePresence>} />
          </Routes>
          <Toaster />
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;