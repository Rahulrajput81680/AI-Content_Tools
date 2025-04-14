// src/components/FeatureCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const FeatureCard = ({ title, link }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(link)}
      className="cursor-pointer bg-white text-black p-6 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
    >
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-sm text-gray-600">
        Click to generate {title.toLowerCase()}
      </p>
    </div>
  );
};

export default FeatureCard;
