import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Index from "@/pages/Index";
import { Theme } from "@radix-ui/themes";
import { AppSettingsProvider } from "@/contexts/AppSettingsContext";

const queryClient = new QueryClient();
import "@/styles/App.css";

const App = () => {
  return (
    <AppSettingsProvider>
      <Theme>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </Theme>
    </AppSettingsProvider>
  );
};

export default App;
