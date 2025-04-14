// src/components/Testimonials.jsx
import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "I almost couldn’t believe it was real! I shared the results with a friend who couldn’t believe it was written by AI. Worth every penny!",
    name: "Madesnappy",
    bg: "bg-purple-500",
  },
  {
    quote:
      "I've tried other AI writing tools before, but none compare to the speed and accuracy. It’s definitely the best AI writing tool out there!",
    name: "Abdi A. | G2",
    bg: "bg-red-600",
  },
  {
    quote:
      "Rytr has been an absolute game-changer for us. It helps us easily generate high-quality content on the go!",
    name: "Content Team",
    bg: "bg-green-600",
  },
  {
    quote:
      "Great value, easy to use, and saves so much time! I was shocked by how much brain energy it saved me.",
    name: "Happy User",
    bg: "bg-yellow-500",
  },
];

const Testimonials = () => {
  return (
    <div className="py-20 px-6 bg-gray-850 text-white">
      <motion.h2
        className="text-4xl font-bold text-indigo-400 text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        What Our Users Say
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {testimonials.map(({ quote, name, bg }, index) => (
          <motion.div
            key={index}
            className={`${bg} text-white rounded-3xl p-6 shadow-lg transition-transform`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <p className="text-lg font-medium mb-4">“{quote}”</p>
            <span className="text-sm font-semibold">{name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
