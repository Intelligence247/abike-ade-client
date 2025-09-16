"use client"

import React from 'react';
import Link from 'next/link';
import { ResponsiveHeader } from '@/components/ui/responsive-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  MapPin, 
  Shield, 
  Zap, 
  Droplets, 
  Wifi, 
  Users, 
  Building,
  CheckCircle
} from 'lucide-react';

export default function AboutPage() {
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
            About Abike Ade Court
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Introducing the newest addition to student housing - a self-contained hostel designed specifically for students.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Content */}
            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Our Story</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  A home away from home for Nigerian university students
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  Located just a 15-minute walk from the main university campus, this hostel offers convenience and comfort for students looking for a place to call home during their academic years.
                </p>
                
                <p>
                  One of the main highlights of this hostel is its focus on individual apartments. Each apartment is fully tiled and comes equipped with its own pre-paid meter, giving students control over their own electricity usage. This not only promotes responsibility but also helps students budget their expenses effectively.
                </p>

                <p>
                  In addition, the hostel is equipped with solar lights surrounding the compound, ensuring a constant and reliable source of lighting for students. Safety and security are also top priorities, with 24-hour security guards and CCTV cameras installed throughout the compound. Students can feel at ease knowing that their well-being is being taken care of.
                </p>

                <p>
                  Furthermore, the hostel boasts a 24-hour water system, providing students with uninterrupted access to water. For students who prefer to have their own personal generator, the hostel is already wired to accommodate this, providing students with the option to have their own personal electricity supply.
                </p>

                <p>
                  For those who like to stay connected, cable for DSTV or other providers is available in each apartment, along with the option to install air conditioning units. And to top it off, cleaners are arranged for the compound, ensuring that students can focus on their studies without having to worry about the upkeep of their living space.
                </p>

                <p className="font-semibold">
                  In conclusion, this self-contained student hostel offers everything a student needs to thrive during their university years. With its convenient location, modern amenities, and focus on safety and security, it is the perfect place for students to call home away from home.
                </p>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Location</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Conveniently located near the university campus
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Prime Location</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Just a 15-minute walk from the main university campus, making it easy for students to attend classes and access campus facilities.
                    </p>
                    <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Address:</strong> Oke-odo, off konigba Bus-stop, Ago-Iwoye, Ogun State, Nigeria
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key Features */}
            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Key Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Fully tiled apartments</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Pre-paid electricity meters</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Solar lighting system</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">24/7 security & CCTV</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">24-hour water supply</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">DSTV cable ready</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Professional cleaning service</span>
                </div>
              </CardContent>
            </Card>

                         {/* Contact CTA */}
             <Card className="border-gray-200 dark:border-gray-800 bg-blue-50 dark:bg-blue-900/10">
               <CardContent className="p-6 text-center">
                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                   Ready to Join Us?
                 </h3>
                 <p className="text-gray-600 dark:text-gray-400 mb-4">
                   Experience the perfect student accommodation
                 </p>
                 <Link href="/rooms">
                   <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                     Browse Available Rooms
                   </button>
                 </Link>
               </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
