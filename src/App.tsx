import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnnouncementProvider } from "@/context/AnnouncementContext";
import Index from "./pages/Index";
import PostAnnouncement from "./pages/PostAnnouncement";
import AnnouncementDetail from "./pages/AnnouncementDetail";
import Favorites from "./pages/Favorites";
import Logistics from "./pages/Logistics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AnnouncementProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/post" element={<PostAnnouncement />} />
            <Route path="/announcement/:id" element={<AnnouncementDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/logistics" element={<Logistics />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AnnouncementProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
