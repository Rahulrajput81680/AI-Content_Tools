import React, { useState } from 'react';
import { X, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Professional } from '../types';
import { useAuthStore } from '../store/authStore';

interface BookingModalProps {
  professional: Professional;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ professional, isOpen, onClose }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const { isAuthenticated, user } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please login to book a service');
      return;
    }

    // Simulate booking API call
    console.log('Booking:', {
      professionalId: professional.id,
      userId: user?.id,
      date: selectedDate,
      timeSlot: selectedTime,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Book Service</h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold">{professional.name}</h3>
          <p className="text-gray-600 capitalize">{professional.profession}</p>
          <p className="text-gray-600">₹{professional.hourlyRate}/hour</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={format(new Date(), 'yyyy-MM-dd')}
                className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-600"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Time
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-600"
                required
              >
                <option value="">Select a time slot</option>
                {professional.availability.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}