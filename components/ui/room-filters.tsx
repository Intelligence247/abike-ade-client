"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  X, 
  RotateCcw,
  Minus,
  Plus
} from 'lucide-react';

interface RoomFiltersProps {
  filters: {
    search?: string;
    sort_by?: string;
    per_page?: number;
    page?: number;
  };
  onUpdateFilters: (filters: any) => void;
  onResetFilters: () => void;
  className?: string;
}

const sortOptions = [
  { value: 'title', label: 'Name (A-Z)' },
  { value: '-title', label: 'Name (Z-A)' },
  { value: 'price', label: 'Price (Low to High)' },
  { value: '-price', label: 'Price (High to Low)' }
];

const perPageOptions = [
  { value: 10, label: '10 per page' },
  { value: 20, label: '20 per page' },
  { value: 50, label: '50 per page' }
];

export function RoomFilters({ 
  filters, 
  onUpdateFilters, 
  onResetFilters, 
  className = "" 
}: RoomFiltersProps) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: string, value: any) => {
    // Convert "all" values to undefined for the API
    let processedValue = value === 'all' ? undefined : value;
    
    const newFilters = { ...localFilters, [key]: processedValue };
    setLocalFilters(newFilters);
  };

  const handleApplyFilters = () => {
    onUpdateFilters(localFilters);
  };

  const handleResetFilters = () => {
    setLocalFilters({});
    onResetFilters();
  };

  const hasActiveFilters = Object.values(localFilters).some(value => 
    value !== undefined && value !== '' && 
    (typeof value === 'boolean' ? true : (Array.isArray(value) ? value.length > 0 : true))
  );

  return (
    <Card className={`${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2">
                Active
              </Badge>
            )}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Search Rooms</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              placeholder="Search by room name..."
              value={localFilters.search || ''}
              onChange={(e) => {
                handleFilterChange('search', e.target.value);
                // Apply search immediately
                onUpdateFilters({ ...localFilters, search: e.target.value, page: 1 });
              }}
              className="pl-10"
            />
          </div>
        </div>

        {/* Sort By */}
        <div className="space-y-2">
          <Label htmlFor="sort">Sort By</Label>
          <Select
            value={localFilters.sort_by || 'title'}
            onValueChange={(value) => handleFilterChange('sort_by', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select sorting" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Items Per Page */}
        <div className="space-y-2">
          <Label htmlFor="per_page">Items Per Page</Label>
          <Select
            value={String(localFilters.per_page || 20)}
            onValueChange={(value) => handleFilterChange('per_page', Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select items per page" />
            </SelectTrigger>
            <SelectContent>
              {perPageOptions.map((option) => (
                <SelectItem key={option.value} value={String(option.value)}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <Button 
            onClick={handleApplyFilters} 
            className="flex-1"
            disabled={!hasActiveFilters}
          >
            Apply Filters
          </Button>
          <Button 
            variant="outline" 
            onClick={handleResetFilters}
            disabled={!hasActiveFilters}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 