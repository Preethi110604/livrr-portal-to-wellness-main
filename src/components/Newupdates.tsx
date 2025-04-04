import React from "react";
import Navbar from '@/components/Navbar';   
import Footer from '@/components/Footer';

const NewUpdates = () => {
  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Latest Updates</h1>
          <p className="text-lg text-gray-600">
            🌟 <strong>Get the new updates here!</strong> <br />
            Stay informed with the latest news and exciting features coming to Livrr. 
            Check back frequently for more updates.
          </p>
        </div>
      </main>
    </div>
  );
};

export default NewUpdates;
