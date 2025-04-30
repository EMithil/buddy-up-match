import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import RoomCard from '../components/RoomCard.jsx';
import RoomFilterBar from '../components/RoomFilterBar.jsx';

const Rooms = () => {
  const { isAuthenticated } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  useEffect(() => {
    // Fetch rooms from backend API
    const fetchRooms = async () => {
      try {
        const response = await fetch('/api/rooms');
        if (!response.ok) {
          throw new Error('Failed to fetch rooms');
        }
        const data = await response.json();
        setRooms(data);
        setFilteredRooms(data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  const handleApplyFilters = (filters) => {
    console.log("Applied filters:", filters);

    if (Object.keys(filters).length === 0) {
      setFilteredRooms(rooms);
      return;
    }

    let filtered = [...rooms];

    if (filters.priceMin !== undefined && filters.priceMax !== undefined) {
      filtered = filtered.filter(room =>
        room.rent_amount >= filters.priceMin && room.rent_amount <= filters.priceMax
      );
    }

    if (filters.roomType && filters.roomType !== "any") {
      filtered = filtered.filter(room => {
        const roomTypeMap = {
          'private': true,
          'shared': false,
          'studio': 'Studio',
          'entire': 'Entire Apartment'
        };
        if (filters.roomType === 'studio' || filters.roomType === 'entire') {
          return room.room_type && room.room_type.toLowerCase().includes(roomTypeMap[filters.roomType].toLowerCase());
        }
        return room.is_private_room === roomTypeMap[filters.roomType];
      });
    }

    if (filters.location) {
      filtered = filtered.filter(room =>
        room.location && room.location.name.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          filtered.sort((a, b) => a.rent_amount - b.rent_amount);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.rent_amount - a.rent_amount);
          break;
        case 'newest':
          filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          break;
        default:
          break;
      }
    }

    setFilteredRooms(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={isAuthenticated} />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Available Rooms</h1>

        <div className="mb-8">
          <RoomFilterBar onApplyFilters={handleApplyFilters} />
        </div>

        {filteredRooms.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No rooms match your search criteria.</p>
            <button
              className="mt-4 text-primary underline"
              onClick={() => handleApplyFilters({})}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;
