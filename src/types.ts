export interface Professional {
  id: string;
  name: string;
  profession: string;
  rating: number;
  experience: number;
  hourlyRate: number;
  location: string;
  pincode: string;
  image: string;
  description: string;
  availability: string[];
  reviews: Review[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  bookings: Booking[];
}

export interface Booking {
  id: string;
  professionalId: string;
  userId: string;
  date: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalAmount: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export type Profession = 'carpenter' | 'electrician' | 'plumber' | 'painter' | 'mason';