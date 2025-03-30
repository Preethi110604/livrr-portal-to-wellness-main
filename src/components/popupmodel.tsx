import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Import for navigation
import { motion, AnimatePresence } from "framer-motion";

const PopupModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();  // Navigation hook

  // Automatically show the popup on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);  // Delay the popup slightly for smoother effect
    return () => clearTimeout(timer);
  }, []);

  // Handle navigation and close popup
  const handleJoinMovement = () => {
    setIsOpen(false);        // Close the popup
    setTimeout(() => {
      navigate("/livrr-tribe#join-movement");  // Navigate after closing
    }, 300);  // Slight delay to allow the popup closing animation
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl shadow-2xl max-w-lg w-full p-10 relative overflow-hidden border border-gray-200"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            {/* ✖️ Close button */}
            <motion.button
              type="button"
              aria-label="Close Popup"
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-all"
              onClick={() => setIsOpen(false)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              ✖️
            </motion.button>

            {/* Image Section */}
            <motion.div
              className="w-full h-64 overflow-hidden rounded-2xl"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <img
                src="https://media.istockphoto.com/id/1130376477/photo/world-health-day-symbolic-concept-with-map-on-healthy-nutritional-apple-with-doctors.jpg?s=612x612&w=0&k=20&c=JA5Fpl84R-QanYljfoIwToUqFmDNAZmPdyvk6Og-0wY="
                alt="World Health Day"
                className="w-full h-full object-cover rounded-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

            {/* Content Section */}
            <motion.div
              className="p-6 text-center"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h2 className="text-4xl font-extrabold text-green-600 mb-4">
                World Health Day
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                On April 7th, we celebrate health as a state of complete physical, 
                mental, and social well-being. This year’s theme, 
                <strong> "Healthy Beginnings, Hopeful Futures"</strong> emphasizes 
                the importance of prioritizing women's long-term health.
              </p>
              <p className="text-blue-600 mt-4 font-medium">
                <strong>Join hands with Livrr</strong>—because a better tomorrow begins with a healthier today! 
              </p>

              {/* CTA Button to Join the Movement */}
              <motion.button
                className="mt-6 px-8 py-3 bg-green-500 text-white font-bold rounded-full shadow-md hover:shadow-lg hover:bg-green-600 transition-all duration-300"
                onClick={handleJoinMovement}   
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                 Join the Movement
              </motion.button>

              {/* CTA Close Button */}
              <motion.button
                className="mt-6 px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupModal;
