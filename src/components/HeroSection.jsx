import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import aiImage from "../assets/ai-chat-bubbles.jpeg";

const HeroSection = () => {
  return (
    <section className="bg-gray-900 text-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left content */}
        <motion.div
          className="md:w-1/2 space-y-6"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-extrabold leading-tight text-white">
            Create Smarter Content with <br />
            <span className="text-indigo-400">AI Power</span>
          </h1>
          <p className="text-lg text-gray-300">
            Instantly generate blogs, ads, and social posts that feel real — not
            robotic.
          </p>
          <Link
            to="/blog-title"
            className="inline-block px-8 py-3 bg-indigo-500 text-white font-semibold rounded-md shadow hover:bg-indigo-600 transition"
          >
            Generate Content
          </Link>
        </motion.div>

        {/* Right image/content */}
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={aiImage}
            alt="AI Illustration"
            className="w-[400px] rounded-xl shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
