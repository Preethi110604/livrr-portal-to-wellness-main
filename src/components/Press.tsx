import React from "react";
import { motion } from "framer-motion";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Press: React.FC = () => {
  return (
    <div className="min-h-screen bg-white p-6">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <Link to="/" className="flex items-center gap-2 text-blue-600 hover:underline mb-6">
            <ArrowLeft className="h-5 w-5" />
            <span className="text-lg font-medium">Back to Home</span>
          </Link>
          
          {/* Header */}
          <motion.h1
            className="text-4xl font-bold text-center text-green-700 mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Livrr Press & Media
          </motion.h1>

          {/* Hero Image */}
          <motion.img
            src="https://media.istockphoto.com/id/534758925/photo/ayurvedic-spa-massage-still-life.jpg?s=612x612&w=0&k=20&c=vjsBMISAkMZEoqZoplh9ApI_9rTSyCUmV83zHQsHNm4="
            alt="Livrr Media Coverage"
            className="rounded-2xl shadow-xl mx-auto mb-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
          />

          {/* Content Section */}
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <p className="text-lg mb-6 text-gray-700">
              Welcome to Livrr's Press Page! Here you’ll find our latest media releases, coverage, and company updates. 
              Livrr is dedicated to promoting longevity, health tracking, fitness assistance, and organic food solutions 
              through technology and community.
            </p>

            <p className="text-lg mb-6 text-gray-700">
              For media inquiries, interviews, or collaborations, please contact us at: 
              <span className="text-green-700 font-semibold"> press@livrr.com</span>
            </p>

            {/* Sample Articles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <motion.div 
                className="bg-green-100 p-4 rounded-xl shadow hover:scale-105 transition duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <img src="https://cdn.pixabay.com/photo/2018/10/09/20/15/tracker-3735862_640.jpg" alt="Media Feature 1" className="rounded-lg mb-4" />
                <h3 className="font-semibold text-green-800">TechTimes Health Innovation</h3>
                <p className="text-sm mt-2">Livrr featured for its AI-driven health tracking systems.</p>
              </motion.div>

              <motion.div 
                className="bg-green-100 p-4 rounded-xl shadow hover:scale-105 transition duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <img src="https://media.istockphoto.com/id/542826084/photo/menu-of-the-week-hot-pepper-onion-garlic-ginger.jpg?s=612x612&w=0&k=20&c=Wd-f47iDs8YkHVpPad838cT3SIlz4GfWhEPAfZNxD4s=" alt="Media Feature 2" className="rounded-lg mb-4" />
                <h3 className="font-semibold text-green-800">Organic Weekly</h3>
                <p className="text-sm mt-2">Recognized for promoting organic lifestyle and food solutions.</p>
              </motion.div>

              <motion.div 
                className="bg-green-100 p-4 rounded-xl shadow hover:scale-105 transition duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <img src="https://cdn.pixabay.com/photo/2013/02/26/02/14/exercise-86200_640.jpg" alt="Media Feature 3" className="rounded-lg mb-4" />
                <h3 className="font-semibold text-green-800">Fitness World</h3>
                <p className="text-sm mt-2">Highlighted for personalized fitness assistance and health goals.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Press;
