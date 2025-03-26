import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookiesPolicy = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-livrr-beige/10 text-gray-800">
      <CustomCursor />
      <Navbar />

      <main className="pt-28 pb-20 flex justify-center">
        <div className="container max-w-3xl bg-white p-8 rounded-lg shadow-lg">
          <Link to="/" className="flex items-center gap-2 text-livrr-green hover:underline mb-6">
            <ArrowLeft className="h-5 w-5" />
            <span className="text-lg font-medium">Back to Home</span>
          </Link>

          <h1 className="text-4xl font-display font-bold mb-8 text-livrr-green-dark text-center">
            Cookie Policy
          </h1>

          <div className="prose prose-green max-w-none leading-relaxed text-lg">
            <p>
              This Cookie Policy explains how Livrr ("we", "us", and "our") uses cookies and similar technologies.
            </p>

            {/* What are Cookies? */}
            <div className="mt-6">
              <h2 className="text-2xl font-semibold flex justify-between items-center">
                What are cookies?
                <button onClick={() => toggleSection('cookies')} className="text-livrr-green">
                  {expandedSections['cookies'] ? <ChevronUp /> : <ChevronDown />}
                </button>
              </h2>
              <p>
                Cookies are small data files placed on your computer or mobile device when you visit a website.
              </p>
              {expandedSections['cookies'] && (
                <p>
                  They help website owners make their websites work efficiently, track site usage, and improve user experience. 
                  Some cookies store preferences, while others enhance security and marketing efforts.
                </p>
              )}
            </div>

            {/* Why do we use cookies? */}
            <div className="mt-6">
              <h2 className="text-2xl font-semibold flex justify-between items-center">
                Why do we use cookies?
                <button onClick={() => toggleSection('why')} className="text-livrr-green">
                  {expandedSections['why'] ? <ChevronUp /> : <ChevronDown />}
                </button>
              </h2>
              <p>We use cookies for several reasons, including website functionality and analytics.</p>
              {expandedSections['why'] && (
                <p>
                  Cookies help us provide a smooth browsing experience, personalize content, and analyze website performance.
                  Third-party cookies are used for advertisements and social media features.
                </p>
              )}
            </div>

            {/* Types of cookies */}
            <div className="mt-6">
              <h2 className="text-2xl font-semibold flex justify-between items-center">
                Types of cookies we use
                <button onClick={() => toggleSection('types')} className="text-livrr-green">
                  {expandedSections['types'] ? <ChevronUp /> : <ChevronDown />}
                </button>
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Necessary cookies:</strong> Essential for website functionality.</li>
                {expandedSections['types'] && (
                  <>
                    <li><strong>Analytics cookies:</strong> Help us track user behavior and improve the website.</li>
                    <li><strong>Marketing cookies:</strong> Used for personalized ads and promotions.</li>
                  </>
                )}
              </ul>
            </div>

            {/* How to control cookies? */}
            <div className="mt-6">
              <h2 className="text-2xl font-semibold flex justify-between items-center">
                How can you control cookies?
                <button onClick={() => toggleSection('control')} className="text-livrr-green">
                  {expandedSections['control'] ? <ChevronUp /> : <ChevronDown />}
                </button>
              </h2>
              <p>You can manage cookie settings through your browser or our consent tool.</p>
              {expandedSections['control'] && (
                <p>
                  Different browsers provide options to block or delete cookies. You may also disable targeted ads through industry-standard opt-out programs.
                </p>
              )}
            </div>

            {/* Contact us */}
            <div className="mt-6">
              <h2 className="text-2xl font-semibold flex justify-between items-center">
                Contact us
                <button onClick={() => toggleSection('contact')} className="text-livrr-green">
                  {expandedSections['contact'] ? <ChevronUp /> : <ChevronDown />}
                </button>
              </h2>
              <p>
                If you have any questions, email us at 
                <a href="mailto:privacy@livrr.in" className="text-livrr-green hover:underline"> privacy@livrr.in</a>.
              </p>
              {expandedSections['contact'] && (
                <p>
                  Our team will be happy to assist you with any concerns related to our cookie usage and data policies.
                </p>
              )}
            </div>

            <p className="text-sm text-gray-500 mt-6 text-center">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CookiesPolicy;
