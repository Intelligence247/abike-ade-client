"use client"

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/lib/auth-context';
import { 
  Shield, 
  Wifi, 
  Users, 
  Car, 
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Building,
  User,
  LogOut,
  Droplets,
  Zap,
  Star
} from 'lucide-react';

export default function LandingPage() {
  const { isAuthenticated, isLoading, logout } = useAuth();

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AC</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Abike Ade Court
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {isLoading ? (
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              ) : isAuthenticated ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="outline" size="sm" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/rooms">
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Building className="mr-2 h-4 w-4" />
                      Rooms
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                {isAuthenticated && !isLoading && (
                  <div className="inline-flex items-center px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full shadow-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-sm font-medium text-green-800 dark:text-green-200">
                      Welcome back! You're signed in
                    </span>
                  </div>
                )}
                
                <div className="space-y-4">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                    Your Perfect
                    <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Home Away From Home
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
                    Experience premium student accommodation designed for modern Nigerian university students. 
                    Safe, comfortable, and affordable housing with all the amenities you need for academic success.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/rooms">
                  <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-10 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    Browse Rooms
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </Button>
                </Link>
                {!isLoading && (
                  !isAuthenticated ? (
                    <Link href="/register">
                      <Button variant="outline" size="lg" className="px-10 py-6 text-lg font-semibold border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300">
                        Get Started
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/dashboard">
                      <Button variant="outline" size="lg" className="px-10 py-6 text-lg font-semibold border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300">
                        Go to Dashboard
                      </Button>
                    </Link>
                  )
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">200+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Happy Students</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">50+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Rooms Available</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">4.8★</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Student Rating</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img 
                  src="https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                  alt="Modern hostel room"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                
                {/* Floating Stats Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">₦150,000</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Starting from</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">24/7</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Security</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Images Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Take a Look Around
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our modern facilities and comfortable living spaces designed for your success
            </p>
          </div>
          
          {/* FeaturedImages component was removed from imports, so this section will be empty or require a new import */}
          {/* For now, keeping the structure but noting the missing component */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder for featured images */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Room 101
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Modern and spacious room for students.
              </p>
              <img 
                src="https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Featured Room 101"
                className="w-full h-40 object-cover rounded-md mt-4"
              />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Room 102
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Cozy and affordable room for students.
              </p>
              <img 
                src="https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Featured Room 102"
                className="w-full h-40 object-cover rounded-md mt-4"
              />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Room 103
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Modern and private room for students.
              </p>
              <img 
                src="https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Featured Room 103"
                className="w-full h-40 object-cover rounded-md mt-4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Abike Ade Court?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We provide everything you need for a comfortable and productive student life
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "24/7 Security",
                description: "Round-the-clock security personnel and CCTV surveillance for your safety",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Wifi,
                title: "High-Speed WiFi",
                description: "Fast and reliable internet connection for your studies and entertainment",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Droplets,
                title: "Clean Water",
                description: "24/7 access to clean, treated water for drinking and daily use",
                color: "from-blue-500 to-indigo-500"
              },
              {
                icon: Zap,
                title: "Uninterrupted Power",
                description: "Backup power systems to ensure you never experience blackouts",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: Car,
                title: "Free Parking",
                description: "Secure parking space for students with vehicles",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: Users,
                title: "Community Events",
                description: "Regular social events and activities to build lasting friendships",
                color: "from-red-500 to-pink-500"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Don't just take our word for it - hear from our satisfied residents
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "John Doe",
                program: "Computer Science Student",
                rating: 5,
                quote: "This place is amazing! The staff is super friendly and the facilities are top-notch. I highly recommend it to anyone looking for a home away from home.",
                avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
              },
              {
                name: "Jane Smith",
                program: "Business Administration Student",
                rating: 5,
                quote: "The location is perfect, right in the heart of the university. The rooms are clean and the staff is always available to help. I've made many friends here!",
                avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
              },
              {
                name: "Peter Jones",
                program: "Engineering Student",
                rating: 5,
                quote: "The facilities are excellent. I've been able to focus on my studies and enjoy a comfortable living environment. The community here is also very welcoming.",
                avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
              }
            ].map((testimonial, index) => (
              <div key={index} className="group relative">
                <div className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                  {/* Rating Stars */}
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <blockquote className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed italic">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  {/* Author */}
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-100 dark:ring-indigo-900"
                    />
                    <div className="ml-4">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.program}
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative quote mark */}
                  <div className="absolute top-6 right-6 text-6xl text-indigo-200 dark:text-indigo-800 font-serif opacity-50">
                    "
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Make Abike Ade Court Your Home?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied students who have made the smart choice for their accommodation needs.
          </p>
          <Link href="/rooms">
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 px-8">
              Browse Available Rooms
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Find Your Perfect Room?
            </h2>
            <p className="text-xl text-indigo-100 mb-10 leading-relaxed">
              Join hundreds of satisfied students who have found their ideal accommodation at Abike Ade Court. 
              Start your journey to comfortable, secure, and affordable student living today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isAuthenticated ? (
                <>
                  <Link href="/rooms">
                    <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 px-10 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      Browse Available Rooms
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-10 py-6 text-lg font-semibold transition-all duration-300">
                      Get Started Now
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/rooms">
                    <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 px-10 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      View All Rooms
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-10 py-6 text-lg font-semibold transition-all duration-300">
                      Go to Dashboard
                    </Button>
                  </Link>
                </>
              )}
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">98%</div>
                <div className="text-indigo-100">Student Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-indigo-100">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">₦150K</div>
                <div className="text-indigo-100">Starting Price</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">AC</span>
                </div>
                <span className="text-2xl font-bold">Abike Ade Court</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Premium student accommodation designed for modern Nigerian university students. 
                Safe, comfortable, and affordable housing with all the amenities you need.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer">
                  <span className="text-sm font-semibold">FB</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer">
                  <span className="text-sm font-semibold">IG</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer">
                  <span className="text-sm font-semibold">TW</span>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link href="/rooms" className="text-gray-300 hover:text-white transition-colors">Browse Rooms</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-indigo-400" />
                  <span className="text-gray-300">Lagos, Nigeria</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-indigo-400" />
                  <span className="text-gray-300">+234 123 456 7890</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-indigo-400" />
                  <span className="text-gray-300">info@abikeadecourt.com</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Abike Ade Court. All rights reserved. | Designed with ❤️ for Nigerian students
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}