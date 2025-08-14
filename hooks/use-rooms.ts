"use client"

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api-client';

export interface Room {
  id: number;
  title: string;
  thumbnail: string;
  available: boolean;
  expiration_date: string | null;
  price: string;
  images: Array<{
    id: number;
    image: string;
    description: string;
    featured?: boolean;
  }>;
  features: string;
  student: any | null;
}

export interface RoomListResponse {
  status: 'success' | 'error';
  message: string;
  data: Room[];
  page_number: number;
  items_per_page: number;
  total_pages: number;
  total_items: number;
}

interface RoomFilters {
  search?: string;
  sort_by?: string;
  per_page?: number;
  page?: number;
}

interface UseRoomsReturn {
  rooms: Room[];
  loading: boolean;
  error: string | null;
  filters: RoomFilters;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
  fetchRooms: (params?: RoomFilters & { page?: number; per_page?: number }) => Promise<void>;
  updateFilters: (newFilters: Partial<RoomFilters>) => void;
  resetFilters: () => void;
  resetError: () => void;
}

export function useRooms(): UseRoomsReturn {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<RoomFilters>({});
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12
  });

  const fetchRooms = async (params?: RoomFilters & { page?: number; per_page?: number }) => {
    try {
      setLoading(true);
      setError(null);
      
      const response: RoomListResponse = await apiClient.roomList(params);
      
      if (response.status === 'success') {
        setRooms(response.data);
        setPagination({
          currentPage: response.page_number,
          totalPages: response.total_pages,
          totalItems: response.total_items,
          itemsPerPage: response.items_per_page
        });
      } else {
        const errorMessage = response.message || 'Failed to fetch rooms';
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch rooms';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters: Partial<RoomFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    console.log('useRooms: Updating filters:', updatedFilters);
    setFilters(updatedFilters);
    // Reset to first page when filters change
    fetchRooms({ ...updatedFilters, page: 1 });
  };

  const resetFilters = () => {
    console.log('useRooms: Resetting filters');
    setFilters({});
    fetchRooms({ page: 1 });
  };

  const resetError = () => {
    setError(null);
  };

  // Fetch rooms on component mount
  useEffect(() => {
    fetchRooms();
  }, []);

  return {
    rooms,
    loading,
    error,
    filters,
    pagination,
    fetchRooms,
    updateFilters,
    resetFilters,
    resetError
  };
}

// Hook for fetching a single room
export function useRoom(roomId: string | number) {
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRoom = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('useRoom Hook: Fetching room with ID:', roomId, 'Type:', typeof roomId);
      const response = await apiClient.getRoom(roomId);
      console.log('useRoom Hook: Room API response:', response);
      
      if (response.status === 'success') {
        console.log('useRoom Hook: Room data:', response.data);
        setRoom(response.data);
      } else {
        const errorMessage = response.message || 'Failed to fetch room';
        console.error('useRoom Hook: Room API error:', errorMessage);
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch room';
      console.error('useRoom Hook: Room fetch error:', err);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('useRoom Hook: useEffect triggered with roomId:', roomId);
    if (roomId && roomId !== '') {
      console.log('useRoom Hook: Calling fetchRoom for ID:', roomId);
      fetchRoom();
    } else {
      console.log('useRoom Hook: No roomId provided, skipping fetch');
    }
  }, [roomId]);

  return {
    room,
    loading,
    error,
    fetchRoom
  };
} 