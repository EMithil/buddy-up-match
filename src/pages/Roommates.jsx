import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import FilterBar from '@/components/FilterBar';
import CompatibilityScore from '@/components/CompatibilityScore';

const RoommateCard = ({ roommate }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={roommate.profile_url} alt={roommate.full_name} />
            <AvatarFallback>{roommate.full_name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{roommate.full_name}</h3>
            <p className="text-gray-600 text-sm">{roommate.age} • {roommate.gender}</p>
          </div>
        </div>

        <p className="text-gray-700 mb-4 line-clamp-2">{roommate.bio}</p>

        <div className="flex items-center justify-between">
          <div className="text-primary font-semibold">Phone: {roommate.phone_number || 'N/A'}</div>
          <Button variant="outline" size="sm">View Profile</Button>
        </div>
      </div>
    </div>
  );
};

const Roommates = () => {
  const { isAuthenticated } = useAuth();
  const [roommatesData, setRoommatesData] = useState([]);

  const fetchRoommates = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch roommates data');
      }
      const data = await response.json();
      setRoommatesData(data);
    } catch (error) {
      console.error('Error fetching roommates:', error);
    }
  };

  useEffect(() => {
    fetchRoommates();
    const interval = setInterval(fetchRoommates, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={isAuthenticated} />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Find Roommates</h1>
        
        <div className="mb-8">
          <FilterBar onApplyFilters={filters => {
            // Apply filters client-side
            setRoommatesData(prevData => {
              return prevData
                .filter(r => r.age >= filters.ageMin && r.age <= filters.ageMax)
                .filter(r => filters.gender === "any" || filters.gender === "" || r.gender.toLowerCase() === filters.gender.toLowerCase())
                .sort((a, b) => {
                  if (filters.createdAtSort === "newest") {
                    return new Date(b.created_at) - new Date(a.created_at);
                  } else {
                    return new Date(a.created_at) - new Date(b.created_at);
                  }
                });
            });
          }} />
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