import React from "react";
import { motion } from "framer-motion";
import homeLinks from "./homeLinks";

import { Link } from "react-router-dom";

const Features = () => {
  return (
    <section className="text-center py-12">
      <motion.h2
        className="text-4xl font-bold text-indigo-400 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Transform Your Content with AI
      </motion.h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {homeLinks.map(({ path, icon: Icon, title, description }) => (
          <motion.div
            key={path}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-indigo-400 transition-shadow"
          >
            <Link to={path} className="block text-center">
              <Icon className="w-12 h-12 text-indigo-400 mx-auto mb-4 animate-bounce" />
              <h3 className="text-2xl font-semibold text-gray-100 mb-4">
                {title}
              </h3>
              <p className="text-gray-400">{description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
