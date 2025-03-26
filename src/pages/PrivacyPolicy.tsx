import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-livrr-beige/10 flex flex-col">
      <CustomCursor />
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <div className="container max-w-3xl px-6 md:px-0">
          {/* Back to Home Link */}
          <Link to="/" className="flex items-center gap-2 text-livrr-green hover:underline mb-8">
            <ArrowLeft className="h-5 w-5" />
            <span className="text-lg font-medium">Back to Home</span>
          </Link>

          {/* Page Title */}
          <h1 className="text-4xl font-bold text-livrr-green-dark mb-8 leading-tight">
            Privacy Policy
          </h1>

          {/* Content Section */}
          <div className="prose prose-green max-w-none space-y-8 text-gray-700">
            <p>
              At Livrr, we are committed to protecting your privacy and ensuring transparency in how we collect, use, and safeguard your data.
              This Privacy Policy outlines the types of personal information we collect and how we use it.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-livrr-green-dark mb-4">What Information We Collect</h2>
              <p>We may collect the following types of information when you use our services:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Information:</strong> Name, email address, phone number, and other contact details.</li>
                <li><strong>Usage Data:</strong> Information on how you interact with our website, such as pages visited and time spent.</li>
                <li><strong>Health & Fitness Data:</strong> If you use our health-tracking features, we may collect related insights to enhance recommendations.</li>
                <li><strong>Payment Information:</strong> If you make a purchase, payment details are securely processed through third-party providers.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-livrr-green-dark mb-4">How We Use Your Data</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and improve our services.</li>
                <li>To personalize user experience and offer relevant recommendations.</li>
                <li>To ensure security and prevent fraud.</li>
                <li>To communicate updates, offers, and important service notifications.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-livrr-green-dark mb-4">Data Security & Compliance</h2>
              <p>
                We prioritize the security of your personal information. Our systems follow industry best practices, including encryption and secure storage,
                to protect your data from unauthorized access. We comply with applicable data protection laws, including GDPR where applicable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-livrr-green-dark mb-4">Your Rights & Choices</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access, update, or delete your data upon request.</li>
                <li>Opt-out of marketing emails at any time.</li>
                <li>Control cookie preferences through our cookie settings tool.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-livrr-green-dark mb-4">Third-Party Services</h2>
              <p>
                We may share your data with trusted third-party services for analytics, marketing, or payment processing. We ensure all partners adhere to
                strict privacy and security standards.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-livrr-green-dark mb-4">Contact Us</h2>
              <p>
                If you have any questions about our Privacy Policy, please email us at
                <a href="mailto:privacy@livrr.com" className="text-livrr-green hover:underline"> privacy@livrr.in</a>.
              </p>
              <p className="text-sm text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
