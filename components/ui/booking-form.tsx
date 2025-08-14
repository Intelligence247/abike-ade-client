"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { constructImageUrl } from '@/lib/utils';
import { Room } from '@/hooks/use-rooms';
import { useRoomBooking, BookingResponse } from '@/hooks/use-room-booking';
import { 
  Calendar,
  CreditCard,
  CheckCircle,
  Shield,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Clock,
  User,
  Mail,
  Phone,
  Building,
  GraduationCap
} from 'lucide-react';

interface BookingFormProps {
  room: Room;
}

export function BookingForm({ room }: BookingFormProps) {
  const router = useRouter();
  const { 
    loading, 
    error, 
    currentStep, 
    bookRoom, 
    makePayment, 
    verifyPayment, 
    resetBooking 
  } = useRoomBooking();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    university: '',
    program: '',
    level: '',
    moveInDate: '',
    duration: '12',
    agreeToTerms: false
  });

  const [bookingData, setBookingData] = useState<BookingResponse | null>(null);
  const [paymentReference, setPaymentReference] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      agreeToTerms: checked
    });
  };

  const calculateTotal = () => {
    try {
      const basePrice = parseFloat(room.price);
      if (isNaN(basePrice)) {
        return 0;
      }
      const duration = parseInt(formData.duration);
      return basePrice * duration;
    } catch (error) {
      return 0;
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    const response = await bookRoom(room.id);
    if (response) {
      setBookingData(response);
    }
  };

  const handlePayment = async () => {
    if (!bookingData?.data) return;

    const response = await makePayment(bookingData.data);
    if (response) {
      setPaymentReference(response.reference);
      // After payment, verify it
      setTimeout(() => {
        verifyPayment(response.reference);
      }, 2000);
    }
  };

  const handleVerification = async () => {
    if (!paymentReference) return;
    
    const response = await verifyPayment(paymentReference);
    if (response) {
    // Redirect to success page or dashboard
      setTimeout(() => {
    router.push('/dashboard');
      }, 2000);
    }
  };

  const totalAmount = calculateTotal();

  const getStepIcon = (step: string) => {
    switch (step) {
      case 'booking':
        return <User className="h-5 w-5" />;
      case 'payment':
        return <CreditCard className="h-5 w-5" />;
      case 'verification':
        return <CheckCircle className="h-5 w-5" />;
      case 'complete':
        return <CheckCircle2 className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  const getStepStatus = (step: string) => {
    if (currentStep === step) return 'current';
    if (['payment', 'verification', 'complete'].includes(step) && currentStep !== 'booking') return 'completed';
    return 'pending';
  };

  const renderProgressSteps = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {['booking', 'payment', 'verification', 'complete'].map((step, index) => (
          <div key={step} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              getStepStatus(step) === 'completed' 
                ? 'bg-green-500 border-green-500 text-white' 
                : getStepStatus(step) === 'current'
                ? 'bg-indigo-500 border-indigo-500 text-white'
                : 'bg-gray-200 border-gray-300 text-gray-500'
            }`}>
              {getStepStatus(step) === 'completed' ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                getStepIcon(step)
              )}
                  </div>
            {index < 3 && (
              <div className={`w-16 h-0.5 mx-2 ${
                getStepStatus(step) === 'completed' ? 'bg-green-500' : 'bg-gray-300'
              }`} />
                    )}
                  </div>
        ))}
                </div>
      <div className="flex justify-between mt-2 text-sm">
        <span className={getStepStatus('booking') === 'current' ? 'text-indigo-600 font-medium' : 'text-gray-500'}>
          Booking Details
        </span>
        <span className={getStepStatus('payment') === 'current' ? 'text-indigo-600 font-medium' : 'text-gray-500'}>
          Payment
        </span>
        <span className={getStepStatus('verification') === 'current' ? 'text-indigo-600 font-medium' : 'text-gray-500'}>
          Verification
        </span>
        <span className={getStepStatus('complete') === 'current' ? 'text-indigo-600 font-medium' : 'text-gray-500'}>
          Complete
        </span>
                  </div>
                </div>
  );

  const renderBookingForm = () => (
    <form onSubmit={handleBookingSubmit} className="space-y-6">
                {/* Personal Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 dark:border-gray-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 dark:border-gray-600"
                    />
                  </div>
                </div>

                {/* Academic Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
          <Label htmlFor="university">University *</Label>
                    <Input
                      id="university"
                      name="university"
                      value={formData.university}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
          <Label htmlFor="program">Program *</Label>
                    <Input
                      id="program"
                      name="program"
                      value={formData.program}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
          <Label htmlFor="level">Level *</Label>
          <Select onValueChange={(value) => handleSelectChange('level', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
              <SelectItem value="100L">100 Level</SelectItem>
              <SelectItem value="200L">200 Level</SelectItem>
              <SelectItem value="300L">300 Level</SelectItem>
              <SelectItem value="400L">400 Level</SelectItem>
              <SelectItem value="500L">500 Level</SelectItem>
              <SelectItem value="postgrad">Postgraduate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
          <Label htmlFor="moveInDate">Move-in Date *</Label>
                    <Input
                      id="moveInDate"
                      name="moveInDate"
                      type="date"
                      value={formData.moveInDate}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
          <Label htmlFor="duration">Duration (months) *</Label>
          <Select onValueChange={(value) => handleSelectChange('duration', value)}>
                      <SelectTrigger>
              <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
              <SelectItem value="3">3 months</SelectItem>
              <SelectItem value="6">6 months</SelectItem>
              <SelectItem value="12">12 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                    <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={handleCheckboxChange}
          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          required
        />
        <label htmlFor="agreeToTerms" className="text-sm text-gray-600 dark:text-gray-400">
          I agree to the{' '}
          <Link href="#" className="text-indigo-600 hover:text-indigo-500">
            Terms of Service
          </Link>
          {' '}and{' '}
          <Link href="#" className="text-indigo-600 hover:text-indigo-500">
            Privacy Policy
          </Link>
        </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
        disabled={loading || !formData.agreeToTerms}
                >
        {loading ? (
                    <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing Booking...
                    </>
                  ) : (
                    <>
            Proceed to Payment
            <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
  );

  const renderPaymentSection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Room Booked Successfully!
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Your room has been reserved. Now let's complete the payment to confirm your booking.
        </p>
      </div>

      {bookingData?.transaction && (
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200">Transaction Details</h4>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                {bookingData.transaction.status}
              </Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Reference:</span>
                <span className="font-mono text-gray-900 dark:text-white">{bookingData.transaction.reference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  ₦{parseInt(bookingData.transaction.amount.toString()).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                <span className="text-gray-900 dark:text-white">{bookingData.transaction.duration} months</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Button
        onClick={handlePayment}
        className="w-full bg-green-600 hover:bg-green-700"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-4 w-4" />
            Proceed to Payment
          </>
        )}
      </Button>
    </div>
  );

  const renderVerificationSection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Clock className="h-16 w-16 text-amber-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Payment Processing
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          We're verifying your payment. This may take a few moments...
        </p>
      </div>

      <div className="flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>

      <Button
        onClick={handleVerification}
        className="w-full bg-amber-600 hover:bg-amber-700"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Verifying Payment...
          </>
        ) : (
          <>
            <CheckCircle className="mr-2 h-4 w-4" />
            Check Payment Status
          </>
        )}
      </Button>
    </div>
  );

  const renderCompleteSection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Booking Complete!
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Congratulations! Your room has been successfully booked and payment confirmed.
        </p>
      </div>

      <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <p className="text-green-800 dark:text-green-200">
              You will receive a confirmation email shortly with all the details.
            </p>
            <p className="text-sm text-green-700 dark:text-green-300">
              Redirecting to dashboard...
            </p>
          </div>
            </CardContent>
          </Card>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'booking':
        return renderBookingForm();
      case 'payment':
        return renderPaymentSection();
      case 'verification':
        return renderVerificationSection();
      case 'complete':
        return renderCompleteSection();
      default:
        return renderBookingForm();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Steps */}
          {renderProgressSteps()}

          {/* Error Display */}
          {error && (
            <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
              <CardContent className="p-6">
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
                  className="mt-4 border-red-300 text-red-700 hover:bg-red-100"
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Current Step Content */}
          {renderCurrentStep()}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Room Summary */}
          <Card className="border-gray-200 dark:border-gray-800 sticky top-8">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Room Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {room.images && room.images.length > 0 ? (
                  <img
                    src={constructImageUrl(process.env.NEXT_PUBLIC_BASE_URL, room.images[0].image)}
                    alt={room.images[0].description || room.title}
                    className="w-full h-48 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-full h-48 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">No Image</span>
                </div>
                )}
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {room.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Room ID: {room.id}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant={room.available ? "default" : "secondary"}>
                      {room.available ? 'Available' : 'Occupied'}
                    </Badge>
                </div>
              </div>

              <Separator />

                {/* Pricing */}
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    ₦{parseFloat(room.price).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">per month</div>
              </div>

                {/* Duration Selection */}
                {currentStep === 'booking' && (
                  <>
                    <Separator />
                    <div>
                      <Label htmlFor="duration" className="text-sm font-medium">Duration</Label>
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        {formData.duration} months
                      </div>
                    </div>
                  </>
                )}

                {/* Total Amount */}
                {currentStep === 'booking' && (
                  <>
                    <Separator />
                    <div>
                      <Label className="text-sm font-medium">Total Amount</Label>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        ₦{totalAmount.toLocaleString()}
                      </div>
                    </div>
                  </>
                )}

                {/* Features */}
                {room.features && (
                  <>
                    <Separator />
                    <div>
                      <Label className="text-sm font-medium">Features</Label>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {room.features}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Security Info */}
          <Card className="border-gray-200 dark:border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-5 w-5 text-green-600" />
                <h4 className="font-semibold text-gray-900 dark:text-white">Secure Booking</h4>
                </div>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>• SSL encrypted connection</p>
                <p>• Secure payment processing</p>
                <p>• Data protection compliant</p>
                <p>• 24/7 customer support</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 