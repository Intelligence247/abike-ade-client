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
import Image from 'next/image';
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
  Lock,
  Twitter,
  Instagram
} from 'lucide-react';

export default function RoomDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { room, loading, error } = useRoom(roomId || '');
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  // Helper functions for image gallery
  const getSelectedImageDescription = () => {
    if (!selectedImage || selectedImage === room?.thumbnail) {
      return room?.title;
    }
    const image = room?.images?.find(img => img.image === selectedImage);
    return image?.description || room?.title;
  };

  const getSelectedImageIndex = () => {
    if (!selectedImage || selectedImage === room?.thumbnail) {
      return 0;
    }
    const index = room?.images?.findIndex(img => img.image === selectedImage) || 0;
    return index + 1; // +1 because thumbnail is index 0
  };

  // Navigation functions for image gallery
  const nextImage = () => {
    if (!room?.images?.length) return;
    
    if (!selectedImage || selectedImage === room.thumbnail) {
      setSelectedImage(room.images[0].image);
    } else {
      const currentIndex = room.images.findIndex(img => img.image === selectedImage);
      const nextIndex = (currentIndex + 1) % room.images.length;
      setSelectedImage(room.images[nextIndex].image);
    }
  };

  const previousImage = () => {
    if (!room?.images?.length) return;
    
    if (!selectedImage || selectedImage === room.thumbnail) {
      const lastIndex = room.images.length - 1;
      setSelectedImage(room.images[lastIndex].image);
    } else {
      const currentIndex = room.images.findIndex(img => img.image === selectedImage);
      const prevIndex = currentIndex === 0 ? room.images.length - 1 : currentIndex - 1;
      setSelectedImage(room.images[prevIndex].image);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        previousImage();
      } else if (event.key === 'ArrowRight') {
        nextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, room?.images]);

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
                <Image src="/logo.png" alt="Abike Ade Court" width={32} height={32} />
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
                  <div className="space-y-4">
                    {/* Main Featured Image */}
                    <div className="relative group">
                      <img
                        src={constructImageUrl(process.env.NEXT_PUBLIC_BASE_URL, selectedImage || room.thumbnail)}
                        alt={getSelectedImageDescription() || room.title}
                        className="w-full h-96 object-cover rounded-t-lg transition-all duration-300 hover:scale-[1.02]"
                      />
                      
                      {/* Navigation Arrows */}
                      {room.images.length > 1 && (
                        <>
                          <button
                            onClick={previousImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-black/70 hover:scale-110"
                            aria-label="Previous image"
                          >
                            <ArrowLeft className="h-5 w-5" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-black/70 hover:scale-110"
                            aria-label="Next image"
                          >
                            <ArrowRight className="h-5 w-5" />
                          </button>
                        </>
                      )}
                      
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
                      
                      {/* Image Counter */}
                      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                        {getSelectedImageIndex() + 1} of {room.images.length}
                      </div>
                      
                      {/* Fullscreen Button */}
                      <button
                        onClick={() => window.open(constructImageUrl(process.env.NEXT_PUBLIC_BASE_URL, selectedImage || room.thumbnail), '_blank')}
                        className="absolute bottom-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-black/70 hover:scale-110"
                        aria-label="View fullscreen"
                      >
                        <div className="w-4 h-4 border-2 border-white rounded-sm" />
                      </button>
                    </div>

                    {/* Thumbnail Gallery */}
                    <div className="px-4 pb-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Room Images ({room.images.length + 1})
                        </h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Click to view • Use arrow keys to navigate
                        </span>
                      </div>
                      
                      <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                        {/* Thumbnail for main image */}
                        <button
                          onClick={() => setSelectedImage(room.thumbnail)}
                          className={`relative flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                            selectedImage === room.thumbnail || !selectedImage
                              ? 'border-indigo-500 ring-2 ring-indigo-200'
                              : 'border-gray-200 dark:border-gray-600 hover:border-indigo-300'
                          }`}
                        >
                          <img
                            src={constructImageUrl(process.env.NEXT_PUBLIC_BASE_URL, room.thumbnail)}
                            alt="Main room view"
                            className="w-24 h-20 object-cover group-hover:scale-110 transition-transform duration-200"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                          
                          {/* Selection indicator */}
                          {(selectedImage === room.thumbnail || !selectedImage) && (
                            <div className="absolute top-2 right-2 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full" />
                            </div>
                          )}
                        </button>

                        {/* Thumbnails for additional images */}
                        {room.images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImage(image.image)}
                            className={`relative flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                              selectedImage === image.image
                                ? 'border-indigo-500 ring-2 ring-indigo-200'
                                : 'border-gray-200 dark:border-gray-600 hover:border-indigo-300'
                            }`}
                          >
                            <img
                              src={constructImageUrl(process.env.NEXT_PUBLIC_BASE_URL, image.image)}
                              alt={image.description || `Room view ${index + 1}`}
                              className="w-24 h-20 object-cover group-hover:scale-110 transition-transform duration-200"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                            
                            {/* Selection indicator */}
                            {selectedImage === image.image && (
                              <div className="absolute top-2 right-2 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full" />
                              </div>
                            )}
                            
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                                  <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
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
                      {room.features.split(';').map((feature, index) => (
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
                    <a href="tel:+2348055453708" className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-500">
                      <Phone className="h-3 w-3" />
                      <span>Call</span>
                    </a>
                    <a href="mailto:abikeadecourt@gmail.com" className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-500">
                      <Mail className="h-3 w-3" />
                      <span>Email</span>
                    </a>
                  </div>
                  <div className="flex items-center justify-center space-x-4 mt-3">
                    <a
                      href="https://wa.me/2348082129547"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-green-600 hover:text-green-500"
                    >
                      <div className="w-3 h-3 flex items-center justify-center">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                      </div>
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href="https://x.com/abikeadecourt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-500"
                    >
                      <Twitter className="h-3 w-3" />
                      <span>X</span>
                    </a>
                    <a
                      href="https://www.instagram.com/abikeadecourt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-500"
                    >
                      <Instagram className="h-3 w-3" />
                      <span>Instagram</span>
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