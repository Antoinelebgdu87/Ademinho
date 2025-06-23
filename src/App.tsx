import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Works from "./pages/Works";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import VisualEditor from "./components/VisualEditor";
import FloatingAdminButton from "./components/FloatingAdminButton";
import { useState, useEffect } from "react";
import { isAdminLoggedIn } from "./lib/auth";

const queryClient = new QueryClient();

const App = () => {
  const [isVisualEditorActive, setIsVisualEditorActive] = useState(false);

  useEffect(() => {
    // Global keyboard shortcut for visual editor
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+E to toggle visual editor (only for admin)
      if (e.ctrlKey && e.key === "e") {
        e.preventDefault();
        if (isAdminLoggedIn()) {
          setIsVisualEditorActive(!isVisualEditorActive);
        }
      }

      // Ctrl+1 for admin page (keep existing)
      if (e.ctrlKey && e.key === "1") {
        e.preventDefault();
        window.location.href = "/admin";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisualEditorActive]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/works" element={<Works />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Global Visual Editor - available on all pages for admins */}
          {isAdminLoggedIn() && (
            <>
              <VisualEditor
                isActive={isVisualEditorActive}
                onToggle={() => setIsVisualEditorActive(!isVisualEditorActive)}
              />
              <FloatingAdminButton
                onToggleEditor={() =>
                  setIsVisualEditorActive(!isVisualEditorActive)
                }
                isEditorActive={isVisualEditorActive}
              />
            </>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
