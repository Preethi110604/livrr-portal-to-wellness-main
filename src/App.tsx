import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa"; 
import { ToastContainer } from "react-toastify";

import Index from "./pages/Index";
import Products from "./pages/Products";
import Goal from "./pages/Goal";
import Longi from "./pages/Longi";
import LivrrTribe from "./pages/LivrrTribe";
import LivrrAlpha from "./pages/LivrrAlpha";
import LiverAI from "./pages/LiverAI";
import BlueZone from "./pages/BlueZone";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Articles from "./pages/Articles";
import CookiesPolicy from "./pages/CookiesPolicy";
import Terms from "./pages/Terms";
import LogIn from "./pages/Login";
import Signup from "./pages/Signup";

import Ayurveda from "./components/products/Ayurveda";
import Homeopathy from "./components/products/Homeopathy";
import Unani from "./components/products/Unani";
import ProductCategories from "./components/products/ProductCategories";
import Siddha from "./components/products/Siddha";
import Naturopathy from "./components/products/Naturopathy";
import TraditionalChineseMedicine from "./components/products/TraditionalChineseMedicine";
import AboutUs from "./components/AboutUs";
import Press from "./components/Press";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";
import CustomCursor from "./components/CustomCursor";
import Waitlist from "./components/Waitlist";
import NewUpdates from "./components/Newupdates";

import { AppProvider } from "./context/AppContext";
import Healthprofile from "./pages/Healthprofile";

import  GoalCard  from "@/pages/Goalcard";
import HealthParameters from "./pages/Healthparamaters";
import Ingredients from "./pages/Ingredients";
import Verify from "./pages/verify";

const queryClient = new QueryClient();

const ActivityTracker = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let timer = setTimeout(() => {
      navigate("/signup");
    }, 180000); // 3 minutes

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        navigate("/signup");
      }, 180000);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("scroll", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("keydown", resetTimer);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, [navigate]);
  return null;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
           
            <ToastContainer/>
            <CustomCursor />
            <CookieConsent />
            <ActivityTracker />
            <div className="w-full max-w-screen overflow-x-hidden">

 
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/goal" element={<Goal />} />
              <Route path="/longi" element={<Longi />} />
              <Route path="/livrr-tribe" element={<LivrrTribe />} />
              <Route path="/livrr-alpha" element={<LivrrAlpha />} />
              <Route path="/blue-zone" element={<BlueZone />} />
              <Route path="/liver-ai" element={<LiverAI />} />
              <Route path="/new-updates" element={<NewUpdates />} />
              <Route path="/login" element={<LogIn/>} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookies-policy" element={<CookiesPolicy />} />
              <Route path="/waitlist" element={<Waitlist />} />
              <Route path="/press" element={<Press />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/products/ayurveda" element={<Ayurveda />} />
              <Route path="/products/homeopathy" element={<Homeopathy />} />
              <Route path="/products/unani" element={<Unani />} />
              <Route path="/products/siddha" element={<Siddha />} />
              <Route path="/products/naturopathy" element={<Naturopathy />} />
              <Route path="/products/traditionalchinesemedicine" element={<TraditionalChineseMedicine />} />
              <Route path="/healthprofile" element={<Healthprofile/>}/>
              <Route path="/health-parameters" element={<HealthParameters/>}/>
              <Route path="/Ingredients" element={<Ingredients/>}/> 
              <Route path="/Verify" element={<Verify/>}/>
              {/* <Route path="/pages/Goalcard" element={<GoalCard/>}/> */}
              <Route 
                path="/pages/Goalcard" 
                element={<GoalCard title="Sample Goal" description="This is a sample goal description" icon={<FaStar/>} onClick={() => console.log("Goal clicked")} />} 
              />
            </Routes>
            </div>

            <Footer />
          </BrowserRouter>
        </AppProvider>
      </TooltipProvider>
    </QueryClientProvider>
    
    
  );
};

export default App;