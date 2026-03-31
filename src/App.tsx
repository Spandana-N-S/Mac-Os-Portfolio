import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* AI Assistant Button - Bottom Left Redirect */}
          <a
            href="https://bots.easy-peasy.ai/bot/ca167aec-0797-4fc5-b92e-6428d3db4521?_gl=1*ryksq8*_gcl_au*NDMyNDA2NTIwLjE3NzQ5MTI0MTc."
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 left-6 z-[100] flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 via-teal-500 to-green-600 hover:from-green-500 hover:to-emerald-500 shadow-2xl shadow-emerald-500/50 hover:shadow-emerald-400/60 rounded-3xl p-0 transition-all duration-300 hover:scale-[1.1] active:scale-[0.97] animate-pulse-slow border-2 border-emerald-400/30 group"
            aria-label="Open AI Assistant in new tab"
          >
            <MessageCircle className="w-9 h-9 text-white drop-shadow-lg group-hover:rotate-12 transition-transform duration-300" strokeWidth={2} />
          </a>

        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
