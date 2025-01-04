import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";
import Index from "./pages/Index";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AnimatePresence mode="wait">
                <Index />
              </AnimatePresence>
            }
          />
          <Route
            path="/tools"
            element={
              <AnimatePresence mode="wait">
                <Index />
              </AnimatePresence>
            }
          />
          <Route
            path="/games"
            element={
              <AnimatePresence mode="wait">
                <Index />
              </AnimatePresence>
            }
          />
          <Route
            path="/about"
            element={
              <AnimatePresence mode="wait">
                <Index />
              </AnimatePresence>
            }
          />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;