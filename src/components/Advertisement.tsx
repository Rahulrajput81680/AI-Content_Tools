import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Loader2 } from 'lucide-react';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export default function Advertisement() {
  const [product, setProduct] = useState('');
  const [target, setTarget] = useState('');
  const [platform, setPlatform] = useState('general');
  const [tone, setTone] = useState('professional');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const generateAd = async () => {
    try {
      setLoading(true);
      setError('');
      
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `Create a compelling advertisement for the following:
        Product/Service: ${product}
        Target Audience: ${target}
        Platform: ${platform}
        Tone: ${tone}

        Guidelines:
        - Create a headline that grabs attention
        - Write compelling body copy
        - Include a clear call-to-action
        - Highlight key benefits and unique selling points
        - Keep the language persuasive but authentic
        - Format with clear sections (Headline, Body, CTA)`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      setResult(text);
    } catch (err) {
      setError('Failed to generate advertisement. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-900 text-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">
        Advertisement Generator
      </h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Product or Service
          </label>
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="Describe your product or service"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Target Audience
          </label>
          <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Describe your target audience"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
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
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500"
            >
              <option value="general">General</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="google">Google Ads</option>
              <option value="print">Print Media</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tone
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500"
            >
              <option value="professional">Professional</option>
              <option value="friendly">Friendly</option>
              <option value="luxury">Luxury</option>
              <option value="urgent">Urgent</option>
              <option value="humorous">Humorous</option>
            </select>
          </div>
        </div>

        <button
          onClick={generateAd}
          disabled={loading || !product || !target}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating...
            </span>
          ) : (
            'Generate Advertisement'
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mt-8">
          {error}
        </div>
      )}

      {result && (
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 mt-8">
          <h3 className="text-xl font-semibold text-white mb-4">
            Generated Advertisement
          </h3>
          <div
            className="p-6 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
            onClick={() => navigator.clipboard.writeText(result)}
            title="Click to copy"
          >
            <div className="prose max-w-none text-gray-300">
              {result.split('\n').map((line, index) => (
                <p key={index} className="mb-4">
                  {line}
                </p>
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            Click on the advertisement to copy it to your clipboard
          </p>
        </div>
      )}
    </div>
  );
}