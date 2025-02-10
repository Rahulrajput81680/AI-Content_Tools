import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Loader2 } from 'lucide-react';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export default function BlogContent() {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [tone, setTone] = useState('professional');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const generateContent = async () => {
    try {
      setLoading(true);
      setError('');
      
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `Write a blog post about "${topic}". 
        Include these keywords: ${keywords}.
        Use a ${tone} tone.
        Format the content with proper headings, paragraphs, and make it engaging.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      setResult(text);
    } catch (err) {
      setError('Failed to generate content. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-900 rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          Blog Content Generator
        </h2>
        
        <div className="space-y-6">
          {/* Blog Topic Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Blog Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter your blog topic"
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Keywords Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Keywords (comma-separated)
            </label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Enter keywords"
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Tone Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tone
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="formal">Formal</option>
              <option value="friendly">Friendly</option>
            </select>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateContent}
            disabled={loading || !topic}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </span>
            ) : (
              'Generate Content'
            )}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8">
          {error}
        </div>
      )}

      {/* Generated Content Display */}
      {result && (
        <div className="bg-gray-900 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-xl font-semibold mb-4">
            Generated Content
          </h3>
          <div className="prose max-w-none text-gray-300">
            {result.split('\n').map((line, index) => (
              <p key={index} className="mb-4">
                {line}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
