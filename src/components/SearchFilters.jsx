import React from "react";
import { Search, MapPin } from "lucide-react";

export default function SearchFilters({
  selectedProfession,
  pincode,
  onProfessionChange,
  onPincodeChange,
}) {
  const professions = [
    "carpenter",
    "electrician",
    "plumber",
    "painter",
    "mason",
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Professional
          </label>
          <select
            value={selectedProfession}
            onChange={(e) => onProfessionChange(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
          >
            <option value="">All Professionals</option>
            {professions.map((profession) => (
              <option
                key={profession}
                value={profession}
                className="capitalize"
              >
                {profession}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Pincode
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={pincode}
              onChange={(e) => onPincodeChange(e.target.value)}
              placeholder="Enter your pincode"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
