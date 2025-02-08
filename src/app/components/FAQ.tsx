"use client";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqData = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept Visa, MasterCard, PayPal, and bank transfers.",
  },
  {
    question: "How long does shipping take?",
    answer: "Shipping usually takes 5-7 business days for domestic orders.",
  },
  {
    question: "Can I return a product?",
    answer: "Yes, we offer a 30-day return policy. Contact our support team for assistance.",
  },
  {
    question: "Do you offer customer support?",
    answer: "Yes! Our support team is available 24/7 via email and live chat.",
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <button
              className="flex justify-between w-full text-lg font-medium text-left text-gray-800"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {openIndex === index && <p className="mt-3 text-gray-600">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
