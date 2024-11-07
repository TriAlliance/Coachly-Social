import React from 'react';
import { Filter, SortDesc, Calendar } from 'lucide-react';
import { ActivityTypeSelector } from './ActivityTypeSelector';
import type { ActivityType } from '../types';

interface FeedFiltersProps {
  selectedType: ActivityType | 'all';
  onTypeSelect: (type: ActivityType | 'all') => void;
  sortBy: 'recent' | 'popular';
  onSortChange: (sort: 'recent' | 'popular') => void;
  timeRange: 'all' | 'week' | 'month';
  onTimeRangeChange: (range: 'all' | 'week' | 'month') => void;
}

export function FeedFilters({
  selectedType,
  onTypeSelect,
  sortBy,
  onSortChange,
  timeRange,
  onTimeRangeChange,
}: FeedFiltersProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <h2 className="font-semibold">Filter Activities</h2>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Activity Type
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onTypeSelect('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedType === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Activities
            </button>
            <ActivityTypeSelector
              selectedType={selectedType === 'all' ? 'run' : selectedType}
              onSelect={(type) => onTypeSelect(type)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => onSortChange('recent')}
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === 'recent'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <SortDesc className="w-4 h-4" />
                <span>Most Recent</span>
              </button>
              <button
                onClick={() => onSortChange('popular')}
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === 'popular'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>Most Popular</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Range
            </label>
            <div className="flex gap-2">
              {(['all', 'week', 'month'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => onTimeRangeChange(range)}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    timeRange === range
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>
                    {range === 'all'
                      ? 'All Time'
                      : range === 'week'
                      ? 'This Week'
                      : 'This Month'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}