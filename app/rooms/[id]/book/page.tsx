import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { BookingForm } from '@/components/ui/booking-form';
import { rooms } from '@/lib/mock-data';
import { 
  ArrowLeft, 
  AlertCircle
} from 'lucide-react';

// Generate static params for all room IDs
export async function generateStaticParams() {
  return rooms.map((room) => ({
    id: room.id,
  }));
}

export default async function BookRoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: roomId } = await params;
  const room = rooms.find(r => r.id === roomId);

  if (!room) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Room Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The room you're trying to book doesn't exist.
          </p>
          <Link href="/rooms">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Rooms
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (room.status !== 'available') {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Room Not Available
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This room is currently booked. Please check back later or browse other available rooms.
          </p>
          <Link href="/rooms">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Browse Other Rooms
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href={`/rooms/${room.id}`} className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Room
              </Link>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AC</span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Abike Ade Court
                </span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/signin">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <BookingForm room={room} />
    </div>
  );
} 