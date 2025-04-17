import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Loader2 } from "lucide-react";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export default function BlogSummary() {
  const [content, setContent] = useState("");
  const [length, setLength] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const generateSummary = async () => {
    try {
      setLoading(true);
      setError("");

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `Summarize the following blog post in a ${length} length summary:
        "${content}"
        Make the summary engaging and capture the main points.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setResult(text);
    } catch (err) {
      setError("Failed to generate summary. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-900 rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Blog Summarizer</h2>

        <div className="space-y-6">
          {/* Blog Content Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Blog Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your blog content here"
              rows={10}
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Summary Length Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Summary Length
            </label>
            <select
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="short">Short</option>
              <option value="medium">Medium</option>
              <option value="long">Long</option>
            </select>
          </div>

          {/* Generate Summary Button */}
          <button
            onClick={generateSummary}
            disabled={loading || !content}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </span>
            ) : (
              "Generate Summary"
            )}
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8">
          {error}
        </div>
      )}

      {/* Result Display */}
      {result && (
        <div className="bg-gray-900 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-xl font-semibold mb-4">Generated Summary</h3>
          <div className="prose max-w-none text-gray-300">
            {result.split("\n").map((line, index) => (
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
