import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Loader2 } from "lucide-react";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export default function SocialPost() {
  const [content, setContent] = useState("");
  const [platform, setPlatform] = useState("twitter");
  const [tone, setTone] = useState("professional");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const generatePost = async () => {
    try {
      setLoading(true);
      setError("");

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const platformGuides = {
        twitter: "Keep it concise and engaging, use appropriate hashtags",
        linkedin:
          "Professional tone, industry-relevant hashtags, focus on value",
        facebook: "Conversational and engaging, can be longer form",
        instagram: "Visual description, engaging caption, relevant hashtags",
      };

      const prompt = `Convert the following content into a ${tone} social media post for ${platform}.
        Content: "${content}"
        
        Guidelines:
        - Follow ${platform} best practices
        - ${platformGuides[platform]}
        - Include relevant hashtags
        - Make it engaging and shareable
        
        Format the response with the post content first, followed by hashtags on a new line.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setResult(text);
    } catch (err) {
      setError("Failed to generate social post. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-900 rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          Social Post Generator
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter the content you want to convert into a social post"
              rows={6}
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="twitter">Twitter</option>
                <option value="linkedin">LinkedIn</option>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
              </select>
            </div>

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
                <option value="friendly">Friendly</option>
                <option value="humorous">Humorous</option>
              </select>
            </div>
          </div>

          <button
            onClick={generatePost}
            disabled={loading || !content}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </span>
            ) : (
              "Generate Social Post"
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8">
          {error}
        </div>
      )}

      {result && (
        <div className="bg-gray-900 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-xl font-semibold mb-4">Generated Social Post</h3>
          <div
            className="p-6 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
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
          <p className="text-sm text-gray-500 mt-4">
            Click on the post to copy it to your clipboard
          </p>
        </div>
      )}
    </div>
  );
}
