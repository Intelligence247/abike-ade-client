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
  Star,
  Twitter,
  Instagram
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

  // Hero Image Carousel state
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const heroImages = [
    "/Hostel-Images/image9.jpg",
    "/Hostel-Images/image12.jpg", 
    "/Hostel-Images/image13.jpg",
    "/Hostel-Images/image14.jpg",
    "/Hostel-Images/image15.jpg",
    "/Hostel-Images/image11.jpg",
    "/Hostel-Images/image10.jpg"
  ];

  // Auto-change hero images every 3 seconds
  useEffect(() => {
    if (isHeroPaused) return;
    
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHeroPaused]);

  const nextHeroImage = () => {
    setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
  };

  const previousHeroImage = () => {
    setCurrentHeroImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

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

        @keyframes heroImageFade {
          0%, 15% { opacity: 1; }
          20%, 95% { opacity: 0; }
          100% { opacity: 1; }
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

        .hero-image-transition {
          transition: opacity 1s ease-in-out;
        }
      `}</style>
      {/* Header */}
      <ResponsiveHeader />

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-blue-50 dark:bg-gray-900" />

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
                    <span className="block text-indigo-600 dark:text-indigo-400">
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
                  <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
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
              <div 
                className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500"
                onMouseEnter={() => setIsHeroPaused(true)}
                onMouseLeave={() => setIsHeroPaused(false)}
              >
                <div className="relative h-[600px] overflow-hidden">
                  {heroImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Modern hostel room ${index + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                        index === currentHeroImage ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={previousHeroImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={nextHeroImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Image Navigation Dots */}
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentHeroImage(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentHeroImage 
                          ? 'bg-white scale-125' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
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
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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
                title: "24/7 Security Guarantee",
                description: "Round-the-clock security personnel and CCTV surveillance for your safety",
                color: "bg-blue-500",
                image: "/Hostel-Images/image11.jpg"
              },
              {
                icon: Wifi,
                title: "High-Speed WiFi",
                description: "Fast and reliable internet connection for your studies and entertainment",
                color: "bg-green-500",
                image: "/Hostel-Images/image12.jpg"
              },
              {
                icon: Droplets,
                title: "Clean Water",
                description: "24/7 access to clean, treated water for drinking and daily use",
                color: "bg-blue-500",
                image: "/Hostel-Images/image13.jpg"
              },
              {
                icon: Zap,
                title: "Uninterrupted Power",
                description: "Backup power systems to ensure you never experience blackouts",
                color: "bg-yellow-500",
                image: "/Hostel-Images/image14.jpg"
              },
              {
                icon: Car,
                title: "Free Parking",
                description: "Secure parking space for students with vehicles",
                color: "bg-purple-500",
                image: "/Hostel-Images/image15.jpg"
              },
              {
                icon: Users,
                title: "Community Events",
                description: "Regular social events and activities to build lasting friendships",
                color: "bg-red-500",
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
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
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
                  <div className="absolute inset-0 bg-indigo-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
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
                            className="md:w-20 md:h-20 w-16 h-16 rounded-full object-cover ring-2 ring-indigo-100 dark:ring-indigo-900 transition-all duration-300 group-hover:ring-indigo-300 dark:group-hover:ring-indigo-600"
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
          <div className="absolute inset-0 bg-indigo-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
          <Link href="/rooms">
            <Button
              size="lg"
              className="relative bg-indigo-600 hover:bg-indigo-700 text-white rounded-full w-16 h-16 p-0 shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
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
      <section className="py-20 bg-indigo-600 relative overflow-hidden">
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

      {/* In Loving Memory Section */}
      <section className="py-20 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-rose-900/20 dark:via-pink-900/20 dark:to-purple-900/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 dark:bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              In Loving Memory
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/Inloving-memory.png"
                  alt="Mrs B.A Raji - In Loving Memory"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-8">
              {/* Dedication */}
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-rose-200 dark:border-rose-800">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="w-8 h-8 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-rose-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </span>
                  Dedication
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  To my dear late mother <strong>Mrs B.A Raji</strong>, who always believed in me and inspired me to never give up on my dreams, I dedicate this 37 room self-contained students hostel in your hometown of Ago-Iwoye, Ogun State, Nigeria. Your unwavering support and encouragement will forever be remembered in this tangible achievement. I am grateful for everything you have done for me and I hope to continue making you proud. <em>Rest in peace, dear mother.</em>
                </p>
              </div>

              {/* Gratitude Sections */}
              <div className="space-y-6">
                {/* Divine Gratitude */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                  <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-3 flex items-center">
                    <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mr-2">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </span>
                    Divine Gratitude
                  </h4>
                  <p className="text-blue-800 dark:text-blue-300 text-sm leading-relaxed">
                    Dear God, I want to express my deepest and sincerest gratitude for making this project a success. Your guidance and blessings have been instrumental in every step of the way, and I am forever grateful for your unwavering support. Thank you for your never-ending love and grace. <strong>Amen.</strong>
                  </p>
                </div>

                {/* Team Thanks */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                  <h4 className="text-lg font-semibold text-green-900 dark:text-green-200 mb-3 flex items-center">
                    <span className="w-6 h-6 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mr-2">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                      </svg>
                    </span>
                    Team Thanks
                  </h4>
                  <p className="text-green-800 dark:text-green-300 text-sm leading-relaxed">
                    We would like to extend our sincere appreciation and gratitude to all the workers who have contributed to the success of this project. From laying the foundations to the final touches, each and every one of you has played a crucial role in bringing this project to fruition. A special thank you goes out to the electrician who has been with us since the beginning and has seen the project through to the end. Your hard work, dedication, and expertise have not gone unnoticed and we are truly grateful for your contributions.
                  </p>
                </div>

                {/* Family Thanks */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                  <h4 className="text-lg font-semibold text-purple-900 dark:text-purple-200 mb-3 flex items-center">
                    <span className="w-6 h-6 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center mr-2">
                      <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                      </svg>
                    </span>
                    Family Thanks
                  </h4>
                  <p className="text-purple-800 dark:text-purple-300 text-sm leading-relaxed">
                    I want to take a moment to express my sincere gratitude to my family, both extended and immediate. Thank you for always standing by me, supporting me, and believing in me. Your love and encouragement have helped me through the toughest times and have made my successes even sweeter. I am blessed to have such a loving and caring family.
                  </p>
                </div>

                {/* Special Appreciation */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
                  <h4 className="text-lg font-semibold text-amber-900 dark:text-amber-200 mb-3 flex items-center">
                    <span className="w-6 h-6 bg-amber-100 dark:bg-amber-900/40 rounded-full flex items-center justify-center mr-2">
                      <svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </span>
                    Special Appreciation
                  </h4>
                  <p className="text-amber-800 dark:text-amber-300 text-sm leading-relaxed">
                    On behalf of the entire team, I want to extend a special appreciation to all the talented and dedicated engineers who have worked tirelessly on this project. I would especially like to give my heartfelt gratitude to my cousin brother, <strong>Mr. Akeem Elias of Meekad Hotel Ago Iwoye</strong>. Your contributions have been immeasurable and we are truly blessed to have you as a part of our team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-indigo-700 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-white/20"></div>
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
                <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">₦300K</div>
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
                <a 
                  href="https://x.com/abikeadecourt" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-all duration-300 cursor-pointer transform hover:scale-110 group"
                >
                  <Twitter className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                </a>
                <a 
                  href="https://www.instagram.com/abikeadecourt" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-all duration-300 cursor-pointer transform hover:scale-110 group"
                >
                  <Instagram className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                </a>
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
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">Oke-odo, off konigba Bus-stop, Ago-Iwoye, Ogun State, Nigeria</span>
                </div>
                                  <div className="flex items-center space-x-3 group">
                    <Phone className="h-5 w-5 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
                    <a href="tel:+2348055453708" className="text-gray-300 group-hover:text-white transition-colors duration-300 hover:underline">+234 805 545 3708</a>
                  </div>
                  <div className="flex items-center space-x-3 group">
                    <Mail className="h-5 w-5 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">abikeadecourt@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3 group">
                    <div className="h-5 w-5 text-indigo-400 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                    </div>
                    <a href="https://wa.me/2348082129547" target="_blank" rel="noopener noreferrer" className="text-gray-300 group-hover:text-white transition-colors duration-300 hover:underline">+234 808 212 9547</a>
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