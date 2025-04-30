import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await fetch(`/api/rooms/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch room details');
        }
        const data = await response.json();
        setRoom(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [id]);

  if (loading) return <div className="text-center py-20 text-xl">Loading room details...</div>;
  if (error) return <div className="text-center py-20 text-red-600">Error: {error}</div>;
  if (!room) return <div className="text-center py-20 text-gray-600">No room found.</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-6 py-10">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-4xl font-extrabold mb-6 text-gray-900">{room.title}</h1>
          <p className="mb-6 text-gray-700 leading-relaxed">{room.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-3">
              <div><span className="font-semibold text-gray-800">Rent:</span> <span className="text-primary">${room.rent_amount} {room.currency}</span></div>
              <div><span className="font-semibold text-gray-800">Deposit:</span> ${room.deposit_amount}</div>
              <div>
                <span className="font-semibold text-gray-800">Available:</span> {new Date(room.available_from).toLocaleDateString()}
                {room.available_until && (
                  <> - {new Date(room.available_until).toLocaleDateString()}</>
                )}
              </div>
              <div>
                <span className="font-semibold text-gray-800">Location:</span>
                <div className="ml-4 text-gray-700">
                  <div>{room.location?.street_address}</div>
                  <div>{room.location?.city}, {room.location?.state} {room.location?.postal_code}</div>
                  <div>{room.location?.country}</div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div><span className="font-semibold text-gray-800">Bedrooms:</span> {room.total_bedrooms}</div>
              <div><span className="font-semibold text-gray-800">Bathrooms:</span> {room.total_bathrooms}</div>
              <div><span className="font-semibold text-gray-800">Size:</span> {room.room_size_sqft} sqft</div>
              <div>
                <span className="font-semibold text-gray-800">Furnished:</span> {room.is_furnished ? 'Yes' : 'No'}
              </div>
              <div>
                <span className="font-semibold text-gray-800">Private Room:</span> {room.is_private_room ? 'Yes' : 'No'}
              </div>
              <div>
                <span className="font-semibold text-gray-800">Private Bathroom:</span> {room.is_private_bathroom ? 'Yes' : 'No'}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Amenities</h2>
            {room.amenities && room.amenities.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {room.amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No amenities listed.</p>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Photos</h2>
            {room.photos && room.photos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {room.photos.map((photo) => (
                  <img
                    key={photo.photo_url}
                    src={photo.photo_url}
                    alt={photo.caption || 'Room photo'}
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No photos available.</p>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Current Roommates</h2>
            {room.roommates && room.roommates.length > 0 ? (
              <ul className="text-gray-700 space-y-2">
                {room.roommates.map((mate) => (
                  <li key={mate.id} className="border border-gray-300 rounded p-3 shadow-sm">
                    <div className="font-semibold">{mate.name}</div>
                    <div className="text-sm text-gray-600">{mate.email}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No current roommates.</p>
            )}
          </div>

          <Link to="/rooms" className="inline-block mt-6 text-primary font-semibold hover:underline">
            &larr; Back to Rooms
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
