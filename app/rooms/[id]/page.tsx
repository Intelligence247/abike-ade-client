import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { ImageGallery } from '@/components/ui/image-gallery';
import { rooms } from '@/lib/mock-data';
import { 
  ArrowLeft, 
  MapPin, 
  Users, 
  Square, 
  Wifi, 
  Snowflake, 
  Car,
  Home,
  ArrowRight,
  Star,
  Check,
  Calendar,
  Clock,
  Shield,
  Utensils,
  Lightbulb,
  Phone,
  Mail
} from 'lucide-react';

// Generate static params for all room IDs
export async function generateStaticParams() {
  return rooms.map((room) => ({
    id: room.id,
  }));
}

export default async function RoomDetailsPage({ params }: { params: Promise<{ id: string }> }) {
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
            The room you're looking for doesn't exist or has been removed.
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

  const isAvailable = room.status === 'available';

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
              <Separator orientation="vertical" className="h-6" />
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
              <Link href="/register">
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
                         {/* Image Gallery */}
             <ImageGallery images={room.images} title={room.title} />

            {/* Room Information */}
            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl text-gray-900 dark:text-white">
                      {room.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      {room.block} • {room.floor} • Room {room.roomNumber}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      ₦{room.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      per {room.pricePer}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {room.description}
                </p>

                {/* Room Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Users className="h-4 w-4" />
                    <span>{room.capacity} person</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Square className="h-4 w-4" />
                    <span>{room.size}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Home className="h-4 w-4" />
                    <span>{room.features.bedType}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4" />
                    <span>{room.features.bathroom}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Amenities & Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {room.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700 dark:text-gray-300">{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* House Rules */}
            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">House Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {room.rules.map((rule, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{rule}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Status</span>
                    <Badge 
                      variant={isAvailable ? "default" : "secondary"}
                      className={isAvailable 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                      }
                    >
                      {isAvailable ? 'Available' : 'Booked'}
                    </Badge>
                  </div>
                  {isAvailable ? (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-300">Move-in Date</span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {room.availability.immediate ? 'Immediate' : room.availability.nextAvailable}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-300">Minimum Stay</span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {room.availability.minimumStay}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 dark:text-gray-300">Next Available</span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {room.availability.nextAvailable}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="border-gray-200 dark:border-gray-800 sticky top-24">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Book This Room</CardTitle>
                <CardDescription>
                  Secure your accommodation today
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    ₦{room.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    per {room.pricePer}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Room Type</span>
                    <span className="text-gray-900 dark:text-white">{room.type}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Capacity</span>
                    <span className="text-gray-900 dark:text-white">{room.capacity} person</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Size</span>
                    <span className="text-gray-900 dark:text-white">{room.size}</span>
                  </div>
                </div>

                <Separator />

                {isAvailable ? (
                  <div className="space-y-3">
                    <Link href={`/rooms/${room.id}/book`} className="w-full">
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                        Book Now
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Viewing
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button disabled className="w-full">
                      Currently Booked
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Clock className="h-4 w-4 mr-2" />
                      Join Waiting List
                    </Button>
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
                  <Utensils className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">Kitchen Facilities</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 