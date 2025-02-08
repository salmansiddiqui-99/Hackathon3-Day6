"use client";
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">About Us</h3>
          <p className="text-gray-400 text-sm">
            We are committed to providing the best quality products at affordable prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="text-gray-400 hover:text-green-500 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-gray-400 hover:text-green-500 transition">
                Products
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-gray-400 hover:text-green-500 transition">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-400 hover:text-green-500 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xl font-bold mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/help" className="text-gray-400 hover:text-green-500 transition">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="text-gray-400 hover:text-green-500 transition">
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-gray-400 hover:text-green-500 transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-gray-400 hover:text-green-500 transition">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" className="text-gray-400 hover:text-blue-500 transition text-2xl">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" className="text-gray-400 hover:text-blue-400 transition text-2xl">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" className="text-gray-400 hover:text-pink-500 transition text-2xl">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" className="text-gray-400 hover:text-blue-600 transition text-2xl">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-gray-500 text-sm mt-6">
        &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
