import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Loader2 } from "lucide-react";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export default function JobDescription() {
  const [title, setTitle] = useState("");
  const [requirements, setRequirements] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const generateDescription = async () => {
    try {
      setLoading(true);
      setError("");

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `Create a professional job description for the following position:
        Job Title: ${title}
        Company: ${company}
        Requirements: ${requirements}
        Responsibilities: ${responsibilities}

        Guidelines:
        - Start with an engaging company overview
        - Create clear sections for requirements and responsibilities
        - Include qualifications and experience needed
        - Add benefits and perks if applicable
        - Use professional but approachable language
        - Format for easy readability
        - Include a compelling call-to-action for applications`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setResult(text);
    } catch (err) {
      setError("Failed to generate job description. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-900 text-white p-6 rounded-xl shadow-lg">
      <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          Job Description Generator
        </h2>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Job Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter job title"
                className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Enter company name"
                className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-white placeholder-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Requirements
            </label>
            <textarea
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="Enter job requirements"
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-white placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Responsibilities
            </label>
            <textarea
              value={responsibilities}
              onChange={(e) => setResponsibilities(e.target.value)}
              placeholder="Enter job responsibilities"
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-white placeholder-gray-400"
            />
          </div>

          <button
            onClick={generateDescription}
            disabled={loading || !title || !requirements || !responsibilities}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </span>
            ) : (
              "Generate Job Description"
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
        <div className="bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            Generated Job Description
          </h3>
          <div
            className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
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
            Click on the job description to copy it to your clipboard
          </p>
        </div>
      )}
    </div>
  );
}
