import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react"; // Removed X logo

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white py-12 border-t border-gray-200">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div>
            <Link to="/" className="text-2xl font-display font-bold text-gray-800 inline-block mb-4">
              Livrr
            </Link>
            <p className="text-black-600 mb-6 max-w-xs">
              Promoting longevity through health tracking, fitness assistance, and organic food solutions.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" 
                 aria-label="Instagram" className="bg-green-100 p-3 rounded-full">
                <Instagram className="w-5 h-5 text-green-500 hover:text-green-600" />
              </a>
              <a href="https://x.com/livrr120670" target="_blank" rel="noopener noreferrer" 
                 aria-label="X" className="bg-green-100 p-3 rounded-full">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRVwZBEMnIwfmobAi3FTHaWSBhfc7JAipu4w&s" 
                     alt="X Logo" className="w-5 h-5" />
              </a>
              <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" 
                 aria-label="Facebook" className="bg-green-100 p-3 rounded-full">
                <Facebook className="w-5 h-5 text-green-500 hover:text-green-600" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-gray-700 mb-4 font-semibold">Company</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link to="/about" className="hover:text-gray-800">About Us</Link></li>
              <li><Link to="/press" className="hover:text-gray-800">Press</Link></li>
              <li><Link to="/articles" className="hover:text-gray-800">Articles</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-700 mb-4 font-semibold">Features</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link to="/livrr-alpha#health-tracking" className="hover:text-gray-800">Health Tracking</Link></li>
              <li><Link to="/longi" className="hover:text-gray-800">Fitness Assistance</Link></li>
              <li><Link to="/products" className="hover:text-gray-800">Organic Marketplace</Link></li>
              <li><Link to="/liver-ai" className="hover:text-gray-800">Doctor Consultations</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-700 mb-4 font-semibold">Join Us</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link to="/livrr-tribe" className="hover:text-gray-800">Livrr Tribe</Link></li>
              <li><Link to="#" className="hover:text-gray-800">#LivrrTribe Movement</Link></li>
              <li>
                <a href="#" className="flex items-center gap-1 text-gray-600 hover:text-gray-800">
                  <Instagram className="w-4 h-4" />
                  <span>@livrrtribe</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-black-600 text-sm mb-4 md:mb-0">
            © {currentYear} Livrr. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-black-600 hover:text-black-800">Privacy Policy</Link>
            <Link to="/terms" className="text-black-600 hover:text-black-800">Terms</Link>
            <Link to="/cookies-policy" className="text-black-600 hover:text-black-800">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
