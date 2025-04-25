
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const FilterBar = ({ onApplyFilters }) => {
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortBy, setSortBy] = useState("relevance");
  const [roomType, setRoomType] = useState("");
  const [location, setLocation] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Handle filter application
  const handleApplyFilter = () => {
    onApplyFilters({
      priceMin: priceRange[0],
      priceMax: priceRange[1],
      sortBy,
      roomType,
      location,
    });
    if (window.innerWidth < 768) {
      setIsFilterOpen(false);
    }
  };

  // Handle filter reset
  const handleResetFilters = () => {
    setPriceRange([0, 2000]);
    setSortBy("relevance");
    setRoomType("");
    setLocation("");
    onApplyFilters({});
  };

  return (
    <div className="w-full bg-white shadow-sm rounded-lg mb-6">
      {/* Mobile Filter Button */}
      <div className="md:hidden p-4">
        <Button 
          variant="outline" 
          className="w-full flex justify-between items-center"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <span>Filters</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {isFilterOpen ? 
              <path d="M18 6L6 18M6 6l12 12" /> : 
              <path d="M4 21v-7m0-4V3m8 18v-4m0-8V3m8 18v-11m0-4V3M1 14h6m2-6h6m2 12h6" />
            }
          </svg>
        </Button>
      </div>

      {/* Filter Content - Hidden on mobile unless toggled */}
      <div className={`${isFilterOpen || 'md:block hidden'} p-4`}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Price Range */}
          <div className="md:col-span-2 space-y-2">
            <Label>Price Range ($/month)</Label>
            <div className="pt-4 px-2">
              <Slider 
                defaultValue={[0, 2000]} 
                max={5000} 
                step={50}
                value={priceRange}
                onValueChange={setPriceRange}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600 pt-1">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Neighborhood, city..."
              className="mt-1"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Room Type */}
          <div>
            <Label htmlFor="room-type">Room Type</Label>
            <Select value={roomType} onValueChange={setRoomType}>
              <SelectTrigger>
                <SelectValue placeholder="Any type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any type</SelectItem>
                <SelectItem value="private">Private Room</SelectItem>
                <SelectItem value="shared">Shared Room</SelectItem>
                <SelectItem value="studio">Studio</SelectItem>
                <SelectItem value="entire">Entire Place</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort By */}
          <div>
            <Label htmlFor="sort-by">Sort By</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Relevance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="rating">Best Rating</SelectItem>
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
    </div>
  );
};

export default FilterBar;
