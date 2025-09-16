"use client"

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ResponsiveHeader } from '@/components/ui/responsive-header';
import { RoomFilters } from '@/components/ui/room-filters';
import { RoomCard } from '@/components/ui/room-card';
import { useRooms } from '@/hooks/use-rooms';
import { 
  Home,
  Building,
  Loader2,
  AlertCircle,
  Shield
} from 'lucide-react';

export default function RoomsPage() {
  const { 
    rooms, 
    loading, 
    error, 
    filters, 
    pagination,
    updateFilters, 
    resetFilters 
  } = useRooms();

  // Hero Image Carousel state
  const [currentHeroImage, setCurrentHeroImage] = React.useState(0);
  const [isHeroPaused, setIsHeroPaused] = React.useState(false);

  // Auto-change hero images every 4 seconds
  React.useEffect(() => {
    if (isHeroPaused) return;

    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % 5);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHeroPaused]);

  console.log(rooms+" "+"rooms alert")
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-gray-900">
            {/* Header */}
      <ResponsiveHeader showBackButton={true} backHref="/" backLabel="Back to Home" />

      {/* Hero Section */}
      <section 
        className="relative text-white py-24 overflow-hidden"
        onMouseEnter={() => setIsHeroPaused(true)}
        onMouseLeave={() => setIsHeroPaused(false)}
      >
        {/* Background Images */}
        <div className="absolute inset-0">
          {[
            "/Hostel-Images/image9.jpg",
            "/Hostel-Images/image12.jpg", 
            "/Hostel-Images/image13.jpg",
            "/Hostel-Images/image14.jpg",
            "/Hostel-Images/image15.jpg"
          ].map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-2000 ${
                index === currentHeroImage ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Student accommodation ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 via-indigo-800/70 to-purple-900/80" />
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Animated Title */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              <span className="block animate-slide-in-left" style={{ animationDelay: '200ms' }}>
                Find Your Perfect
              </span>
              <span className="block animate-slide-in-right" style={{ animationDelay: '400ms' }}>
                Student Accommodation
              </span>
            </h1>
            
            {/* Animated Description */}
            <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              Browse our selection of comfortable, affordable rooms designed specifically for students. 
              All rooms come with modern amenities and are located near major universities.
            </p>
            
            {/* Animated Stats */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-indigo-200 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
              <div className="flex items-center space-x-2 group hover:scale-110 transition-transform duration-300">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                  <Building className="h-5 w-5" />
                </div>
                <span className="font-medium">6 Room Types</span>
              </div>
              
              <div className="w-px h-8 bg-indigo-400 hidden sm:block" />
              
              <div className="flex items-center space-x-2 group hover:scale-110 transition-transform duration-300">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                  <Home className="h-5 w-5" />
                </div>
                <span className="font-medium">Prime Locations</span>
              </div>
              
              <div className="w-px h-8 bg-indigo-400 hidden sm:block" />
              
              <div className="flex items-center space-x-2 group hover:scale-110 transition-transform duration-300">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                  <Shield className="h-5 w-5" />
                </div>
                <span className="font-medium">24/7 Security</span>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex items-center justify-center space-x-2 mt-8 animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
              {[0, 1, 2, 3, 4].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentHeroImage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentHeroImage
                      ? 'bg-white scale-125'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float hidden lg:block">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full border border-white/20" />
        </div>
        <div className="absolute bottom-20 right-10 animate-float-delayed hidden lg:block">
          <div className="w-16 h-16 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-300/30" />
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <RoomFilters 
              filters={filters}
              onUpdateFilters={updateFilters}
              onResetFilters={resetFilters}
            />
          </div>

          {/* Rooms Grid */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Available Rooms
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {loading ? 'Loading...' : `${pagination.totalItems} rooms found`}
                </p>
              </div>
              {pagination.totalPages > 1 && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </div>
              )}
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
                  <p className="text-gray-600 dark:text-gray-400">Loading rooms...</p>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Unable to load rooms
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </div>
            )}

            {/* Rooms Grid */}
            {!loading && !error && rooms.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {rooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            )}

            {/* No Results */}
            {!loading && !error && rooms.length === 0 && (
              <div className="text-center py-12">
                <Building className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No rooms found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Try adjusting your filters or check back later for new listings.
                </p>
                <Button variant="outline" onClick={resetFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer CTA */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Book Your Room?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Create an account to start your booking process. It only takes a few minutes to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                Create Account
              </Button>
            </Link>
            <Link href="/signin">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 