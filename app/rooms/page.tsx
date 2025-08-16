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
  AlertCircle
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

  console.log(rooms+" "+"rooms alert")
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-gray-900">
            {/* Header */}
      <ResponsiveHeader showBackButton={true} backHref="/" backLabel="Back to Home" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Find Your Perfect Student Accommodation
            </h1>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Browse our selection of comfortable, affordable rooms designed specifically for students. 
              All rooms come with modern amenities and are located near major universities.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-indigo-200">
              <div className="flex items-center space-x-1">
                <Building className="h-4 w-4" />
                <span>6 Room Types</span>
              </div>
              <div className="w-px h-4 bg-indigo-400" />
              <div className="flex items-center space-x-1">
                <Home className="h-4 w-4" />
                <span>Prime Locations</span>
              </div>
              <div className="w-px h-4 bg-indigo-400" />
              <div className="flex items-center space-x-1">
                <span>From ₦65,000/month</span>
              </div>
            </div>
          </div>
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