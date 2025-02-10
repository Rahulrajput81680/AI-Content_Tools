import React from 'react';
import { Star, MapPin, Clock, IndianRupee } from 'lucide-react';
import { Professional } from '../types';

interface ProfessionalCardProps {
  professional: Professional;
  onHire: (professional: Professional) => void;
}

export default function ProfessionalCard({ professional, onHire }: ProfessionalCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-48">
        <img
          src={professional.image}
          alt={professional.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-medium">{professional.rating}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{professional.name}</h3>
        <p className="text-indigo-600 font-medium mt-1 capitalize">{professional.profession}</p>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{professional.location} - {professional.pincode}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{professional.experience} years experience</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <IndianRupee className="w-4 h-4" />
            <span className="text-sm">₹{professional.hourlyRate}/hour</span>
          </div>
        </div>
        
        <button
          onClick={() => onHire(professional)}
          className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          Hire Now
        </button>
      </div>
    </div>
  );
}