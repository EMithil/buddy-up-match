
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FilterBar from '@/components/FilterBar';
import CompatibilityScore from '@/components/CompatibilityScore';

// Sample roommate data - This would come from API in a real app
const roommatesData = [
  {
    id: 1,
    name: "Alex Thompson",
    age: 24,
    occupation: "Software Engineer",
    bio: "Easy-going tech professional looking for a clean and quiet space. I enjoy cooking and hiking on weekends.",
    interests: ["Technology", "Hiking", "Cooking"],
    preferences: {
      smoking: false,
      pets: true,
      quietHours: true
    },
    location: "San Francisco",
    moveInDate: "2023-06-15",
    budget: 1200,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    compatibilityScore: 92
  },
  {
    id: 2,
    name: "Jamie Lee",
    age: 28,
    occupation: "Teacher",
    bio: "Elementary school teacher who loves art and quiet evenings. Looking for a roommate with similar interests.",
    interests: ["Art", "Reading", "Yoga"],
    preferences: {
      smoking: false,
      pets: false,
      quietHours: true
    },
    location: "Berkeley",
    moveInDate: "2023-07-01",
    budget: 900,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    compatibilityScore: 80
  },
  {
    id: 3,
    name: "Chris Morgan",
    age: 26,
    occupation: "Marketing Specialist",
    bio: "Sociable marketing professional who enjoys a good balance of social time and personal space.",
    interests: ["Music", "Travel", "Photography"],
    preferences: {
      smoking: false,
      pets: true,
      quietHours: false
    },
    location: "San Francisco",
    moveInDate: "2023-05-20",
    budget: 1400,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    compatibilityScore: 75
  },
  {
    id: 4,
    name: "Taylor Jordan",
    age: 25,
    occupation: "UX Designer",
    bio: "Creative designer who works from home. Looking for a clean, respectful roommate situation.",
    interests: ["Design", "Movies", "Coffee"],
    preferences: {
      smoking: false,
      pets: true,
      quietHours: true
    },
    location: "Oakland",
    moveInDate: "2023-06-01",
    budget: 1100,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    compatibilityScore: 88
  }
];

const RoommateCard = ({ roommate }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={roommate.avatar} alt={roommate.name} />
            <AvatarFallback>{roommate.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{roommate.name}</h3>
            <p className="text-gray-600 text-sm">{roommate.age} • {roommate.occupation}</p>
          </div>
          <div className="ml-auto">
            <CompatibilityScore score={roommate.compatibilityScore} />
          </div>
        </div>
        
        <p className="text-gray-700 mb-4 line-clamp-2">{roommate.bio}</p>
        
        <div className="mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{roommate.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Available: {new Date(roommate.moveInDate).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {roommate.interests.map((interest, index) => (
            <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
              {interest}
            </span>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-sm">
          <div className="flex items-center">
            <span className={`mr-1 inline-block w-2 h-2 rounded-full ${roommate.preferences.smoking ? 'bg-red-500' : 'bg-green-500'}`}></span>
            <span>{roommate.preferences.smoking ? 'Smoker' : 'Non-smoker'}</span>
          </div>
          <div className="flex items-center">
            <span className={`mr-1 inline-block w-2 h-2 rounded-full ${roommate.preferences.pets ? 'bg-green-500' : 'bg-gray-300'}`}></span>
            <span>{roommate.preferences.pets ? 'Pet-friendly' : 'No pets'}</span>
          </div>
          <div className="flex items-center">
            <span className={`mr-1 inline-block w-2 h-2 rounded-full ${roommate.preferences.quietHours ? 'bg-green-500' : 'bg-gray-300'}`}></span>
            <span>{roommate.preferences.quietHours ? 'Quiet hours' : 'Social'}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-primary font-semibold">${roommate.budget}/month</div>
          <Button variant="outline" size="sm">View Profile</Button>
        </div>
      </div>
    </div>
  );
};

const Roommates = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={isAuthenticated} />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Find Roommates</h1>
        
        <div className="mb-8">
          <FilterBar />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {roommatesData.map(roommate => (
            <RoommateCard key={roommate.id} roommate={roommate} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roommates;
