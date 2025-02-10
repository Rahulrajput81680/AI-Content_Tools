import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Wand2, BookText, Layout, Type, Share2, Megaphone, Video, Briefcase } from 'lucide-react';
import BlogContent from './components/BlogContent';
import BlogSummary from './components/BlogSummary';
import BlogTitle from './components/BlogTitle';
import SocialPost from './components/SocialPost';
import Advertisement from './components/Advertisement';
import VideoDescription from './components/VideoDescription';
import VideoTitle from './components/VideoTitle';
import JobDescription from './components/JobDescription';
import { motion } from 'framer-motion';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <header className="bg-gray-800 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3">
                <Wand2 className="w-8 h-8 text-indigo-400 animate-pulse" />
                <h1 className="text-2xl font-bold text-gray-100">AI Content Tools</h1>
              </Link>
              <nav className="flex flex-wrap gap-6">
                {navLinks.map(({ path, icon: Icon, label }) => (
                  <Link
                    key={path}
                    to={path}
                    className="flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog-title" element={<BlogTitle />} />
            <Route path="/blog-content" element={<BlogContent />} />
            <Route path="/blog-summary" element={<BlogSummary />} />
            <Route path="/social-post" element={<SocialPost />} />
            <Route path="/advertisement" element={<Advertisement />} />
            <Route path="/video-description" element={<VideoDescription />} />
            <Route path="/video-title" element={<VideoTitle />} />
            <Route path="/job-description" element={<JobDescription />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

const navLinks = [
  { path: '/blog-title', icon: Type, label: 'Blog Title' },
  { path: '/blog-content', icon: Layout, label: 'Blog Content' },
  { path: '/blog-summary', icon: BookText, label: 'Blog Summary' },
  { path: '/social-post', icon: Share2, label: 'Social Post' },
  { path: '/advertisement', icon: Megaphone, label: 'Advertisement' },
  { path: '/video-description', icon: Video, label: 'Video Description' },
  { path: '/video-title', icon: Type, label: 'Video Title' },
  { path: '/job-description', icon: Briefcase, label: 'Job Description' }
];

function Home() {
  return (
    <div className="text-center">
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
              <h3 className="text-2xl font-semibold text-gray-100 mb-4">{title}</h3>
              <p className="text-gray-400">{description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const homeLinks = [
  {
    path: '/blog-title',
    icon: Type,
    title: 'Blog Title Generator',
    description: 'Create captivating blog titles that grab attention and drive engagement.'
  },
  {
    path: '/blog-content',
    icon: Layout,
    title: 'Blog Content Generator',
    description: 'Transform your ideas into polished blog posts with ease using our AI tool.'
  },
  {
    path: '/blog-summary',
    icon: BookText,
    title: 'Blog Summarizer',
    description: 'Generate concise summaries of your blog posts for quick previews.'
  },
  {
    path: '/social-post',
    icon: Share2,
    title: 'Social Post Generator',
    description: 'Convert your content into engaging social media posts for any platform.'
  },
  {
    path: '/advertisement',
    icon: Megaphone,
    title: 'Advertisement Generator',
    description: 'Create compelling promotional content that converts and drives results.'
  },
  {
    path: '/video-description',
    icon: Video,
    title: 'Video Description Generator',
    description: 'Generate engaging video descriptions that improve visibility and engagement.'
  },
  {
    path: '/video-title',
    icon: Type,
    title: 'Video Title Generator',
    description: 'Create attention-grabbing video titles that increase views and clicks.'
  },
  {
    path: '/job-description',
    icon: Briefcase,
    title: 'Job Description Generator',
    description: 'Create professional job descriptions that attract top talent.'
  }
];

export default App;
