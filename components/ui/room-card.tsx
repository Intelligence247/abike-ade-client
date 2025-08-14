"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Room } from '@/hooks/use-rooms';
import { constructImageUrl } from '@/lib/utils';
import { 
  Users, 
  MapPin, 
  ArrowRight
} from 'lucide-react';

interface RoomCardProps {
  room: Room;
  className?: string;
}

export function RoomCard({ room, className = "" }: RoomCardProps) {
  const formatPrice = (price: string) => {
    const numericPrice = parseFloat(price);
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(numericPrice);
  };

  const getAvailabilityColor = (available: boolean) => {
    return available 
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
  };

  return (
    <Card className={`group overflow-hidden hover:shadow-lg transition-all duration-300 ${className}`}>
      <div className="relative aspect-[4/3] overflow-hidden">
        {room.thumbnail ? (
          <Image
            src={constructImageUrl(process.env.NEXT_PUBLIC_BASE_URL, room.thumbnail)}
            alt={room.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                <Users className="h-8 w-8" />
              </div>
              <p className="text-sm">No Image</p>
            </div>
          </div>
        )}
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <Badge className="bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white font-semibold px-3 py-1">
            {formatPrice(room.price)}/year
          </Badge>
        </div>
        
        {/* Availability Badge */}
        <div className="absolute top-4 left-4">
          <Badge className={`${getAvailabilityColor(room.available)} font-medium px-2 py-1 text-xs`}>
            {room.available ? 'Available' : 'Occupied'}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Room Title */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 transition-colors">
              {room.title}
            </h3>
          </div>

          {/* Features Preview - Show first 100 characters */}
          {room.features && room.features.length > 0 && (
            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
              {room.features.length > 100 
                ? `${room.features.substring(0, 100)}...` 
                : room.features
              }
            </p>
          )}

          {/* Room Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <Users className="h-4 w-4" />
              <span>{room.available ? 'Available' : 'Occupied'}</span>
            </div>
            {room.expiration_date && (
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4" />
                <span className="text-xs">Expires: {new Date(room.expiration_date).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          {/* Images Count */}
          {room.images && room.images.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Gallery
              </p>
              <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                <span>{room.images.length} image{room.images.length > 1 ? 's' : ''} available</span>
                {room.images.some(img => img.featured) && (
                  <Badge variant="secondary" className="text-xs">Featured</Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <div className="w-full space-y-3">
          <Link href={`/rooms/${room.id}`} className="w-full">
            <Button className="w-full group-hover:bg-indigo-700 transition-colors">
              View Details
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          
          {/* Account Required Note */}
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Account required to book
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
