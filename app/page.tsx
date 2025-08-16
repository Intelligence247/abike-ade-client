"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ResponsiveHeader } from '@/components/ui/responsive-header';
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
  Droplets,
  Zap,
  Star
} from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  const { isAuthenticated, isLoading, logout } = useAuth();

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 6;

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Pause auto-play on hover
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Update carousel transform
  useEffect(() => {
    const carousel = document.getElementById('testimonials-carousel');
    if (carousel) {
      carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }, [currentSlide]);

  // Gallery Carousel state
  const [currentGallerySlide, setCurrentGallerySlide] = useState(0);
  const totalGallerySlides = 5;

  const nextGallerySlide = () => {
    setCurrentGallerySlide((prev) => (prev + 1) % totalGallerySlides);
  };

  const previousGallerySlide = () => {
    setCurrentGallerySlide((prev) => (prev - 1 + totalGallerySlides) % totalGallerySlides);
  };

  const goToGallerySlide = (index: number) => {
    setCurrentGallerySlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextGallerySlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextGallerySlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    const carousel = document.getElementById('gallery-carousel');
    if (carousel) {
      carousel.style.transform = `translateX(-${currentGallerySlide * 100}%)`;
    }
  }, [currentGallerySlide]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-gray-900">
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInOut {
          0%, 20% { opacity: 1; }
          25%, 95% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }
        
        .animate-slide-in-up {
          animation: slideInUp 0.8s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
      {/* Header */}
      <ResponsiveHeader />

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                {isAuthenticated && !isLoading && (
                  <div className="inline-flex items-center px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full shadow-sm animate-fade-in">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-sm font-medium text-green-800 dark:text-green-200">
                      Welcome back! You're signed in
                    </span>
                  </div>
                )}

                <div className="space-y-4 animate-slide-in-left">
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

              <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-left" style={{ animationDelay: '200ms' }}>
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

              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200 dark:border-gray-700 animate-fade-in" style={{ animationDelay: '400ms' }}>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">200+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Happy Students</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">50+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Rooms Available</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">4.8★</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Student Rating</div>
                </div>
              </div>
            </div>

            {/* Hero Image Carousel */}
            <div className="relative animate-slide-in-right">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <div className="relative h-[600px] overflow-hidden">
                  {[
                    "/Hostel-Images/image1.jpg",
                    "/Hostel-Images/image2.jpg",
                    "/Hostel-Images/image3.jpg",
                    "/Hostel-Images/image4.jpg",
                    "/Hostel-Images/image5.jpg"
                  ].map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Modern hostel room ${index + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === 0 ? 'opacity-100' : 'opacity-0'
                        }`}
                      style={{
                        animation: index === 0 ? 'fadeInOut 10s infinite' : 'none',
                        animationDelay: `${index * 2}s`
                      }}
                    />
                  ))}
                </div>

                {/* Floating Stats Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl animate-slide-in-up">
                  <div className="flex items-center justify-between">
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
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">
              Take a Look Around
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
              Explore our modern facilities and comfortable living spaces designed for your success
            </p>
          </div>

          {/* Image Gallery Carousel */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div className="flex transition-transform duration-700 ease-out" id="gallery-carousel">
                {[
                  {
                    image: "/Hostel-Images/image6.jpg",
                    title: "Modern Living Spaces",
                    description: "Contemporary rooms designed for comfort and productivity"
                  },
                  {
                    image: "/Hostel-Images/image7.jpg",
                    title: "Study Areas",
                    description: "Quiet zones perfect for focused academic work"
                  },
                  {
                    image: "/Hostel-Images/image8.jpg",
                    title: "Common Areas",
                    description: "Spacious lounges for socializing and relaxation"
                  },
                  {
                    image: "/Hostel-Images/image9.jpg",
                    title: "Dining Facilities",
                    description: "Modern kitchen and dining spaces for communal meals"
                  },
                  {
                    image: "/Hostel-Images/image10.jpg",
                    title: "Outdoor Spaces",
                    description: "Beautiful outdoor areas for fresh air and recreation"
                  }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                    style={{ minWidth: '100%' }}
                  >
                    <div className="group relative h-full">
                      <div className="relative h-80 bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                          <p className="text-sm text-gray-200">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {[...Array(5)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToGallerySlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${currentGallerySlide === index
                      ? 'bg-indigo-600 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  aria-label={`Go to gallery image ${index + 1}`}
                />
              ))}
            </div>

            {/* Gallery Navigation Arrows */}
            <button
              onClick={previousGallerySlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-700"
              aria-label="Previous gallery image"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextGallerySlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-700"
              aria-label="Next gallery image"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">
              Why Choose Abike Ade Court?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
              We provide everything you need for a comfortable and productive student life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "24/7 Security",
                description: "Round-the-clock security personnel and CCTV surveillance for your safety",
                color: "from-blue-500 to-cyan-500",
                image: "/Hostel-Images/image11.jpg"
              },
              {
                icon: Wifi,
                title: "High-Speed WiFi",
                description: "Fast and reliable internet connection for your studies and entertainment",
                color: "from-green-500 to-emerald-500",
                image: "/Hostel-Images/image12.jpg"
              },
              {
                icon: Droplets,
                title: "Clean Water",
                description: "24/7 access to clean, treated water for drinking and daily use",
                color: "from-blue-500 to-indigo-500",
                image: "/Hostel-Images/image13.jpg"
              },
              {
                icon: Zap,
                title: "Uninterrupted Power",
                description: "Backup power systems to ensure you never experience blackouts",
                color: "from-yellow-500 to-orange-500",
                image: "/Hostel-Images/image14.jpg"
              },
              {
                icon: Car,
                title: "Free Parking",
                description: "Secure parking space for students with vehicles",
                color: "from-purple-500 to-pink-500",
                image: "/Hostel-Images/image15.jpg"
              },
              {
                icon: Users,
                title: "Community Events",
                description: "Regular social events and activities to build lasting friendships",
                color: "from-red-500 to-pink-500",
                image: "/Hostel-Images/image1.jpg"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden">
                  {/* Background Image */}
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Life Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">
              Experience Student Life
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
              See how our students live, study, and thrive in our modern accommodation
            </p>
          </div>

          {/* Student Life Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                image: "/Hostel-Images/image2.jpg",
                title: "Study Sessions",
                description: "Quiet study areas for focused learning"
              },
              {
                image: "/Hostel-Images/image3.jpg",
                title: "Social Spaces",
                description: "Common areas for building friendships"
              },
              {
                image: "/Hostel-Images/image4.jpg",
                title: "Modern Amenities",
                description: "Contemporary facilities for daily comfort"
              },
              {
                image: "/Hostel-Images/image5.jpg",
                title: "Outdoor Living",
                description: "Beautiful outdoor spaces for relaxation"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="group relative animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-200 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.description}
                    </p>
                  </div>

                  {/* Hover Indicator */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
              Don't just take our word for it - hear from our satisfied residents
            </p>
          </div>

          {/* Testimonials Carousel */}
          <div className="relative">
            <div
              className="overflow-hidden rounded-2xl"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="flex transition-transform duration-700 ease-out" id="testimonials-carousel">
                {[
                  {
                    name: "Taiwo Baraka",
                    room: "Room 20",
                    rating: 5,
                    quote: "Had an amazing stay at Abike Ade's Court! The hostel was clean, comfortable, and perfectly located. The facilities exceeded my expectations with the perfect blend of social vibes and quiet spaces. You're definitely getting value for your money. Highly recommended!",
                    avatar: "/Testimonials/adeleye.jpg"
                  },
                  {
                    name: "Aisha",
                    room: "Room 2",
                    rating: 5,
                    quote: "Abike Ade Court is a very convenient place to live. As a student, I appreciate the hostel's functionality and simplicity. The common room is a great spot to relax and socialize with fellow students. I'm completely satisfied with my living arrangements.",
                    avatar: "/Testimonials/aisha.jpg"
                  },
                  {
                    name: "Gbemisola",
                    room: "Room 17",
                    rating: 5,
                    quote: "I'd highly recommend Abike Ade Court if you're looking for a place that feels like home. It truly is 'home away from home' - comfortable with amazing security. The common area is perfect for relaxing, socializing, and getting work done.",
                    avatar: "/Testimonials/gbemisola.jpg"
                  },
                  {
                    name: "Joshua",
                    room: "Room 18",
                    rating: 5,
                    quote: "My experience was very positive. The hostel was clean and well-maintained with convenient access to public transport and shops. I especially appreciate the personal transformer you provided for our hostel. Thank you for going the extra mile!",
                    avatar: "/Testimonials/joshua.jpg"
                  },
                  {
                    name: "Ifemade",
                    room: "Room 16",
                    rating: 5,
                    quote: "Abike Ade Court exemplifies the essence of a home away from home. From impeccably maintained facilities to the serene and welcoming atmosphere, every aspect has been thoughtfully curated for comfort and peace of mind.",
                    avatar: "/Testimonials/ifemade.jpg"
                  },
                  {
                    name: "Mubarak",
                    room: "Room 20",
                    rating: 5,
                    quote: "Staying at Abike Ade Court was one of the best decisions I made. It's equipped with all essentials for academics and leisure. The location is perfect for accessing schools, the environment is sparkling clean, and the landlord is super friendly. Don't miss out on this amazing experience!",
                    avatar: "/Testimonials/mubarak.jpg"
                  }
                ].map((testimonial, index) => (
                  <div
                    key={index}
                    className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                    style={{ minWidth: '100%' }}
                  >
                    <div className="group relative h-full">
                      <div className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 h-full backdrop-blur-sm">
                        {/* Rating Stars with animation */}
                        <div className="flex items-center mb-6">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-5 w-5 fill-amber-400 text-amber-400 animate-pulse"
                              style={{ animationDelay: `${i * 100}ms` }}
                            />
                          ))}
                        </div>

                        {/* Quote with fade-in effect */}
                        <blockquote className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed italic transition-all duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-200">
                          "{testimonial.quote}"
                        </blockquote>

                        {/* Author with hover effect */}
                        <div className="flex items-center mt-auto transition-transform duration-300 group-hover:scale-105">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-100 dark:ring-indigo-900 transition-all duration-300 group-hover:ring-indigo-300 dark:group-hover:ring-indigo-600"
                          />
                          <div className="ml-4">
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {testimonial.name}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {testimonial.room}
                            </div>
                          </div>
                        </div>

                        {/* Decorative quote mark with animation */}
                        <div className="absolute top-6 right-6 text-6xl text-indigo-200 dark:text-indigo-800 font-serif opacity-50 transition-all duration-300 group-hover:opacity-70 group-hover:scale-110">
                          "
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {/* Progress Bar */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all duration-100 ease-linear"
                  style={{
                    width: `${((currentSlide + 1) / totalSlides) * 100}%`,
                    transition: isPaused ? 'none' : 'width 5s linear'
                  }}
                />
              </div>

              {[...Array(6)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index
                      ? 'bg-indigo-600 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={previousSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-700"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-700"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
          <Link href="/rooms">
            <Button
              size="lg"
              className="relative bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full w-16 h-16 p-0 shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
            >
              <Building className="w-8 h-8" />
            </Button>
          </Link>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold animate-bounce">
            !
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 animate-fade-in">
            Ready to Make Abike Ade Court Your Home?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
            Join hundreds of satisfied students who have made the smart choice for their accommodation needs.
          </p>
          <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
            <Link href="/rooms">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 px-8 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
                Browse Available Rooms
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
              Ready to Find Your Perfect Room?
            </h2>
            <p className="text-xl text-indigo-100 mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: '200ms' }}>
              Join hundreds of satisfied students who have found their ideal accommodation at Abike Ade Court.
              Start your journey to comfortable, secure, and affordable student living today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '400ms' }}>
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
            <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20 animate-fade-in" style={{ animationDelay: '600ms' }}>
              <div className="text-center group">
                <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">98%</div>
                <div className="text-indigo-100 group-hover:text-white transition-colors duration-300">Student Satisfaction</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
                <div className="text-indigo-100 group-hover:text-white transition-colors duration-300">Support Available</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">₦150K</div>
                <div className="text-indigo-100 group-hover:text-white transition-colors duration-300">Starting Price</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2 animate-fade-in">
              <div className="flex items-center space-x-3 mb-6">
               <Image src="/logo.png" alt="Abike Ade Court" width={32} height={32} />
                <span className="text-2xl font-bold">Abikeadecourt</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Premium student accommodation designed for modern Nigerian university students.
                Safe, comfortable, and affordable housing with all the amenities you need.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-all duration-300 cursor-pointer transform hover:scale-110">
                  <span className="text-sm font-semibold">FB</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-all duration-300 cursor-pointer transform hover:scale-110">
                  <span className="text-sm font-semibold">IG</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-all duration-300 cursor-pointer transform hover:scale-110">
                  <span className="text-sm font-semibold">TW</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link href="/rooms" className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Browse Rooms</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">Contact</Link></li>
                <li><Link href="/faq" className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block">FAQ</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
              <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 group">
                  <MapPin className="h-5 w-5 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">Lagos, Nigeria</span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <Phone className="h-5 w-5 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">+234 123 456 7890</span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <Mail className="h-5 w-5 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">info@abikeadecourt.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center animate-fade-in" style={{ animationDelay: '600ms' }}>
            <p className="text-gray-400">
              © 2024 Abike Ade Court. All rights reserved. | Designed with ❤️ for Nigerian students
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}