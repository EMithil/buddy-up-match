import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const RoomFilterBar = ({ onApplyFilters }) => {
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [roomType, setRoomType] = useState("any");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const handleApplyFilter = () => {
    const filters = {};
    if (priceMin !== "") filters.priceMin = Number(priceMin);
    if (priceMax !== "") filters.priceMax = Number(priceMax);
    if (roomType !== "any") filters.roomType = roomType;
    if (location.trim() !== "") filters.location = location.trim();
    if (sortBy) filters.sortBy = sortBy;

    onApplyFilters(filters);
  };

  const handleResetFilters = () => {
    setPriceMin("");
    setPriceMax("");
    setRoomType("any");
    setLocation("");
    setSortBy("newest");
    onApplyFilters({});
  };

  return (
    <div className="w-full bg-white shadow-sm rounded-lg mb-6 p-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Price Range */}
        <div>
          <Label>Price Min</Label>
          <Input
            type="number"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            placeholder="Min"
          />
        </div>
        <div>
          <Label>Price Max</Label>
          <Input
            type="number"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            placeholder="Max"
          />
        </div>

        {/* Room Type */}
        <div>
          <Label>Room Type</Label>
          <Select value={roomType} onValueChange={setRoomType}>
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="private">Private</SelectItem>
              <SelectItem value="shared">Shared</SelectItem>
              <SelectItem value="studio">Studio</SelectItem>
              <SelectItem value="entire">Entire Apartment</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div>
          <Label>Location</Label>
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
          />
        </div>

        {/* Sort By */}
        <div>
          <Label>Sort By</Label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Newest" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Filter Actions */}
      <div className="flex justify-end mt-4 gap-2">
        <Button variant="outline" onClick={handleResetFilters}>
          Reset
        </Button>
        <Button onClick={handleApplyFilter}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default RoomFilterBar;
