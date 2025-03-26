import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Survey from "./pages/Survey";
import Longi from "./pages/Longi";
import LivrrTribe from "./pages/LivrrTribe";
import LivrrAlpha from "./pages/LivrrAlpha";
import LiverAI from "./pages/LiverAI";
import BlueZone from "./pages/BlueZone";
import NotFound from "./pages/NotFound";
import { AppProvider } from "./context/AppContext";
import CustomCursor from "./components/CustomCursor";
import CookieConsent from "./components/CookieConsent"; // Cookie Popup Component
import Footer from "./components/Footer"; // Footer Component (used only for popup)
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Press  from "./components/Press";
import Articles  from "./pages/Articles";
import CookiesPolicy from "./pages/CookiesPolicy";
import Terms from "./pages/Terms";
import Ayurveda from './components/products/Ayurveda';
import Homeopathy from './components/products/Homeopathy';
import Unani from "./components/products/Unani";
import ProductCategories from './components/products/ProductCategories';
import Siddha from "./components/products/Siddha";
import Naturopathy from "./components/products/Naturopathy";
import TraditionalChineseMedicine from "./components/products/TraditionalChineseMedicine";
import AboutUs from "./components/AboutUs";

import Waitlist from './components/Waitlist';
import { useState, useEffect } from 'react';



const queryClient = new QueryClient();

const App = () => {
  const [showNotification, setShowNotification] = useState(true);
  return (

    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <CustomCursor />
            <CookieConsent /> {/* Cookie Popup */}

            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/survey" element={<Survey />} />
              <Route path="/longi" element={<Longi />} />
              <Route path="/livrr-tribe" element={<LivrrTribe />} />
              <Route path="/livrr-alpha" element={<LivrrAlpha />} />
              <Route path="/blue-zone" element={<BlueZone />} />
              <Route path="/liver-ai" element={<LiverAI />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/Article" element={<Articles />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookies-policy" element={<CookiesPolicy />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="/waitlist" element={<Waitlist />} />
              <Route path="/press" element={<Press />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/articles" element={<Articles />} />

<Route path="/aboutus" element={<AboutUs />} />
              <Route path="/products/ayurveda" element={<Ayurveda />} />
              <Route path="/products/homeopathy" element={<Homeopathy/>} />
              <Route path="/products/unani" element={<Unani/>} />
              <Route path="/products/siddha" element={<Siddha/>} />
              <Route path="/products/naturopathy" element={<Naturopathy/>} />
              <Route path="/products/traditionalchinesemedicine" element={<TraditionalChineseMedicine/>} />
              {/* <Route path="/NotificationBox" element={<NotificationBox/>} /> */}
              {/* <Route path="/Press" element={<Press />} /> 
              <Route path="/Press" element={<Press />} /> */}
            </Routes>

            {/* Render Footer Only for Popup Purpose (Visually Hidden) */}
            <div style={{ display: "none" }}>
              <Footer />
            </div>
          </BrowserRouter>
        </AppProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
