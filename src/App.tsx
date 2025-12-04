import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/Login";
import ForgotPassword from "./pages/admin/ForgotPassword";
import ResetPassword from "./pages/admin/ResetPassword";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminLeads from "./pages/admin/Leads";
import AdminAppointments from "./pages/admin/Appointments";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminVideos from "./pages/admin/Videos";
import AdminContent from "./pages/admin/Content";
import AdminSettings from "./pages/admin/Settings";
import Affiliates from "./pages/admin/Affiliates";
import LinkGenerator from "./pages/admin/LinkGenerator";
import AffiliateAnalytics from "./pages/admin/AffiliateAnalytics";
import MindMaps from "./pages/admin/MindMaps";
import MindMapEditor from "./pages/admin/MindMapEditor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin/reset-password" element={<ResetPassword />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="appointments" element={<AdminAppointments />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="videos" element={<AdminVideos />} />
            <Route path="content" element={<AdminContent />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="affiliates" element={<Affiliates />} />
            <Route path="affiliates/link-generator" element={<LinkGenerator />} />
            <Route path="affiliates/analytics" element={<AffiliateAnalytics />} />
            <Route path="mind-maps" element={<MindMaps />} />
          </Route>
          <Route path="/admin/mind-maps/:id/editor" element={<MindMapEditor />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
