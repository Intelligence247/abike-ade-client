"use client"

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useCreateAccount } from '@/hooks/use-create-account';
import { useOTP } from '@/hooks/use-otp';
import { ArrowLeft, Eye, EyeOff, Check, Mail, ArrowRight, ArrowLeft as ArrowLeftIcon } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { createAccount, loading: createLoading } = useCreateAccount();
  const { requestOTP, loading: otpLoading } = useOTP();
  
  const [step, setStep] = React.useState<'form' | 'otp'>('form');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [otpSent, setOtpSent] = React.useState(false);
  const [countdown, setCountdown] = React.useState(0);
  
  const [formData, setFormData] = React.useState({
    first_name: '',
    last_name: '',
    email: '',
    code: '',
    phone_number: '',
    username: '',
    password: '',
    confirmPassword: '',
    institution: '',
    department: '',
    level: '',
    agreeToTerms: false
  });

  // Countdown timer for OTP resend
  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return false;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      alert('Password must be at least 8 characters long');
      return false;
    }

    // Validate phone number (11 digits)
    if (!/^\d{11}$/.test(formData.phone_number)) {
      alert('Phone number must be 11 digits');
      return false;
    }

    // Validate username (no spaces)
    if (formData.username.includes(' ')) {
      alert('Username cannot contain spaces');
      return false;
    }

    // Validate email
    if (!formData.email || !formData.email.includes('@')) {
      alert('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleRequestOTP = async () => {
    if (!validateForm()) return;

    const success = await requestOTP(formData.email);
    if (success) {
      setOtpSent(true);
      setStep('otp');
      setCountdown(60); // 60 second countdown
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;
    
    const success = await requestOTP(formData.email);
    if (success) {
      setCountdown(60);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const success = await createAccount({
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      code: formData.code,
      phone_number: formData.phone_number,
      username: formData.username,
      password: formData.password,
      institution: formData.institution,
      department: formData.department,
      level: formData.level
    });

    if (success) {
      router.push('/signin');
    }
  };

  const goBackToForm = () => {
    setStep('form');
    setOtpSent(false);
    setCountdown(0);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <ThemeToggle />
        </div>

        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader className="space-y-1 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">AC</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              {step === 'form' ? 'Join Abike Ade Court' : 'Verify Your Email'}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              {step === 'form' ? 'Create your student account' : 'Enter the verification code sent to your email'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {step === 'form' ? (
              <form onSubmit={(e) => { e.preventDefault(); handleRequestOTP(); }} className="space-y-4">
                {/* Personal Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">First Name *</Label>
                    <Input
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name *</Label>
                    <Input
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="student@university.edu.ng"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone_number">Phone Number *</Label>
                  <Input
                    id="phone_number"
                    name="phone_number"
                    placeholder="08011223344 (11 digits)"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username *</Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="johndoe (no spaces)"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Academic Information */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="institution">Institution *</Label>
                    <Input
                      id="institution"
                      name="institution"
                      placeholder="University of Lagos"
                      value={formData.institution}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department *</Label>
                    <Input
                      id="department"
                      name="department"
                      placeholder="Computer Science"
                      value={formData.department}
                      onChange={handleInputChange}
                      required
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

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password (min 8 characters)"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
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
                  disabled={otpLoading || !formData.agreeToTerms}
                >
                  {otpLoading ? 'Sending OTP...' : (
                    <>
                      Send Verification Code
                      <Mail className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* OTP Verification */}
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center">
                    <Mail className="h-12 w-12 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">
                      We've sent a verification code to:
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {formData.email}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="code">Verification Code *</Label>
                  <Input
                    id="code"
                    name="code"
                    placeholder="Enter 6-digit code"
                    value={formData.code}
                    onChange={handleInputChange}
                    required
                    maxLength={8}
                    className="text-center text-lg tracking-widest"
                  />
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Didn't receive the code?{' '}
                    {countdown > 0 ? (
                      <span className="text-gray-500">
                        Resend in {countdown}s
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendOTP}
                        className="text-indigo-600 hover:text-indigo-500 font-medium"
                      >
                        Resend Code
                      </button>
                    )}
                  </p>
                </div>

                <div className="flex space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goBackToForm}
                    className="flex-1"
                  >
                    <ArrowLeftIcon className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                    disabled={createLoading}
                  >
                    {createLoading ? 'Creating Account...' : (
                      <>
                        Create Account
                        <Check className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}

            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link href="/signin" className="text-indigo-600 hover:text-indigo-500 font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}