"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ResponsiveHeader } from '@/components/ui/responsive-header';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/lib/auth-context';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Twitter,
  Instagram
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Import the API client dynamically
      const { ApiClient } = await import('@/lib/api-client');
      const apiClient = ApiClient.getInstance();
      
      // Call the sendMessage method
      await apiClient.sendMessage(formData, {
        onSuccess: (data: any) => {
          console.log('Message sent successfully:', data);
          setSubmitStatus('success');
          setFormData({ name: '', email: '', subject: '', message: '' });
          toast({
            title: "Message Sent!",
            description: "Thank you for contacting us. We'll get back to you soon.",
            variant: "default",
          });
        },
        onError: (error: any) => {
          console.error('Error sending message:', error);
          setSubmitStatus('error');
          
          // Provide more specific error messages based on the error type
          let errorMessage = "Failed to send message. Please try again.";
          
          if (error?.message) {
            if (error.message.includes('500') || error.message.includes('Server Error')) {
              errorMessage = "Our messaging service is temporarily unavailable. Please try again later or contact us directly via phone or email.";
            } else if (error.message.includes('Invalid email')) {
              errorMessage = "Please check your email address and try again.";
            } else if (error.message.includes('Invalid name') || error.message.includes('Invalid subject') || error.message.includes('Invalid message')) {
              errorMessage = "Please check your input and try again.";
            } else {
              errorMessage = error.message;
            }
          }
          
          toast({
            title: "Message Not Sent",
            description: errorMessage,
            variant: "destructive",
          });
        }
      });
    } catch (error: any) {
      console.error('Error:', error);
      setSubmitStatus('error');
      
      let errorMessage = "Failed to send message. Please try again.";
      
      if (error?.message) {
        if (error.message.includes('500') || error.message.includes('Server Error')) {
          errorMessage = "Our messaging service is temporarily unavailable. Please try again later or contact us directly via phone or email.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-gray-900">
      {/* Header */}
      <ResponsiveHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions about our accommodation? Need help with booking? 
            We're here to help! Send us a message and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Send us a Message</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Fill out the form below and we'll respond within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      className="border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-gray-700 dark:text-gray-300">
                    Subject *
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What is this about?"
                    className="border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-700 dark:text-gray-300">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more about your inquiry..."
                    className="border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 text-lg font-semibold transition-colors duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>

                                 {/* Status Messages */}
                 {submitStatus === 'success' && (
                   <div className="flex items-center space-x-2 text-green-600 dark:text-green-400 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                     <CheckCircle className="h-5 w-5" />
                     <span>Message sent successfully!</span>
                   </div>
                 )}

                 {submitStatus === 'error' && (
                   <div className="space-y-3">
                     <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                       <AlertCircle className="h-5 w-5" />
                       <span>Failed to send message. Please try again.</span>
                     </div>
                     
                     {/* Alternative contact methods when API is down */}
                     <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                       <p className="text-sm text-amber-800 dark:text-amber-200 mb-2">
                         <strong>Alternative ways to reach us:</strong>
                       </p>
                       <div className="space-y-1 text-sm text-amber-700 dark:text-amber-300">
                         <p>📞 <a href="tel:+2348055453708" className="underline hover:no-underline">Call us directly: +234 805 545 3708</a></p>
                         <p>✉️ <a href="mailto:abikeadecourt@gmail.com" className="underline hover:no-underline">Email us: abikeadecourt@gmail.com</a></p>
                       </div>
                     </div>
                   </div>
                 )}
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Get in Touch</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  We're here to help with any questions you might have
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Address</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      Oke-odo, off konigba Bus-stop,<br />
                      Ago-Iwoye, Ogun State, Nigeria
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Phone</h3>
                    <a 
                      href="tel:+2348055453708" 
                      className="text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                    >
                      +234 805 545 3708
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">WhatsApp</h3>
                    <a 
                      href="https://wa.me/2348082129547" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-500 transition-colors duration-200"
                    >
                      +234 808 212 9547
                    </a>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Click to chat on WhatsApp</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
                    <a 
                      href="mailto:abikeadecourt@gmail.com" 
                      className="text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                    >
                      abikeadecourt@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="flex space-x-2">
                      <Twitter className="h-4 w-4 text-indigo-600" />
                      <Instagram className="h-4 w-4 text-indigo-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Social Media</h3>
                    <div className="flex space-x-4">
                      <a 
                        href="https://x.com/abikeadecourt" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-500 transition-colors duration-200 hover:underline"
                      >
                        Follow us on X
                      </a>
                      <a 
                        href="https://www.instagram.com/abikeadecourt" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-500 transition-colors duration-200 hover:underline"
                      >
                        Follow us on Instagram
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Business Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Monday - Friday</span>
                    <span className="font-semibold text-gray-900 dark:text-white">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Saturday</span>
                    <span className="font-semibold text-gray-900 dark:text-white">9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Sunday</span>
                    <span className="font-semibold text-gray-900 dark:text-white">10:00 AM - 2:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-gray-200 dark:border-gray-800 bg-amber-50 dark:bg-amber-900/20">
              <CardHeader>
                <CardTitle className="text-amber-800 dark:text-amber-200">Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-700 dark:text-amber-300 mb-3">
                  For urgent matters outside business hours, please call:
                </p>
                <a 
                  href="tel:+2348055453708" 
                  className="text-amber-800 dark:text-amber-200 font-semibold text-lg hover:underline"
                >
                  +234 805 545 3708
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
