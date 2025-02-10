import React from 'react';
import { Star, MapPin, Clock, IndianRupee } from 'lucide-react';
import { Professional } from '../types';

interface ProfessionalProfileProps {
  professional: Professional;
  onBook: () => void;
}

export default function ProfessionalProfile({ professional, onBook }: ProfessionalProfileProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="relative h-64">
        <img
          src={professional.image}
          alt={professional.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{professional.name}</h1>
            <p className="text-indigo-600 font-medium mt-1 capitalize">
              {professional.profession}
            </p>
          </div>
          <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="font-medium">{professional.rating}</span>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-5 h-5" />
            <span>{professional.location} - {professional.pincode}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-5 h-5" />
            <span>{professional.experience} years experience</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <IndianRupee className="w-5 h-5" />
            <span>₹{professional.hourlyRate}/hour</span>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">About</h2>
          <p className="text-gray-600">{professional.description}</p>
        </div>

        <button
          onClick={onBook}
          className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          Book Now
        </button>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Reviews</h2>
          <div className="space-y-4">
            {professional.reviews.map((review) => (
              <div key={review.id} className="border-b pb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{review.userName}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span>{review.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
                <span className="text-sm text-gray-500 mt-1 block">
                  {review.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}