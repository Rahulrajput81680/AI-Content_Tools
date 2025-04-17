import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Loader2 } from "lucide-react";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export default function VideoTitle() {
  const [content, setContent] = useState("");
  const [style, setStyle] = useState("engaging");
  const [loading, setLoading] = useState(false);
  const [titles, setTitles] = useState([]);
  const [error, setError] = useState("");

  const generateTitles = async () => {
    try {
      setLoading(true);
      setError("");

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `Generate 5 ${style} video titles for the following content:
        "${content}"
        
        Guidelines:
        - Make them attention-grabbing
        - Optimize for search (SEO-friendly)
        - Keep them concise but descriptive
        - Include numbers or power words where appropriate
        - Make them clickable but not clickbait
        
        Format the response as a numbered list.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const titleList = text
        .split("\n")
        .filter((line) => line.trim().length > 0)
        .map((line) => line.replace(/^\d+\.\s*/, "").trim());

      setTitles(titleList);
    } catch (err) {
      setError("Failed to generate video titles. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-900 text-white p-6 rounded-xl shadow-lg">
      <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          Video Title Generator
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Video Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe your video content"
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-white placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title Style
            </label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-white"
            >
              <option value="engaging">Engaging</option>
              <option value="educational">Educational</option>
              <option value="entertaining">Entertaining</option>
              <option value="tutorial">Tutorial</option>
              <option value="vlog">Vlog</option>
            </select>
          </div>

          <button
            onClick={generateTitles}
            disabled={loading || !content}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </span>
            ) : (
              "Generate Titles"
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
        <div className="bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            Generated Video Titles
          </h3>
          <div className="space-y-4">
            {titles.map((title, index) => (
              <div
                key={index}
                className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                onClick={() => navigator.clipboard.writeText(title)}
                title="Click to copy"
              >
                <p className="text-gray-300 font-medium">{title}</p>
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
