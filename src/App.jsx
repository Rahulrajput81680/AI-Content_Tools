// src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";

import {
  Wand2,
  BookText,
  Layout,
  Type,
  Share2,
  Megaphone,
  Video,
  Briefcase,
} from "lucide-react";

import { motion } from "framer-motion";
import BlogContent from "./components/BlogContent";
import BlogSummary from "./components/BlogSummary";
import BlogTitle from "./components/BlogTitle";
import SocialPost from "./components/SocialPost";
import Advertisement from "./components/Advertisement";
import VideoDescription from "./components/VideoDescription";
import VideoTitle from "./components/VideoTitle";
import JobDescription from "./components/JobDescription";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import { auth } from "./components/firebase";
import Footer from "./components/Footer";
import WhyUse from "./components/WhyUse";
import homeLinks from "./components/homeLinks";
import Profile from "./pages/Profile";
import History from "./pages/History";
import AboutUs from "./pages/AboutUs";
import HeroSection from "./components/HeroSection";
import Testimonials from "./components/Testimonials";
import Faq from "./pages/Faq";
import Navbar from "./pages/Navbar";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p className="text-center text-white mt-10">Checking auth...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar user={user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/blog-title" element={<BlogTitle />} />
          <Route path="/blog-content" element={<BlogContent />} />
          <Route path="/blog-summary" element={<BlogSummary />} />
          <Route path="/social-post" element={<SocialPost />} />
          <Route path="/advertisement" element={<Advertisement />} />
          <Route path="/video-description" element={<VideoDescription />} />
          <Route path="/video-title" element={<VideoTitle />} />
          <Route path="/job-description" element={<JobDescription />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              user ? <Dashboard user={user} /> : <Navigate to="/login" />
            }
          />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/history" element={<History user={user} />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/HeroSection" element={<HeroSection />} />
          <Route path="/Testimonials" element={<Testimonials />} />
          <Route path="/faq" element={<Faq />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

const navLinks = [
  { path: "/blog-title", icon: Type, label: "Blog Title" },
  { path: "/blog-content", icon: Layout, label: "Blog Content" },
  { path: "/blog-summary", icon: BookText, label: "Blog Summary" },
  { path: "/social-post", icon: Share2, label: "Social Post" },
  { path: "/advertisement", icon: Megaphone, label: "Advertisement" },
  { path: "/video-description", icon: Video, label: "Video Description" },
  { path: "/video-title", icon: Type, label: "Video Title" },
  { path: "/job-description", icon: Briefcase, label: "Job Description" },
];

// ✅ Fixed Home Component: accepts user as a prop
function Home({ user }) {
  return (
    <div className="text-center" id="hero">
      <HeroSection />
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

      <WhyUse />
      <Testimonials />
      <Faq />
      <Footer />
    </div>
  );
}
