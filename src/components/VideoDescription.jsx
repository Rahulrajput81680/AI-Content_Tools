import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Loader2 } from "lucide-react";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export default function VideoDescription() {
  const [content, setContent] = useState("");
  const [keywords, setKeywords] = useState("");
  const [platform, setPlatform] = useState("youtube");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const generateDescription = async () => {
    try {
      setLoading(true);
      setError("");

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `Create an engaging video description for ${platform} with the following details:
        Video Content: ${content}
        Keywords: ${keywords}

        Guidelines:
        - Create an attention-grabbing first paragraph
        - Include relevant keywords naturally
        - Add appropriate timestamps for longer videos
        - Include relevant hashtags
        - Format for easy readability
        - Follow ${platform} best practices
        - Include a call-to-action`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setResult(text);
    } catch (err) {
      setError("Failed to generate video description. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-900 text-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-white">
        Video Description Generator
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
            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Keywords
          </label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="Enter keywords (comma-separated)"
            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Platform
          </label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-gray-300 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="youtube">YouTube</option>
            <option value="vimeo">Vimeo</option>
            <option value="tiktok">TikTok</option>
            <option value="instagram">Instagram</option>
          </select>
        </div>

        <button
          onClick={generateDescription}
          disabled={loading || !content}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating...
            </span>
          ) : (
            "Generate Description"
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-500 text-white p-4 rounded-lg mt-8">{error}</div>
      )}

      {result && (
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 mt-8">
          <h3 className="text-xl font-semibold text-white mb-4">
            Generated Video Description
          </h3>
          <div
            className="p-6 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors text-gray-300"
            onClick={() => navigator.clipboard.writeText(result)}
            title="Click to copy"
          >
            <div className="prose max-w-none text-gray-300">
              {result.split("\n").map((line, index) => (
                <p key={index} className="mb-4">
                  {line}
                </p>
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            Click on the description to copy it to your clipboard
          </p>
        </div>
      )}
    </div>
  );
}
