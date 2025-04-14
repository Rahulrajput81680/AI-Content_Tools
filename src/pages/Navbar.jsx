// src/components/Navbar.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../components/firebase";
import { Wand2, UserCircle, History } from "lucide-react";
import { FaSignOutAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleSignOut = () => {
    auth.signOut();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <Wand2 className="w-8 h-8 text-indigo-400 animate-pulse" />
          <h1 className="text-2xl font-bold text-gray-100">AI Content Tools</h1>
        </Link>

        <nav className="flex gap-6 items-center relative">
          <a
            href="/#hero"
            className="text-gray-400 hover:text-indigo-400 transition-colors"
          >
            Generate Content
          </a>
          <Link
            to="/about-us"
            className="text-gray-400 hover:text-indigo-400 transition-colors"
          >
            About Us
          </Link>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <img
                src={user.photoURL || "/default-profile.png"}
                alt="Profile"
                onClick={toggleDropdown}
                className="w-10 h-10 rounded-full border-2 border-indigo-500 cursor-pointer hover:shadow-lg transition duration-300"
              />

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 p-4"
                  >
                    <p className="text-gray-300 font-semibold mb-3">
                      {user.displayName || "User"}
                    </p>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 text-gray-300 hover:text-indigo-400 py-1"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <UserCircle size={20} /> Profile
                    </Link>
                    <Link
                      to="/history"
                      className="flex items-center gap-2 text-gray-300 hover:text-indigo-400 py-1"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <History size={20} /> History
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 text-red-400 hover:text-red-500 py-2 mt-3 w-full"
                    >
                      <FaSignOutAlt size={16} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
              >
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
