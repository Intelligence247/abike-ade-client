"use client"

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RoomFilters } from '@/components/ui/room-filters';
import { rooms, roomTypes, priceRanges, amenities } from '@/lib/mock-data';
import { 
  MapPin, 
  Users, 
  Square, 
  Wifi, 
  Snowflake, 
  Car,
  ArrowRight,
  Star,
  Search,
  CreditCard
} from 'lucide-react';

export function RoomListing() {
  const [filters, setFilters] = useState({
    searchTerm: '',
    selectedType: '',
    selectedPriceRange: '',
    selectedAmenities: [] as string[]
  });

  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      // Search filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchesSearch = 
          room.title.toLowerCase().includes(searchLower) ||
          room.description.toLowerCase().includes(searchLower) ||
          room.block.toLowerCase().includes(searchLower) ||
          room.location.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      // Room type filter
      if (filters.selectedType && room.type !== filters.selectedType) {
        return false;
      }

      // Price range filter
      if (filters.selectedPriceRange) {
        const [min, max] = filters.selectedPriceRange.split('-').map(Number);
        if (max && (room.price < min || room.price > max)) {
          return false;
        } else if (!max && room.price < min) {
          return false;
        }
      }

      // Amenities filter
      if (filters.selectedAmenities.length > 0) {
        const hasAllSelectedAmenities = filters.selectedAmenities.every(amenity => 
          room.amenities.includes(amenity)
        );
        if (!hasAllSelectedAmenities) return false;
      }

      return true;
    });
  }, [filters]);

  const handleFiltersChange = useCallback((newFilters: any) => {
    setFilters(newFilters);
  }, []);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <RoomFilters
        roomTypes={roomTypes}
        priceRanges={priceRanges}
        amenities={amenities}
        onFiltersChange={handleFiltersChange}
      />

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600 dark:text-gray-400">
          {filteredRooms.length} room{filteredRooms.length !== 1 ? 's' : ''} available
        </p>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <Card key={room.id} className="group hover:shadow-lg transition-shadow duration-200 border-gray-200 dark:border-gray-800">
            <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
              <img
                src={room.images[0]}
                alt={room.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute top-4 right-4">
                <Badge 
                  variant={room.status === 'available' ? "default" : "secondary"}
                  className={room.status === 'available' 
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                  }
                >
                  {room.status === 'available' ? 'Available' : 'Booked'}
                </Badge>
              </div>
            </div>
            
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                    {room.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    {room.block} • {room.floor} • Room {room.roomNumber}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    ₦{room.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    per {room.pricePer}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                {room.description}
              </p>
              
              {/* Room Features */}
              <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Users className="h-3 w-3" />
                  <span>{room.capacity} person</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Square className="h-3 w-3" />
                  <span>{room.size}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{room.features.bathroom}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3" />
                  <span>{room.rating}/5</span>
                </div>
              </div>
              
              {/* Amenities */}
              <div className="flex flex-wrap gap-1 mb-4">
                {room.amenities.slice(0, 3).map((amenity, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {amenity === 'Air Conditioning' && <Snowflake className="h-3 w-3 mr-1" />}
                    {amenity === 'WiFi' && <Wifi className="h-3 w-3 mr-1" />}
                    {amenity === 'Parking' && <Car className="h-3 w-3 mr-1" />}
                    {amenity}
                  </Badge>
                ))}
                {room.amenities.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{room.amenities.length - 3} more
                  </Badge>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-2">
                <Link href={`/rooms/${room.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    View Details
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
                <Link href={`/rooms/${room.id}/book`} className="w-full">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Book Now
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredRooms.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No rooms found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Try adjusting your search criteria or filters
          </p>
          <Button
            variant="outline"
            onClick={() => setFilters({
              searchTerm: '',
              selectedType: '',
              selectedPriceRange: '',
              selectedAmenities: []
            })}
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
} 