import React from "react";
import { motion } from "framer-motion";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-white p-6">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <Link to="/" className="flex items-center gap-2 text-blue-600 hover:underline mb-6">
            <ArrowLeft className="h-5 w-5" />
            <span className="text-lg font-medium">Back to Home</span>
          </Link>
          
          {/* Page Title */}
          <motion.h1
            className="text-4xl font-bold text-center text-green-700 mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            About Livrr
          </motion.h1>

          {/* Hero Section */}
          <motion.div
            className="max-w-5xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <img
              src="https://media.istockphoto.com/id/1216605013/photo/side-view-of-nutritionist-working-with-laptop-at-clinic.jpg?s=612x612&w=0&k=20&c=WS13YBEoOHtxajQJ_7EYuVP-vLeVWv_HIAuAgGa5ka8="
              alt="About Livrr"
              className="rounded-2xl shadow-xl w-full"
            />
          </motion.div>

          {/* Our Story */}
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h2 className="text-2xl font-semibold text-green-800 mb-6">Our Story</h2>
            <p className="text-lg text-gray-700 mb-8">
              Livrr was born from a passion for health, wellness, and longevity. We aim to empower individuals to live their
              best lives through smart health tracking, fitness guidance, and organic lifestyle choices — all supported by
              cutting-edge technology.
            </p>
          </motion.div>

          {/* Our Mission Section */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            <img
              src="https://media.istockphoto.com/id/935274250/photo/womans-tied-hands-with-a-measuring-tape-and-an-apple-heart-shape-new-start-for-healthy.jpg?s=612x612&w=0&k=20&c=kRaTdLQVkSBf1UeBaUBdUMy8UOxCjvhxw3DjZUrfP5s="
              alt="Our Mission"
              className="rounded-2xl shadow-lg"
            />
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-700">
                Our mission is to inspire holistic well-being by blending tradition and technology. We believe in promoting
                a healthy lifestyle, supporting organic food habits, and creating a community focused on longevity and
                fitness excellence.
              </p>
            </div>
          </motion.div>

          {/* Meet the Team */}
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <h2 className="text-2xl font-semibold text-green-800 mb-6">Meet the Team</h2>
            <p className="text-lg text-gray-700 mb-10">
              Our dedicated team of health experts, fitness coaches, and tech enthusiasts is here to help you achieve your
              wellness goals.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-green-100 p-4 rounded-xl shadow-xl"
              >
                <img
                  src="/images/team1.jpg"
                  alt="Team Member 1"
                  className="rounded-lg mb-4"
                />
                <h3 className="font-semibold text-green-800">Ava Williams</h3>
                <p className="text-sm mt-2">Founder & Wellness Expert</p>
              </motion.div>

              {/* Team Member 2 */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-green-100 p-4 rounded-xl shadow-xl"
              >
                <img
                  src="/images/team2.jpg"
                  alt="Team Member 2"
                  className="rounded-lg mb-4"
                />
                <h3 className="font-semibold text-green-800">Liam Johnson</h3>
                <p className="text-sm mt-2">Tech Lead & AI Specialist</p>
              </motion.div>

              {/* Team Member 3 */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-green-100 p-4 rounded-xl shadow-xl"
              >
                <img
                  src="/images/team3.jpg"
                  alt="Team Member 3"
                  className="rounded-lg mb-4"
                />
                <h3 className="font-semibold text-green-800">Sophia Brown</h3>
                <p className="text-sm mt-2">Fitness Coach & Nutritionist</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
