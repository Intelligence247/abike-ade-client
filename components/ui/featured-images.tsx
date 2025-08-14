"use client"

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useFeaturedImages, FeaturedImage } from '@/hooks/use-featured-images';
import { constructImageUrl } from '@/lib/utils';
import { ImageIcon, Loader2 } from 'lucide-react';

interface FeaturedImagesProps {
  maxImages?: number;
  showPagination?: boolean;
  className?: string;
}

export function FeaturedImages({ 
  maxImages = 6, 
  showPagination = false, 
  className = "" 
}: FeaturedImagesProps) {
  const { featuredImages, loading, error, fetchFeaturedImages } = useFeaturedImages();

  if (loading) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
          <p className="text-gray-600 dark:text-gray-400">Loading featured images...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <ImageIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Unable to load images
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
        <button
          onClick={() => fetchFeaturedImages()}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!featuredImages || featuredImages.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <ImageIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No featured images available
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Check back later for updates to our accommodation gallery.
        </p>
      </div>
    );
  }

  const displayImages = featuredImages.slice(0, maxImages);

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayImages.map((image) => (
          <Card key={image.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
            <CardContent className="p-0">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={constructImageUrl(process.env.NEXT_PUBLIC_BASE_URL, image.image)}
                  alt={image.description}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm font-medium">{image.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {showPagination && featuredImages.length > maxImages && (
        <div className="mt-8 text-center">
          <Badge variant="outline" className="text-sm">
            Showing {displayImages.length} of {featuredImages.length} images
          </Badge>
        </div>
      )}
    </div>
  );
}
