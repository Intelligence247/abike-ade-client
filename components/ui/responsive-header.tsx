"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/lib/auth-context';
import Image from 'next/image';
import {
  Building,
  User,
  LogOut,
  Menu,
  X,
  ArrowLeft,
  Home
} from 'lucide-react';

interface ResponsiveHeaderProps {
  showBackButton?: boolean;
  backHref?: string;
  backLabel?: string;
}

export function ResponsiveHeader({ 
  showBackButton = false, 
  backHref = "/", 
  backLabel = "Back to Home" 
}: ResponsiveHeaderProps) {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and Back button */}
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <>
                <Link 
                  href={backHref} 
                  className="hidden sm:flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {backLabel}
                </Link>
                <div className="hidden sm:block w-px h-6 bg-gray-300 dark:bg-gray-600" />
              </>
            )}
            
            <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Abike Ade Court" width={52} height={52} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
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
                <Link href="/rooms">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Building className="mr-2 h-4 w-4" />
                    Rooms
                  </Button>
                </Link>
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

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              onClick={toggleMobileMenu}
              className="p-2"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {isLoading ? (
              <div className="space-y-3">
                <div className="w-full h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="w-full h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="w-full h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            ) : isAuthenticated ? (
              <>
                <Link href="/dashboard" onClick={closeMobileMenu}>
                  <Button variant="outline" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <Link href="/rooms" onClick={closeMobileMenu}>
                  <Button variant="outline" className="w-full justify-start">
                    <Building className="mr-2 h-4 w-4" />
                    Rooms
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start" onClick={() => { logout(); closeMobileMenu(); }}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/rooms" onClick={closeMobileMenu}>
                  <Button variant="outline" className="w-full justify-start">
                    <Building className="mr-2 h-4 w-4" />
                    Rooms
                  </Button>
                </Link>
                <Link href="/signin" onClick={closeMobileMenu}>
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register" onClick={closeMobileMenu}>
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
