"use client"

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api-client';

export interface FeaturedImage {
  id: number;
  image: string;
  description: string;
}

export interface FeaturedImagesResponse {
  status: 'success' | 'error';
  message: string;
  data: FeaturedImage[];
  page_number: number;
  items_per_page: number;
  total_pages: number;
  total_items: number;
}

interface UseFeaturedImagesReturn {
  featuredImages: FeaturedImage[];
  loading: boolean;
  error: string | null;
  fetchFeaturedImages: (params?: { per_page?: number; page?: number }) => Promise<void>;
  resetError: () => void;
}

export function useFeaturedImages(): UseFeaturedImagesReturn {
  const [featuredImages, setFeaturedImages] = useState<FeaturedImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedImages = async (params?: { per_page?: number; page?: number }) => {
    try {
      setLoading(true);
      setError(null);
      
      const response: FeaturedImagesResponse = await apiClient.featuredImages(params);
      
      if (response.status === 'success') {
        setFeaturedImages(response.data);
      } else {
        const errorMessage = response.message || 'Failed to fetch featured images';
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch featured images';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetError = () => {
    setError(null);
  };

  // Fetch featured images on component mount
  useEffect(() => {
    fetchFeaturedImages();
  }, []);

  return {
    featuredImages,
    loading,
    error,
    fetchFeaturedImages,
    resetError
  };
}
