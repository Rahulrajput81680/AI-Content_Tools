// src/pages/Dashboard.js
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../components/firebase";
import { useNavigate } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";

const Dashboard = ({ user }) => {
  const navigate = useNavigate();

  if (!user) {
    return <p className="text-center text-black mt-10">Loading...</p>;
  }

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-black">Welcome, {user.email}</h2>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/profile")}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Profile
          </button>
          <button
            onClick={() => navigate("/history")}
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          >
            History
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Features */}
      <h3 className="text-lg font-semibold text-black mb-4">AI Tools</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Public Features */}
        <FeatureCard title="Blog Title Generator" link="/blog-title" />
        <FeatureCard title="Blog Content Generator" link="/blog-content" />
        <FeatureCard title="Summary Generator" link="/blog-summary" />
        <FeatureCard title="Video Title Generator" link="/video-title" />
        <FeatureCard
          title="Video Description Generator"
          link="/video-description"
        />

        {/* Premium Features - only if user is logged in */}
        <FeatureCard title="SEO Keywords Generator" link="/seo-keywords" />
        <FeatureCard title="Hashtag Recommender" link="/hashtags" />
      </div>
    </div>
  );
};

export default Dashboard;
