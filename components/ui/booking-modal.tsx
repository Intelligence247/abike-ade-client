"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { constructImageUrl } from '@/lib/utils';
import { Room } from '@/hooks/use-rooms';
import { useRoomBooking } from '@/hooks/use-room-booking';
import { useProfile } from '@/hooks/use-profile'; // Added useProfile import
import { 
  X,
  CreditCard,
  CheckCircle,
  Shield,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Calendar,
  MapPin,
  Users,
  Wifi,
  Car,
  Utensils,
  Lightbulb,
  User,
  Check
} from 'lucide-react';
import { toast } from 'sonner';

interface BookingModalProps {
  room: Room;
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ room, isOpen, onClose }: BookingModalProps) {
  const router = useRouter();
  const { loading, error, currentStep, bookRoom, makePayment, resetBooking } = useRoomBooking();
  const [bookingData, setBookingData] = useState<any>(null);
  const { getProfile } = useProfile(false); // Don't auto-fetch profile
  const [userProfile, setUserProfile] = useState<any>(null);

  // Fetch user profile when modal opens and user is authenticated
  useEffect(() => {
    if (isOpen && !userProfile) {
      const fetchProfile = async () => {
        try {
          const profile = await getProfile();
          if (profile) {
            setUserProfile(profile);
          }
        } catch (error) {
          console.log('BookingModal: Could not fetch profile (user may not be authenticated)');
          // Don't show error toast for unauthenticated users
        }
      };
      fetchProfile();
    }
  }, [isOpen, userProfile, getProfile]);

  if (!isOpen) return null;

  const handleBooking = async () => {
    const response = await bookRoom(room.id);
    if (response) {
      setBookingData(response);
    }
  };

  const handlePayment = async () => {
    if (!bookingData?.data) {
      toast.error('No payment data available');
      return;
    }
    
    try {
      console.log('Initiating payment with data:', bookingData.data);
      
      // Use the hook's makePayment method
      const paymentResponse = await makePayment(bookingData.data);
      
      if (paymentResponse) {
        console.log('Payment initiated successfully');
        // The Paystack modal should have opened automatically
        toast.success('Payment initiated! Please complete your payment in the Paystack modal.');
      }
      
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    }
  };

  const handleClose = () => {
    resetBooking();
    setBookingData(null);
    onClose();
  };

  const getFeatureIcon = (feature: string) => {
    const featureLower = feature.toLowerCase();
    if (featureLower.includes('wifi') || featureLower.includes('internet')) return <Wifi className="h-4 w-4" />;
    if (featureLower.includes('parking') || featureLower.includes('car')) return <Car className="h-4 w-4" />;
    if (featureLower.includes('kitchen') || featureLower.includes('dining')) return <Utensils className="h-4 w-4" />;
    if (featureLower.includes('light') || featureLower.includes('electricity')) return <Lightbulb className="h-4 w-4" />;
    return <CheckCircle className="h-4 w-4" />;
  };

  const renderRoomDetails = () => (
    <div className="space-y-6">
      {/* Room Images */}
      <div className="relative">
        {room.images && room.images.length > 0 ? (
          <img
            src={constructImageUrl(process.env.NEXT_PUBLIC_BASE_URL, room.images[0].image)}
            alt={room.images[0].description || room.title}
            className="w-full h-64 object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">No Image Available</span>
          </div>
        )}
        <Badge 
          variant={room.available ? "default" : "secondary"}
          className="absolute top-4 right-4"
        >
          {room.available ? 'Available' : 'Occupied'}
        </Badge>
      </div>

      {/* Room Info */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {room.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Room ID: {room.id}
        </p>
        
        {/* Features */}
        {room.features && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Features</h4>
            <div className="flex flex-wrap gap-2">
              {room.features.split(',').map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                  {getFeatureIcon(feature.trim())}
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {feature.trim()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pricing */}
      <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              ₦{parseFloat(room.price).toLocaleString()}
            </div>
            <div className="text-green-700 dark:text-green-300 font-medium">
              Per Year (12 months)
            </div>
            <div className="text-sm text-green-600 dark:text-green-400 mt-2">
              • All utilities included
              <br />
              • Security deposit: ₦50,000
              <br />
              • Move-in ready
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Button */}
      <Button
        onClick={handleBooking}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-lg py-3"
        disabled={loading || !room.available}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-5 w-5" />
            Book This Room
          </>
        )}
      </Button>
    </div>
  );

  const renderPaymentSection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Room Reserved Successfully!
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Your room has been reserved. Click "Make Payment" to complete your booking.
        </p>
      </div>

      {bookingData?.transaction && (
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Reference:</span>
                <span className="font-mono text-gray-900 dark:text-white">
                  {bookingData.transaction.reference}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  ₦{parseInt(bookingData.transaction.amount.toString()).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                <span className="text-gray-900 dark:text-white">
                  {bookingData.transaction.duration} months
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Status:</span>
                <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                  {bookingData.transaction.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Button
        onClick={handlePayment}
        className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-5 w-5" />
            Make Payment
          </>
        )}
      </Button>
    </div>
  );

  const renderCurrentContent = () => {
    if (currentStep === 'payment' && bookingData) {
      return renderPaymentSection();
    }
    return renderRoomDetails();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {currentStep === 'payment' ? 'Complete Your Booking' : 'Room Details'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentStep === 'payment' ? 'Final step: Make payment' : 'View room information and book'}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20 mb-6">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <div>
                    <h4 className="font-semibold text-red-800 dark:text-red-200">Error</h4>
                    <p className="text-red-700 dark:text-red-300">{error}</p>
                  </div>
                </div>
                <Button
                  onClick={resetBooking}
                  variant="outline"
                  className="mt-3 border-red-300 text-red-700 hover:bg-red-100"
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          )}

          {currentStep === 'booking' && (
            <div className="space-y-6">
              {/* Room Details */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Room Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Room:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">{room.title}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Price:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                      {new Intl.NumberFormat('en-NG', {
                        style: 'currency',
                        currency: 'NGN',
                        minimumFractionDigits: 0,
                      }).format(parseFloat(room.price))}/year
                    </span>
                  </div>
                </div>
              </div>

              {/* User Information for Payment */}
              {userProfile && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Payment Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-blue-700 dark:text-blue-300">Name:</span>
                      <span className="ml-2 font-medium text-blue-900 dark:text-blue-100">
                        {userProfile.first_name} {userProfile.last_name}
                      </span>
                    </div>
                    <div>
                      <span className="text-blue-700 dark:text-blue-300">Email:</span>
                      <span className="ml-2 font-medium text-blue-900 dark:text-blue-100">
                        {userProfile.email}
                      </span>
                    </div>
                    <div>
                      <span className="text-blue-700 dark:text-blue-300">Phone:</span>
                      <span className="ml-2 font-medium text-blue-900 dark:text-blue-100">
                        {userProfile.phone_number || 'Not provided'}
                      </span>
                    </div>
                    <div>
                      <span className="text-blue-700 dark:text-blue-300">Institution:</span>
                      <span className="ml-2 font-medium text-blue-900 dark:text-blue-100">
                        {userProfile.institution || 'Not provided'}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-3">
                    This information will be used for your payment and booking confirmation.
                  </p>
                </div>
              )}

              <Button
                onClick={handleBooking}
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Booking Room...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Book Room
                  </>
                )}
              </Button>
            </div>
          )}

          {currentStep === 'payment' && bookingData && (
            <div className="space-y-6">
              {/* Payment Summary */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center">
                  <Check className="h-4 w-4 mr-2" />
                  Room Booked Successfully!
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-green-700 dark:text-green-300">Reference:</span>
                    <span className="ml-2 font-mono text-green-900 dark:text-green-100">
                      {bookingData.data.reference}
                    </span>
                  </div>
                  <div>
                    <span className="text-green-700 dark:text-green-300">Amount:</span>
                    <span className="ml-2 font-medium text-green-900 dark:text-green-100">
                      {new Intl.NumberFormat('en-NG', {
                        style: 'currency',
                        currency: 'NGN',
                        minimumFractionDigits: 0,
                      }).format(bookingData.data.amount / 100)} {/* Convert from kobo to naira */}
                    </span>
                  </div>
                  <div>
                    <span className="text-green-700 dark:text-green-300">Duration:</span>
                    <span className="ml-2 font-medium text-green-900 dark:text-green-100">
                      12 months (1 year)
                    </span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Make Payment
                  </>
                )}
              </Button>
            </div>
          )}

          {currentStep === 'verification' && (
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Verifying Payment
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Please wait while we verify your payment. This may take a few moments...
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <p>• Payment received from Paystack</p>
                <p>• Verifying with our system</p>
                <p>• Confirming room booking</p>
              </div>
            </div>
          )}

          {currentStep === 'complete' && (
            <div className="text-center space-y-4">
              <Check className="h-12 w-12 mx-auto text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Payment Successful!
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your room has been booked and payment confirmed. Redirecting to transactions...
              </p>
            </div>
          )}

          {error && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-amber-800 dark:text-amber-200">Payment Status</p>
                  <p className="text-amber-700 dark:text-amber-300 mt-1">{error}</p>
                  {error.includes('Payment was successful') && (
                    <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                      <p className="text-xs text-green-700 dark:text-green-300">
                        ✅ Your payment was processed successfully by Paystack. 
                        You should have received a confirmation email.
                      </p>
                    </div>
                  )}
                  <Button
                    onClick={resetBooking}
                    size="sm"
                    variant="outline"
                    className="mt-2 text-amber-700 border-amber-300 hover:bg-amber-100"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center justify-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
            <Shield className="h-4 w-4 text-green-600" />
            <span>Secure payment powered by Paystack</span>
          </div>
        </div>
      </div>
    </div>
  );
}
