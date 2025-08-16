"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { constructImageUrl } from '@/lib/utils';
import { useRoom } from '@/hooks/use-rooms';
import { useAuth } from '@/lib/auth-context';
import { BookingModal } from '@/components/ui/booking-modal';
import { 
  ArrowLeft, 
  MapPin, 
  Users, 
  Calendar,
  ArrowRight,
  Clock,
  Shield,
  Wifi,
  Lightbulb,
  Phone,
  Mail,
  Loader2,
  AlertCircle,
  ImageIcon,
  User,
  Lock
} from 'lucide-react';

export default function RoomDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const { room, loading, error } = useRoom(roomId || '');
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  useEffect(() => {
    const getRoomId = async () => {
      try {
        const resolvedParams = await params;
        console.log('Room Details: Resolved params:', resolvedParams);
        if (resolvedParams?.id) {
          console.log('Room Details: Setting room ID to:', resolvedParams.id);
          setRoomId(resolvedParams.id);
        } else {
          console.error('Room Details: No room ID found in params');
        }
      } catch (error) {
        console.error('Room Details: Error resolving params:', error);
        // Set a fallback or show error state
      }
    };

    getRoomId();
  }, [params]);

  // Debug logging for room ID changes
  useEffect(() => {
    console.log('Room Details: Room ID changed to:', roomId);
  }, [roomId]);

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
          <p className="text-gray-600 dark:text-gray-400">Loading room details...</p>
        </div>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {error ? 'Error Loading Room' : 'Room Not Found'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error || "The room you're looking for doesn't exist or has been removed."}
          </p>
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">Error details: {error}</p>
            </div>
          )}
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

  // Debug logging
  // console.log('Rendering room:', room);
  // console.log('Room price:', room.price, 'Type:', typeof room.price);
  // console.log('Room images:', room.images);

  const formatPrice = (price: string) => {
    try {
      const numericPrice = parseFloat(price);
      if (isNaN(numericPrice)) {
        return 'Price not available';
      }
      return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
      }).format(numericPrice);
    } catch (error) {
      return 'Price not available';
    }
  };

  const handleBookNow = () => {
    if (!isAuthenticated) {
      // Show account required message
      alert('You need to have an account to book a room. Please sign in or create an account first.');
      return;
    }
    setShowBookingModal(true);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/rooms" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Rooms
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
              {!isAuthenticated ? (
                <>
                  <Link href="/signin">
                    <Button variant="outline" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                      Get Started
                    </Button>
                  </Link>
                </>
              ) : (
                <Link href="/dashboard">
                  <Button size="sm" variant="outline">
                    Dashboard
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Room Images */}
            <Card className="border-gray-200 dark:border-gray-800">
              <CardContent className="p-0">
                {room.images && room.images.length > 0 ? (
                  <div className="relative">
                    <img
                      src={constructImageUrl(process.env.NEXT_PUBLIC_BASE_URL, room.images[0].image)}
                      alt={room.images[0].description || room.title}
                      className="w-full h-96 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge 
                        variant={room.available ? "default" : "secondary"}
                        className={room.available 
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        }
                      >
                        {room.available ? 'Available' : 'Occupied'}
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-t-lg flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No images available</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Room Details */}
            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">{room.title}</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Room ID: {room.id}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Features */}
                {room.features && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {room.features.split(',').map((feature, index) => (
                        <Badge key={index} variant="secondary" className="px-3 py-1">
                          {feature.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    This comfortable student accommodation offers all the amenities you need for a successful academic year. 
                    Located in a prime area with easy access to universities and essential services.
                  </p>
                </div>

                {/* Amenities */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Wifi className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700 dark:text-gray-300">High-Speed WiFi</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Lightbulb className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700 dark:text-gray-300">24/7 Power Supply</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700 dark:text-gray-300">24/7 Security</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700 dark:text-gray-300">Prime Location</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Booking Card */}
            <Card className="border-gray-200 dark:border-gray-800 sticky top-24">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Book This Room</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Pricing */}
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {formatPrice(room.price)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    per year (12 months)
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    All utilities included
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Status</span>
                    <Badge 
                      variant={room.available ? "default" : "secondary"}
                      className={room.available 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                      }
                    >
                      {room.available ? 'Available' : 'Occupied'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Images</span>
                    <span className="text-gray-900 dark:text-white">{room.images?.length || 0} available</span>
                  </div>
                </div>

                <Separator />

                {room.available ? (
                  <div className="space-y-3">
                    {isAuthenticated ? (
                      <Button 
                        onClick={handleBookNow}
                        className="w-full bg-indigo-600 hover:bg-indigo-700"
                      >
                        Book Now
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    ) : (
                      <div className="text-center p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                        <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/40 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Lock className="h-5 w-5 text-amber-600" />
                        </div>
                        <h4 className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-2">
                          Authentication Required
                        </h4>
                        <p className="text-xs text-amber-700 dark:text-amber-300 mb-3">
                          You must be logged in to book this room
                        </p>
                        <div className="flex flex-col gap-2">
                          <Link href="/signin">
                            <Button size="sm" className="w-full bg-amber-600 hover:bg-amber-700">
                              Sign In
                            </Button>
                          </Link>
                          <Link href="/register">
                            <Button size="sm" variant="outline" className="w-full border-amber-300 text-amber-700 hover:bg-amber-50">
                              Create Account
                            </Button>
                          </Link>
                        </div>
                      </div>
                    )}
                    <Button variant="outline" className="w-full">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Viewing
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button disabled className="w-full">
                      Currently Occupied
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Clock className="h-4 w-4 mr-2" />
                      Join Waiting List
                    </Button>
                  </div>
                )}

                {/* Account Required Message */}
                {!isAuthenticated && (
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <User className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-amber-800 dark:text-amber-200">
                          Account Required
                        </p>
                        <p className="text-amber-700 dark:text-amber-300 mt-1">
                          You need to sign in or create an account to book this room.
                        </p>
                        <div className="flex space-x-2 mt-2">
                          <Link href="/signin">
                            <Button size="sm" variant="outline" className="text-amber-700 border-amber-300 hover:bg-amber-100">
                              Sign In
                            </Button>
                          </Link>
                          <Link href="/register">
                            <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                              Create Account
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                  <p>Need help? Contact us</p>
                  <div className="flex items-center justify-center space-x-4 mt-2">
                    <a href="tel:+2349012345678" className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-500">
                      <Phone className="h-3 w-3" />
                      <span>Call</span>
                    </a>
                    <a href="mailto:info@abikeadecourt.com" className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-500">
                      <Mail className="h-3 w-3" />
                      <span>Email</span>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <Shield className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">24/7 Security</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Wifi className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">High-Speed WiFi</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Lightbulb className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">24/7 Power Supply</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">Prime Location</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isAuthenticated && (
        <BookingModal
          room={room}
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
} 