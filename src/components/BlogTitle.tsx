import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Loader2 } from 'lucide-react';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export default function BlogTitle() {
  const [topic, setTopic] = useState('');
  const [style, setStyle] = useState('engaging');
  const [loading, setLoading] = useState(false);
  const [titles, setTitles] = useState<string[]>([]);
  const [error, setError] = useState('');

  const generateTitles = async () => {
    try {
      setLoading(true);
      setError('');

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `Generate 5 ${style} blog titles for the following topic: "${topic}".
        Make them attention-grabbing and SEO-friendly.
        Format the response as a numbered list.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Split the text into an array of titles
      const titleList = text
        .split('\n')
        .filter(line => line.trim().length > 0)
        .map(line => line.replace(/^\d+\.\s*/, '').trim());

      setTitles(titleList);
    } catch (err) {
      setError('Failed to generate titles. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-900 rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          Blog Title Generator
        </h2>

        <div className="space-y-6">
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

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title Style
            </label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="engaging">Engaging</option>
              <option value="professional">Professional</option>
              <option value="creative">Creative</option>
              <option value="listicle">Listicle</option>
              <option value="how-to">How-to</option>
            </select>
          </div>

          <button
            onClick={generateTitles}
            disabled={loading || !topic}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </span>
            ) : (
              'Generate Titles'
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8">
          {error}
        </div>
      )}

      {titles.length > 0 && (
        <div className="bg-gray-900 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            Generated Titles
          </h3>
          <div className="space-y-4">
            {titles.map((title, index) => (
              <div
                key={index}
                className="p-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                onClick={() => navigator.clipboard.writeText(title)}
                title="Click to copy"
              >
                <p className="font-medium">{title}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-400 mt-4">
            Click on any title to copy it to your clipboard
          </p>
        </div>
      )}
    </div>
  );
}
