// src/components/Footer.jsx
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10 px-4 mt-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-start">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">
            AI Content Tools
          </h3>
          <p className="text-sm">
            Revolutionize your content creation with AI-powered tools. Generate
            blogs, summaries, video titles, and much more in seconds!
          </p>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Newsletter</h3>
          <p className="text-sm mb-2">
            Stay updated with the latest features and offers.
          </p>
          <form className="flex flex-col sm:flex-row items-center gap-2 mt-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded bg-black-800 text-black focus:outline-none"
            />
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded text-white text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
          <div className="flex gap-4 text-indigo-400 text-xl">
            <a href="#" aria-label="Facebook">
              <FaFacebookF className="hover:text-white transition-colors" />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter className="hover:text-white transition-colors" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedinIn className="hover:text-white transition-colors" />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram className="hover:text-white transition-colors" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div className="text-center mt-10 border-t border-gray-700 pt-6 text-sm">
        © {new Date().getFullYear()} AI Content Tools. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
