import React from 'react';
import { motion } from 'framer-motion';

const Articles: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6 text-gray-800 leading-relaxed">
      {/* Animated Title */}
      <motion.h1 
        className="text-4xl font-bold mb-8 text-livrr-green-dark"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        The Importance of Health Tracking for Longevity
      </motion.h1>

      {/* Image Section */}
      <motion.img 
        src="https://source.unsplash.com/featured/?fitness,health" 
        alt="Health Tracking" 
        className="rounded-xl w-full mb-8 shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <motion.p 
        className="mb-6 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        In today’s fast-paced world, taking care of your health has become more important than ever.
        With increasing lifestyle diseases and stress levels, people are looking for smart ways to track their health and fitness.
      </motion.p>

      <motion.p 
        className="mb-6 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 1 }}
      >
        From wearable fitness devices to AI-driven health apps, technology is now an integral part of personal healthcare.
        Tracking your sleep, heart rate, and activity helps you understand your body better and stay healthy.
      </motion.p>

      {/* Benefits Section with Animation */}
      <motion.h2 
        className="text-2xl font-semibold mt-8 mb-4"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Benefits of Regular Health Tracking
      </motion.h2>

      <motion.ul 
        className="list-disc list-inside mb-6 space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <li>Early detection of potential health issues</li>
        <li>Better awareness of your fitness progress</li>
        <li>Improved motivation to maintain healthy habits</li>
        <li>Data-driven consultations with healthcare professionals</li>
      </motion.ul>

      {/* Animated Related Image */}
      <motion.img 
        src="https://source.unsplash.com/featured/?healthcare" 
        alt="Healthcare Technology" 
        className="rounded-xl w-full mb-8 shadow-lg"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <motion.h2 
        className="text-2xl font-semibold mt-8 mb-4"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        How Livrr Helps You Stay on Track
      </motion.h2>

      <motion.p 
        className="mb-6 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        At <span className="font-bold">Livrr</span>, we believe health tracking is the first step toward longevity.
        Our platform offers tools for monitoring fitness, connecting with experts, and accessing organic food solutions.
      </motion.p>

      <motion.p 
        className="text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 1 }}
      >
        Join the <span className="font-bold">Livrr Tribe</span> and take control of your health. 
        Because a longer, healthier life starts with the choices you make today.
      </motion.p>
    </div>
  );
};

export default Articles;
