import React, { useEffect , useState} from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollReveal, usePulseAnimation } from '@/utils/animations';
import { Cpu, Zap, BrainCircuit, WifiOff, SmartphoneCharging, Activity, Watch, BadgeCheck, Clock, BarChart4, Sparkles } from 'lucide-react';
import WaveDivider from '@/components/ui/WaveDivider';
import { useToast } from "@/hooks/use-toast";
import { toast } from "@/components/ui/use-toast";
import { Link } from 'react-router-dom';
import Waitlist from '@/components/Waitlist';
import { animate, motion } from 'framer-motion';
import { FaQrcode, FaStar, FaHeartbeat, FaStore, FaBook, FaUserMd ,FaCamera,FaAppleAlt,FaChartLine,FaCheckCircle,FaLightbulb,FaRunning,FaWalking,FaDatabase, FaBookOpen,FaLeaf,  FaClipboardList,FaShoppingCart ,FaClipboardCheck,FaStethoscope} from 'react-icons/fa';
import { Card } from "@/components/ui/card";

// FeatureFlow Component
const FeatureFlow = () => {
  const MealScanAnimation = () => {
    const [scanStep, setScanStep] = useState(0);

    useEffect(() => {
      const timer = setTimeout(() => {
        setScanStep((prev) => (prev < 3 ? prev + 1 : 0));
      }, 2000);

      return () => clearTimeout(timer);
    }, [scanStep]);

    return (
      <div className="w-full p-4">
        
        {/* Phone Mockup */}
        <div className="relative bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl shadow-lg p-4 w-full h-56 mx-auto mb-4 overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
          
          {scanStep === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-white"
            >
              <FaCamera className="text-3xl mb-3 text-green-400" />
              <p className="text-center text-sm font-semibold">Point camera at meal</p>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="mt-4 text-sm text-gray-400"
              >
                Scanning...
              </motion.div>
            </motion.div>
          )}

          {scanStep === 1 && (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="h-full bg-gray-800 flex items-center justify-center rounded-lg"
            >
              <div className="text-white text-sm text-center">
                <FaAppleAlt className="mx-auto text-3xl mb-2 text-red-400" />
                <p className="font-medium">Analyzing meal...</p>
              </div>
            </motion.div>
          )}

          {scanStep === 2 && (
             <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="h-full bg-gray-800 p-2 text-white text-center rounded-lg flex flex-col justify-center items-center z-10"
           >
             <div className="grid grid-cols-1 gap-1 w-full">
               <div className="bg-green-40/20 hover:bg-green-50/30 p-4 rounded-lg shadow-sm transition transform hover:scale-15">
                 <p className="font-bold text-[10px]">320</p>
                 <p className="text-[8px] text-gray-300">calories</p>
               </div>
               <div className="bg-blue-40/20 hover:bg-blue-50/30 p-4 rounded-lg shadow-sm transition transform hover:scale-15">
                 <p className="font-bold text-[10px]">24g</p>
                 <p className="text-[8px] text-gray-300">protein</p>
               </div>
               <div className="bg-purple-40/20 hover:bg-purple-50/30 p-4 rounded-lg shadow-sm transition transform hover:scale-15">
                 <p className="font-bold text-[10px]">A+</p>
                 <p className="text-[8px] text-gray-300">health</p>
               </div>
             </div>
           </motion.div>
          )}

          {scanStep === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full bg-gray-800 p-4 text-white flex flex-col justify-center items-center rounded-lg"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-3 shadow-md">
                <FaChartLine className="text-2xl text-white" />
              </div>
              <p className="text-center text-sm font-medium">Data saved to profile</p>
            </motion.div>
          )}
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center space-x-2 mb-4">
          {[0, 1, 2, 3].map((step) => (
            <button
              key={step}
              onClick={() => setScanStep(step)}
              title={`Go to step ${step}`}
              aria-label={`Go to step ${step}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                scanStep === step 
                  ? 'bg-green-500 shadow-md scale-125' 
                  : 'bg-gray-500 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };
  const SmartSuggestionsAnimation = () => {
    const [suggestionStep, setSuggestionStep] = useState(0);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setSuggestionStep((prev) => (prev < 3 ? prev + 1 : 0));
      }, 2000);
  
      return () => clearTimeout(timer);
    }, [suggestionStep]);
  
    return (
      <div className="w-full p-4">
        
        {/* Suggestion Mockup */}
        <div className="relative bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl shadow-lg p-4 w-full h-56 mx-auto mb-4 overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
          
          {/* Step 0: Gathering Data */}
          {suggestionStep === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-white"
            >
              <FaLightbulb className="text-3xl mb-3 text-yellow-400" />
              <p className="text-center text-sm font-semibold">Gathering your data...</p>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="mt-4 text-sm text-gray-300"
              >
                Processing...
              </motion.div>
            </motion.div>
          )}
  
          {/* Step 1: Fitness Tips */}
          {suggestionStep === 1 && (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="h-full bg-gray-800 flex items-center justify-center rounded-lg"
              
            >
              <div className="text-white text-sm text-center">
                <FaRunning className="mx-auto text-3xl mb-2 text-gray-400" />
                <p className="font-medium">Fitness tips generated...</p>
              </div>
            </motion.div>
          )}
  
          {/* Step 2: Meal Recommendations */}
          {suggestionStep === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full bg-gray-800 p-1 text-white text-center rounded-lg flex flex-col justify-center items-center z-10"
            >
            <div className="grid grid-cols-1 gap-1 w-full">
            <div className="bg-green-30/10 hover:bg-green-20/10 p-2 rounded-lg shadow-sm transition transform hover:scale-105">
              <p className="font-bold text-[10px]">Salmon & Quinoa</p>  
              <p className="text-[8px] text-gray-400">High-protein, low-carb</p>  
            </div>
            <div className="bg-orange-30/10 hover:bg-orange-20/10 p-2 rounded-lg shadow-sm transition transform hover:scale-105">
              <p className="font-bold text-[10px]">Avocado Salad</p> 
              <p className="text-[8px] text-gray-400">Healthy fats & fiber</p>  
            </div>
          </div>
            </motion.div>
          )}
  
          {/* Step 3: Suggestions Saved */}
          {suggestionStep === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full bg-gray-800 p-4 text-white flex flex-col justify-center items-center rounded-lg"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-black-400 to-black-500 rounded-full flex items-center justify-center mb-3 shadow-md">
                <FaCheckCircle className="text-2xl text-white" />
              </div>
              <p className="text-center text-sm font-medium">Suggestions saved to profile</p>
            </motion.div>
          )}
        </div>
  
        {/* Progress Indicators */}
        <div className="flex justify-center space-x-2 mb-4">
          {[0, 1, 2, 3].map((step) => (
            <button
              key={step}
              onClick={() => setSuggestionStep(step)}
              title={`Go to step ${step}`}
              aria-label={`Go to step ${step}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                suggestionStep === step
                  ? 'bg-green-500 shadow-md scale-125' 
                  : 'bg-gray-500 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };
  const WearableIntegration = () => {
    const [step, setStep] = useState(0);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setStep((prev) => (prev < 3 ? prev + 1 : 0));
      }, 2000);
  
      return () => clearTimeout(timer);
    }, [step]);
  
    return (
      <div className="w-full p-4">
        
        {/* Card Section */}
        <div className="relative bg-gray-600 rounded-xl shadow-lg p-4 w-full h-56 mx-auto mb-4 overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
          
          {/* Steps */}
          {step === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-white"
            >
              <FaHeartbeat className="text-3xl mb-3 text-red-400" />
              <p className="text-center text-sm font-semibold">Connecting Wearable...</p>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="mt-4 text-sm text-gray-300"
              >
                Syncing data...
              </motion.div>
            </motion.div>
          )}
  
          {step === 1 && (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="h-full bg-gray-800 flex items-center justify-center rounded-lg"
            >
              <div className="text-white text-sm text-center">
                <FaWalking className="mx-auto text-3xl mb-2 text-yellow-400" />
                <p className="font-medium">Tracking steps...</p>
              </div>
            </motion.div>
          )}
  
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full bg-gray-800 p-4 text-white text-center rounded-lg flex flex-col justify-center items-center"
            >
              <div className="grid grid-cols-1 gap-2 w-full">
                <div className="bg-blue-40/20 hover:bg-blue-50/30 p-4 rounded-lg shadow-sm transition transform hover:scale-10">
                  <p className="font-bold text-[10px]">78 bpm</p>
                  <p className="text-[8px] text-gray-300">Heart Rate</p>
                </div>
                <div className="bg-orange-40/20 hover:bg-orange-50/30 p-4 rounded-lg shadow-sm transition transform hover:scale-10">
                  <p className="font-bold text-[10px]">8,500</p>
                  <p className="text-[8px] text-gray-300">Steps Today</p>
                </div>
              </div>
            </motion.div>
          )}
  
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full bg-gray-800 p-1 text-white flex flex-col justify-center items-center rounded-lg"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-3 shadow-md">
                <FaDatabase className="text-2xl text-white" />
              </div>
              <p className="text-center text-sm font-medium">Data saved to profile</p>
            </motion.div>
          )}
        </div>
  
        {/* Progress Indicators */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2, 3].map((s) => (
            <button
              key={s}
              onClick={() => setStep(s)}
              type="button"                       
              title={`Step ${s + 1}`}            
              aria-label={`Go to step ${s + 1}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                step === s 
                  ? 'bg-green-500 shadow-md scale-125' 
                  : 'bg-gray-500 hover:bg-green-400'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };
  const HealthyRecipesCard = () => {
    const [step, setStep] = useState(0);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setStep((prev) => (prev < 3 ? prev + 1 : 0));
      }, 2000);
  
      return () => clearTimeout(timer);
    }, [step]);
  
    return (
      <div className="w-full p-4">
        
        {/* Card Section */}
        <div className="relative bg-gray-600 rounded-xl shadow-lg p-4 w-full h-56 mx-auto mb-4 overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
          
          {/* Steps */}
          {step === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-white"
            >
              <FaBookOpen className="text-4xl mb-3 text-blue-400" />
              <p className="text-center text-sm font-semibold">Exploring Blogs...</p>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="mt-4 text-sm text-gray-300"
              >
                Discovering new recipes...
              </motion.div>
            </motion.div>
          )}
  
          {step === 1 && (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="h-full bg-gray-800 flex items-center justify-center rounded-lg"
            >
              <div className="text-white text-sm text-center">
                <FaLeaf className="mx-auto text-3xl mb-2 text-green-400" />
                <p className="font-medium">Fresh Organic Tips...</p>
              </div>
            </motion.div>
          )}
  
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full bg-gray-800 p-2 text-white text-center rounded-lg flex flex-col justify-center items-center"
            >
              <div className="grid grid-cols-1 gap-1 w-full">
                <div className="bg-orange-40/20 hover:bg-orange-50/30  rounded-lg shadow-sm transition transform hover:scale-10">
                  <p className="font-bold text-[10px] text-left">5 Ingredients</p>
                  <p className="text-[8px] text-gray-300 text-left">Simple & Easy</p>
                </div>
                <div className="bg-blue-40/20 hover:bg-blue-50/30  rounded-lg shadow-sm transition transform hover:scale-10">
                  <p className="font-bold text-[10px] text-left">30 min</p>
                  <p className="text-[8px] text-gray-300 text-left">Quick Preparation</p>
                </div>
              </div>
            </motion.div>
          )}
  
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full bg-gray-900 p-4 text-white flex flex-col justify-center items-center rounded-lg"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-3 shadow-md">
                <FaClipboardList className="text-2xl text-white" />
              </div>
              <p className="text-center text-sm font-medium">Recipe Added to Favorites</p>
            </motion.div>
          )}
        </div>
  
        {/* Progress Indicators */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2, 3].map((s) => (
            <button
              key={s}
              onClick={() => setStep(s)}
              type="button"                      
              title={`Step ${s + 1}`}            
              aria-label={`Go to step ${s + 1}`} 
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                step === s 
                  ? 'bg-green-500 shadow-md scale-125' 
                  : 'bg-gray-500 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };
  const OrganicMarketplaceCard = () => {
    const [step, setStep] = useState(0);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setStep((prev) => (prev < 3 ? prev + 1 : 0));
      }, 2000);
  
      return () => clearTimeout(timer);
    }, [step]);
  
    return (
      <div className="w-full p-4">
        
        {/* Card Section */}
        <div className="relative bg-gray-600 rounded-xl shadow-lg p-4 w-full h-56 mx-auto mb-4 overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
          
          {/* Steps */}
          {step === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-white"
            >
              <FaShoppingCart className="text-4xl mb-3 text-yellow-400" />
              <p className="text-center text-sm font-semibold">Browsing Products...</p>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="mt-4 text-sm text-gray-300"
              >
                Discovering new items...
              </motion.div>
            </motion.div>
          )}
  
          {step === 1 && (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="h-full bg-gray-800 flex items-center justify-center rounded-lg"
            >
              <div className="text-white text-sm text-center">
                <FaLeaf className="mx-auto text-3xl mb-2 text-green-400" />
                <p className="font-medium">Fresh & Organic Deals</p>
              </div>
            </motion.div>
          )}
  
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full bg-gray-800 p-1 text-white text-center rounded-lg flex flex-col justify-center items-center"
            >
              <div className="grid grid-cols-1 gap-1 w-full">
                <div className="bg-blue-40/20 hover:bg-blue-50/30 p-1 rounded-lg shadow-sm transition transform hover:scale-10">
                  <p className="font-bold text-[10px]">Free Delivery</p>
                  <p className="text-[8px] text-gray-300">On orders over $50</p>
                </div>
                <div className="bg-orange-40/20 hover:bg-orange-50/30 p-1 rounded-lg shadow-sm transition transform hover:scale-10">
                  <p className="font-bold text-[10px]">100% Organic</p>
                  <p className="text-[8px] text-gray-300">Certified fresh produce</p>
                </div>
              </div>
            </motion.div>
          )}
  
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full bg-gray-800 p-4 text-white flex flex-col justify-center items-center rounded-lg"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-3 shadow-md">
                <FaCheckCircle className="text-2xl text-white" />
              </div>
              <p className="text-center text-sm font-medium">Order Placed Successfully</p>
            </motion.div>
          )}
        </div>
  
        {/* Progress Indicators */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2, 3].map((s) => (
            <button
              key={s}
              onClick={() => setStep(s)}
              title={`Go to step ${step}`}
              aria-label={`Go to step ${step}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                step === s 
                  ? 'bg-green-500 shadow-md scale-125' 
                  : 'bg-gray-500 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };
  const DoctorConsultationsCard = () => {
    const [step, setStep] = useState(0);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setStep((prev) => (prev < 3 ? prev + 1 : 0));
      }, 2000);
  
      return () => clearTimeout(timer);
    }, [step]);
  
    return (
      <div className="w-full p-4">
        
        {/* Card Section */}
        <div className="relative bg-gray-600 rounded-xl shadow-lg p-4 w-full h-56 mx-auto mb-4 overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
          
          {/* Steps */}
          {step === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-white"
            >
              <FaUserMd className="text-4xl mb-3 text-purple-300" />
              <p className="text-center text-sm font-semibold">Connecting with Doctors...</p>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="mt-4 text-sm text-gray-300"
              >
                Finding the best specialists...
              </motion.div>
            </motion.div>
          )}
  
          {step === 1 && (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="h-full bg-gray-800 flex items-center justify-center rounded-lg"
            >
              <div className="text-white text-sm text-center">
                <FaStethoscope className="mx-auto text-3xl mb-2 text-green-400" />
                <p className="font-small">Virtual Consultations</p>
              </div>
            </motion.div>
          )}
  
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full bg-gray-800 p-1 text-white text-center rounded-lg flex flex-col justify-center items-center"
            >
              <div className="grid grid-cols-1 gap-1 w-full">
                <div className="bg-blue-20/10 hover:bg-blue-50/30 p-1 rounded-lg shadow-sm transition transform hover:scale-10">
                  <p className="font-bold text-[10px]">Book an Appointment</p>
                  <p className="text-[8px] text-gray-300">Flexible scheduling</p>
                </div>
                <div className="bg-yellow-20/10 hover:bg-yellow-50/30 p-1 rounded-lg shadow-sm transition transform hover:scale-10">
                  <p className="font-bold text-[10px]">Get Health Tips</p>
                  <p className="text-[8px] text-gray-300">From certified professionals</p>
                </div>
              </div>
            </motion.div>
          )}
  
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full bg-gray-800 p-4 text-white flex flex-col justify-center items-center rounded-lg"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center mb-3 shadow-md">
                <FaClipboardCheck className="text-2xl text-white" />
              </div>
              <p className="text-center text-sm font-medium">Consultation Confirmed</p>
            </motion.div>
          )}
        </div>
  
        {/* Progress Indicators */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2, 3].map((s) => (
            <button
              key={s}
              onClick={() => setStep(s)}
              title={`Go to step ${step}`}
              aria-label={`Go to step ${step}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                step === s 
                  ? 'bg-green-500 shadow-md scale-125' 
                  : 'bg-gray-500 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  const features = [
    {
      icon: <FaQrcode className="text-blue-500 text-3xl" />, 
      title: "Meal Scan", 
      description: "Analyze your food habits, track glucose levels, and understand the impact on your body age.",
      arrowTo: "Smart Suggestions",
      animation: <MealScanAnimation />
    },
    {
      icon: <FaStar className="text-yellow-500 text-3xl" />, 
      title: "Smart Suggestions", 
      description: "Receive personalized diet and fitness plans through simple Q&A sessions and health reports.",
      arrowTo: "Wearable Integration",
      animation:<SmartSuggestionsAnimation/>
    },
    {
      icon: <FaHeartbeat className="text-red-500 text-3xl" />, 
      title: "Wearable Integration", 
      description: "Connect with smart wearables to monitor sleep, steps, heart rate, and other vital metrics.",
      arrowTo: "Healthy Recipes & Blogs",
      animation:<WearableIntegration/>
    },
    {
      icon: <FaBook className="text-blue-400 text-3xl" />, 
      title: "Healthy Recipes & Blogs", 
      description: "Discover informative blogs about organic farming and healthy, easy-to-prepare recipes.",
      arrowTo: "Organic Marketplace",
      animation:<HealthyRecipesCard/>
    },
    {
      icon: <FaStore className="text-green-500 text-3xl" />, 
      title: "Organic Marketplace", 
      description: "Shop healthy organic products and local care products directly from trusted farmers.",
      arrowTo: "Doctor Consultations",
      animation:<OrganicMarketplaceCard/>
    },
    {
      icon: <FaUserMd className="text-purple-500 text-3xl" />, 
      title: "Doctor Consultations", 
      description: "Connect with naturopathy doctors for personalized guidance and consultation.",
      arrowTo: "Meal Scan",
      animation:<DoctorConsultationsCard/>
    }
  ];

  return (
    <div className="relative grid grid-cols-3 qawA gap-10 p-10 max-w-4xl mx-auto items-center">
      {features.map((feature, index) => (
        <motion.div 
          key={index} 
          whileHover={{ scale: 1.1, backgroundColor: "#4CAF50" }} 
          whileTap={{ scale: 0.9 }}
          className="relative flex flex-col items-center p-4 bg-white shadow-lg rounded-2xl w-60 h-100 transition-all"
          transition={{duration:0.5}}
          viewport={{once:true}}
        >
          <Card className="p-6 bg-white shadow-lg rounded-2xl text-center">
            {feature.icon}
            <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
            <p className="text-gray-500 mt-2 text-sm">{feature.description}</p>
            {feature.animation }
          </Card>
          {feature.arrowTo && (
            <motion.svg 
              className="absolute w-24 h-12 mt-4"
              viewBox="0 0 120 40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.path 
                d="M10,20 Q60,-10 110,20" 
                strokeDasharray="5,5" 
                strokeWidth="3" 
                stroke="green" 
                fill="none"
                initial={{ strokeDashoffset: 30 }}
                animate={{ strokeDashoffset: [30, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.circle 
                cx="10" cy="20" r="4" fill="green"
                animate={{ cx: [10, 110], cy: [20, 20] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.svg>
          )}
        </motion.div>
      ))}
      <motion.div 
        className="text-center mt-10 text-xl font-bold w-full"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
      >
      </motion.div>
    </div>
  );
};

const LivrrAlpha = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal(0.1);
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollReveal(0.1);
  const pulseRef = usePulseAnimation();
  const { toast } = useToast();
  
  useEffect(() => {
    // Show welcome toast
    toast({
      title: "Introducing Livrr α",
      description: "Our revolutionary algorithm for a healthier digital lifestyle",
      duration: 5000,
    });
    
    // Add parallax effect on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax');
      
      parallaxElements.forEach((element) => {
        const speed = element.getAttribute('data-speed') || "0.5";
        const yPos = -(scrollY * parseFloat(speed));
        element.setAttribute('style', `transform: translateY(${yPos}px)`);
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [toast]);

  // Features of the Livrr α algorithm
  const alphaFeatures = [
    // Your existing features array
  ];
  
  const keyMetrics = [
    // Your existing keyMetrics array
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-livrr-beige/10 overflow-hidden">
      <Navbar />
      
      <main className="pt-24 overflow-hidden">
        {/* Hero Section */}
        <section 
          ref={headerRef}
          className="relative py-20 md:py-28"
        >
          {/* Background elements */}
          <div className="absolute -z-10 inset-0 overflow-hidden">
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-livrr-green/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-livrr-blue/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"></div>
            <div className="absolute top-10 right-10 w-20 h-20 animate-pulse bg-yellow-500/10 rounded-full blur-xl"></div>
            <div 
              className="absolute top-0 left-0 w-full h-full opacity-20"
              style={{ 
                backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(76, 175, 80, 0.3) 0%, transparent 30%), radial-gradient(circle at 70% 60%, rgba(33, 150, 243, 0.3) 0%, transparent 30%)'
              }}
            ></div>
          </div>
          
          <div 
            className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-livrr-green/5 to-transparent"
            ref={pulseRef}
          />
          
          <div className={`container transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
                <div className="inline-block px-4 py-1 bg-gradient-to-r from-livrr-green/20 to-livrr-blue/20 text-livrr-green-dark rounded-full text-sm font-medium mb-4 border border-livrr-green/10">
                  <span className="flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-livrr-blue" />
                    <span>Coming Soon</span>
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-livrr-green-dark relative">
                  Livrr <span className="text-livrr-blue inline-block relative">α
                    <span className="absolute -top-2 right-0 text-xl bg-gradient-to-r from-livrr-green to-livrr-blue bg-clip-text text-transparent animate-pulse">BETA</span>
                  </span>
                  <span className="block w-1/2 h-1 mt-2 bg-gradient-to-r from-livrr-green to-livrr-blue"></span>
                </h1>
                
                <p className="text-lg text-livrr-gray-dark mb-8">
                  An AI-powered algorithm that connects to your wearables and smartphone to make your life healthier with minimal screen time. Say goodbye to mindless scrolling and hello to mindful living.
                </p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <a 
                    href="#features" 
                    className="button-primary"
                  >
                    Explore Features
                  </a>
                  
                  <a 
                    href="#early-access" 
                    className="button-secondary"
                  >
                    Get Early Access
                  </a>
                </div>
              </div>
              
              <div className="md:w-1/2 relative">
                <div className="relative z-10 animation-float flex justify-center">
                  <img 
                    src="/lovable-uploads/ffde7008-ba37-42d6-8b1c-82590d605e0f.png" 
                    alt="Livrr Alpha Algorithm Visualization" 
                    className="rounded-lg shadow-2xl max-w-full h-auto object-contain max-h-[400px]"
                  />
                  
                  {/* Glow effect */}
                  <div className="absolute -z-10 inset-0 bg-gradient-to-br from-livrr-green/20 to-livrr-blue/20 blur-xl rounded-full transform scale-90 opacity-80"></div>
                  
                  {/* Animated elements */}
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-livrr-green rounded-full animate-ping"></div>
                    <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-livrr-blue rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-purple-500/50 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-500/10 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
          
          <WaveDivider position="bottom" waveColor="fill-white" />
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-livrr-green-dark mb-4">
                Powered By AI & Connected To Your Life
              </h2>
              <p className="text-lg text-livrr-gray-dark max-w-3xl mx-auto">
                Livrr α uses advanced algorithms to analyze your daily habits and provide personalized recommendations for a healthier lifestyle.
              </p>
            </div>
            
            <div 
              ref={featuresRef as React.RefObject<HTMLDivElement>}
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ${
                featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {alphaFeatures.map((feature, index) => (
                <div 
                  key={feature.title}
                  className="glass-card rounded-xl overflow-hidden shadow-md group hover:shadow-xl transition-all"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="p-8">
                    <div className={`w-16 h-16 mb-6 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center text-white`}>
                      {feature.icon}
                    </div>
                    
                    <h3 className="text-xl font-display font-semibold text-livrr-green-dark mb-3">{feature.title}</h3>
                    <p className="text-livrr-gray-dark">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-20 bg-livrr-beige/10">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-livrr-green-dark mb-4">
                How Livrr α Works
              </h2>
              <p className="text-lg text-livrr-gray-dark max-w-3xl mx-auto">
                Our algorithm integrates seamlessly with your digital ecosystem
              </p>
            </div>
            
            {/* Replace the Algorithm Flow Diagram with FeatureFlow */}
            <FeatureFlow />
            
            {/* Key metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {keyMetrics.map((metric, index) => (
                <div 
                  key={index}
                  className="glass-card text-center p-6 rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <div className="bg-gradient-to-r from-livrr-green/20 to-livrr-blue/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-livrr-green">
                    {metric.icon}
                  </div>
                  <h3 className="text-3xl font-display font-bold text-livrr-green-dark bg-gradient-to-r from-livrr-green to-livrr-blue bg-clip-text text-transparent">{metric.value}</h3>
                  <p className="text-livrr-gray-dark text-sm">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Use Cases */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-livrr-green-dark mb-4">
                Transform Your Digital Lifestyle
              </h2>
              <p className="text-lg text-livrr-gray-dark max-w-3xl mx-auto">
                Discover how Livrr α helps you maintain a healthy relationship with technology
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div className="glass-card p-8 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-livrr-green/10 to-transparent rounded-bl-full"></div>
                
                <h3 className="text-2xl font-display font-semibold text-livrr-green-dark mb-4">Before Livrr α</h3>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="bg-red-100 text-red-600 p-1 rounded mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                    <span>3+ hours daily spent mindlessly scrolling through social media</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-red-100 text-red-600 p-1 rounded mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                    <span>Constant digital distractions preventing deep work and focus</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-red-100 text-red-600 p-1 rounded mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                    <span>Tech-induced anxiety and disrupted sleep patterns</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-red-100 text-red-600 p-1 rounded mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                    <span>Disconnected health tracking data across multiple apps</span>
                  </li>
                </ul>
              </div>
              
              <div className="glass-card p-8 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-livrr-blue/10 to-transparent rounded-bl-full"></div>
                
                <h3 className="text-2xl font-display font-semibold text-livrr-blue mb-4">After Livrr α</h3>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-600 p-1 rounded mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Mindful screen time with intelligent alerts when you're scrolling too long</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-600 p-1 rounded mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Scheduled focus time and digital wellness breaks throughout the day</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-600 p-1 rounded mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Improved sleep quality through evening device usage optimization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-600 p-1 rounded mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Unified health dashboard combining data from all your devices</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Early Access */}
        <section id="early-access" className="py-20 bg-livrr-beige/10">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-livrr-green-dark mb-6">
                Get Early Access to Livrr α
              </h2>
              <p className="text-lg text-livrr-gray-dark mb-6">
                Join our exclusive beta testing program and be among the first to experience the future of digital wellness.
              </p>
              
              <div className="bg-gradient-to-r from-livrr-green/10 to-livrr-blue/10 p-8 rounded-xl mb-12">
                <h3 className="text-2xl font-display font-semibold text-livrr-green-dark mb-4">
                  Limited Spots Available
                </h3>
                <p className="mb-8">
                  We're selecting a small group of users to test and provide feedback on Livrr α. Sign up now to secure your spot.
                </p>
                
                <Link 
                  to="/#waitlist" 
                  className="button-primary px-8 py-3 text-lg"
                >
                  Join The Waitlist
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="bg-white/80 p-6 rounded-xl shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-livrr-green/10 flex items-center justify-center text-livrr-green mr-3">
                      <span className="font-bold">1</span>
                    </div>
                    <h4 className="font-semibold text-livrr-gray-dark">Sign Up</h4>
                  </div>
                  <p className="text-sm text-livrr-gray">Join our waitlist to be considered for the beta program</p>
                </div>
                
                <div className="bg-white/80 p-6 rounded-xl shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-livrr-green/10 flex items-center justify-center text-livrr-green mr-3">
                      <span className="font-bold">2</span>
                    </div>
                    <h4 className="font-semibold text-livrr-gray-dark">Get Selected</h4>
                  </div>
                  <p className="text-sm text-livrr-gray">If chosen, you'll receive an invitation with installation instructions</p>
                </div>
                
                <div className="bg-white/80 p-6 rounded-xl shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-livrr-green/10 flex items-center justify-center text-livrr-green mr-3">
                      <span className="font-bold">3</span>
                    </div>
                    <h4 className="font-semibold text-livrr-gray-dark">Experience Livrr α</h4>
                  </div>
                  <p className="text-sm text-livrr-gray">Install the app, connect your devices, and transform your digital life</p>
                </div>
              </div>
            </div>
            
            <Waitlist />
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-livrr-green-dark mb-4">
                Early Tester Feedback
              </h2>
              <p className="text-lg text-livrr-gray-dark max-w-3xl mx-auto">
                Here's what our initial users are saying about Livrr α
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="glass-card p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src="https://media.istockphoto.com/id/2104018711/photo/smiling-young-woman-close-up-portrait.jpg?s=612x612&w=0&k=20&c=sZ_FzUpd_NnsBm2seJBVZDG-FLlK2jCRg-n0q2C7vfY=" 
                      alt="Testimonial user" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-livrr-green-dark">Sarah K.</h4>
                    <p className="text-xs text-livrr-gray">Digital Marketer, 34</p>
                  </div>
                </div>
                <p className="text-livrr-gray-dark italic">
                  "Livrr α has completely changed my relationship with my phone. I'm saving at least 2 hours daily that I used to waste on social media."
                </p>
                <div className="flex mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src="https://media.istockphoto.com/id/2167806033/photo/confident-young-professional-smiling-at-desk-in-modern-office-setting.jpg?s=612x612&w=0&k=20&c=Km-4vURozAfdUAp2azaIVwRs0Vwon1-wIzu2MNFptLg=" 
                      alt="Testimonial user" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-livrr-green-dark">Michael T.</h4>
                    <p className="text-xs text-livrr-gray">Software Engineer, 28</p>
                  </div>
                </div>
                <p className="text-livrr-gray-dark italic">
                  "The API integration is brilliant. I connected all my devices and now have a complete picture of my health and digital habits in one place."
                </p>
                <div className="flex mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src="https://media.istockphoto.com/id/1061968352/photo/joyful-sporty-woman.jpg?s=612x612&w=0&k=20&c=1eYO6DOUua81jPLCaRXVvmzPea4azLjAWAr6Ug6tkzU=" 
                      alt="Testimonial user" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                    
                  <div className="ml-4">
                    <h4 className="font-semibold text-livrr-green-dark">Jennifer L.</h4>
                    <p className="text-xs text-livrr-gray">Yoga Instructor, 41</p>
                  </div>
                </div>
                <p className="text-livrr-gray-dark italic">
                  "The mindful alerts are game-changing. I no longer find myself endlessly scrolling. My screen time is down 65% and I feel so much more present!"
                </p>
                <div className="flex mt-4">
                  {[1, 2, 3, 4, 5].map((star, index) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${index < 4 ? 'text-yellow-500' : 'text-yellow-300'}`} viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LivrrAlpha;