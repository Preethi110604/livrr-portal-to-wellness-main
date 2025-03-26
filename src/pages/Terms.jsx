import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (index) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const terms = [
    {
      title: "1. Use of Services",
      summary: "Our platform is intended for lawful use only. Users must comply with all applicable laws...",
      fullContent: "Our platform is intended for lawful use only. Users must comply with all applicable laws and agree not to misuse our services for fraudulent activities, hacking, or spamming. Any unauthorized access, distribution of malicious content, or disruption of services will lead to immediate termination and possible legal action."
    },
    {
      title: "2. Account Registration",
      summary: "Users are required to provide accurate information while creating an account...",
      fullContent: "Users are required to provide accurate information while creating an account. Your login credentials must be kept secure, and you are solely responsible for any activity occurring under your account. If unauthorized access is detected, report it immediately. Livrr is not liable for any losses caused by negligence in protecting login details."
    },
    {
      title: "3. Intellectual Property",
      summary: "All content, including logos, designs, and materials on Livrr, is our intellectual property...",
      fullContent: "All content, including logos, designs, and materials on Livrr, is our intellectual property or is licensed to us. Unauthorized reproduction, distribution, modification, or public display of our intellectual property is prohibited. Users must seek written permission for commercial use of any material available on our platform."
    },
    {
      title: "4. Payment & Transactions",
      summary: "All transactions must be made with valid and authorized payment details...",
      fullContent: "All transactions must be made with valid and authorized payment details. We use third-party payment gateways to process transactions securely. Any disputes regarding payments should be raised with the respective payment provider. Refund policies vary based on the type of purchase and will be outlined in separate refund policies."
    },
    {
      title: "5. Limitation of Liability",
      summary: "Livrr is not responsible for service interruptions, data loss, or unauthorized access...",
      fullContent: "Livrr is not responsible for service interruptions, data loss, or unauthorized access caused by external factors such as cyber-attacks, internet failures, or third-party service issues. While we take stringent security measures, users must also adopt best practices to secure their accounts and data."
    },
    {
      title: "6. Termination of Access",
      summary: "We reserve the right to suspend or terminate user accounts if terms are violated...",
      fullContent: "We reserve the right to suspend or terminate user accounts if terms are violated. Grounds for termination include but are not limited to fraudulent activities, harassment of other users, spamming, unauthorized transactions, or misuse of platform features. Suspended users may appeal for reinstatement by contacting support."
    },
    {
      title: "7. Updates to Terms",
      summary: "These terms may be updated periodically. Users will be notified of significant changes...",
      fullContent: "These terms may be updated periodically. Users will be notified of significant changes via email or on the platform. Continued use of our services after changes are made constitutes acceptance of the new terms. We encourage users to review this page regularly to stay informed."
    },
    {
      title: "8. Contact Us",
      summary: "For any questions regarding our Terms & Conditions, reach out via email...",
      fullContent: "For any questions regarding our Terms & Conditions, reach out via email at support@livrr.in. We aim to respond within 24-48 hours. Users may also visit our FAQ section for common inquiries related to services, transactions, and policies."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <CustomCursor />
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="container max-w-3xl bg-white shadow-lg rounded-2xl p-8">
          <Link to="/" className="flex items-center gap-2 text-livrr-green hover:underline mb-6" aria-label="Back to Home">
            <ArrowLeft className="h-5 w-5" />
            <span className="text-lg font-medium">Back to Home</span>
          </Link>

          <h1 className="text-4xl font-bold mb-6 text-livrr-green-dark text-center">Terms & Conditions</h1>

          <div className="prose prose-lg prose-green max-w-none leading-relaxed text-gray-800">
            <p className="text-lg">
              Welcome to <span className="font-semibold text-livrr-green">Livrr</span>. By accessing or using our services, you agree to be bound by these Terms & Conditions. Please read them carefully.
            </p>

            {terms.map((term, index) => (
              <div key={index} className="border-b border-gray-300 py-4">
                <h2 className="text-2xl font-semibold">{term.title}</h2>
                <p className="mt-2 text-gray-700">
                  {expandedSections[index] ? term.fullContent : term.summary}
                </p>
                <button
                  onClick={() => toggleSection(index)}
                  className="mt-2 flex items-center text-livrr-green font-medium hover:underline"
                >
                  {expandedSections[index] ? "Read Less" : "Read More"}
                  {expandedSections[index] ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
                </button>
              </div>
            ))}

            <p className="text-sm text-gray-600 mt-6">Last updated: {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date())}</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
