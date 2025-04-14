// src/pages/AboutUs.jsx
import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-indigo-400 mb-6">About Us</h1>
        <p className="text-lg text-gray-300 mb-6">
          Welcome to{" "}
          <span className="text-white font-semibold">AI Content Tools</span>, a
          platform built to help creators, marketers, and entrepreneurs generate
          high-quality content effortlessly with the power of Artificial
          Intelligence.
        </p>
        <p className="text-gray-400 mb-4">
          Our goal is to save your time and boost your productivity by offering
          tools like Blog Title Generator, Blog Content Writer, Social Post
          Creator, Video Descriptions, and more. We believe that content
          creation should be fast, fun, and accessible to everyone.
        </p>
        <p className="text-gray-400 mb-8">
          Developed by a passionate team of tech enthusiasts, we are constantly
          working to add more features and improve user experience.
        </p>
        <p className="text-indigo-300 italic">
          Thank you for using our platform!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
