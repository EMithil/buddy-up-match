import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const RoomCard = ({ room }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  // Default image if no images are provided
  const defaultImage = "https://images.unsplash.com/photo-1721322800607-8c38375eef04";

  const nextImage = () => {
    if (room.photos && room.photos.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % room.photos.length);
    }
  };

  const prevImage = () => {
    if (room.photos && room.photos.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? room.photos.length - 1 : prevIndex - 1
      );
    }
  };

  // Helper function to handle image errors
  const handleImageError = (e) => {
    e.target.src = defaultImage;
  };

  // Function to get active image source
  const getImageSrc = () => {
    if (room.photos && room.photos.length > 0) {
      return room.photos[currentImageIndex].photo_url;
    }
    return defaultImage;
  };

  // Toggle expanded state
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Navigate to room details page
  const goToDetails = () => {
    navigate(`/rooms/${room.id}`);
  };

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow scale-hover cursor-pointer" onClick={goToDetails}>
      <div className="relative aspect-w-16 aspect-h-10 h-48 bg-gray-100 overflow-hidden">
        {/* Image carousel */}
        <img
          src={getImageSrc()}
          alt={`Room in ${room.location?.name || ''}`}
          onError={handleImageError}
          className="object-cover w-full h-full"
        />

        {/* Image navigation buttons - only show if there are multiple images */}
        {room.photos && room.photos.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-1 hover:bg-white"
              aria-label="Previous image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-1 hover:bg-white"
              aria-label="Next image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>
        )}

        {/* Price tag */}
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-md shadow text-sm font-semibold">
          ${room.rent_amount}/month
        </div>

        {/* Compatibility score if available */}
        {room.compatibilityScore && (
          <div className="absolute bottom-3 right-3 bg-secondary text-white px-2 py-1 rounded-full shadow text-sm font-semibold">
            {room.compatibilityScore}% Match
          </div>
        )}
      </div>

      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg truncate">{room.title}</h3>
        </div>
        <p className="text-sm text-gray-500">{room.location?.name}</p>
      </CardHeader>

      <CardContent className="p-4 pt-2 pb-3">
        <div className="flex gap-2 flex-wrap mb-2">
          {room.amenities && room.amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="outline" className="bg-primary/10 hover:bg-primary/20">
              {amenity}
            </Badge>
          ))}
          {room.amenities && room.amenities.length > 3 && (
            <Badge variant="outline" className="bg-muted">
              +{room.amenities.length - 3}
            </Badge>
          )}
        </div>
        <p className="text-sm line-clamp-2">{room.description}</p>
      </CardContent>

      {expanded && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <h4 className="font-semibold mb-2">Roommates</h4>
          {room.roommates && room.roommates.length > 0 ? (
            <ul className="space-y-2">
              {room.roommates.map((mate) => (
                <li key={mate.id} className="text-sm">
                  {mate.name} ({mate.email})
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No current roommates.</p>
          )}
        </div>
      )}

      <CardFooter className="p-4 pt-2 flex justify-between">
        <div className="text-sm text-gray-600">
          <span className="font-medium">{room.roomType}</span>
          {room.available_from && (
            <span> · Available {new Date(room.available_from).toLocaleDateString()}</span>
          )}
        </div>
        <Button size="sm" variant="secondary" onClick={(e) => e.stopPropagation()}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
