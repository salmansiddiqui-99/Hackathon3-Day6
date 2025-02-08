"use client";
import React from "react";
import { FaEnvelope, FaPhone, FaComments } from "react-icons/fa";

const HelpCenter: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Help Center</h2>
      <p className="text-gray-600 text-center mb-6">
        Need assistance? Our support team is here to help. Choose your preferred contact method below.
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
          <FaEnvelope className="text-green-600 text-4xl mb-3" />
          <h3 className="text-lg font-bold text-gray-900">Email Support</h3>
          <p className="text-gray-600 text-sm mt-1">support@example.com</p>
        </div>

        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
          <FaPhone className="text-green-600 text-4xl mb-3" />
          <h3 className="text-lg font-bold text-gray-900">Call Us</h3>
          <p className="text-gray-600 text-sm mt-1">+1 (555) 123-4567</p>
        </div>

        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
          <FaComments className="text-green-600 text-4xl mb-3" />
          <h3 className="text-lg font-bold text-gray-900">Live Chat</h3>
          <p className="text-gray-600 text-sm mt-1">Available 24/7</p>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
