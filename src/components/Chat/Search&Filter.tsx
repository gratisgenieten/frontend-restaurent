// SearchAndFilter.tsx
import React, { useState } from "react";
import { ChatThread } from "./types";

interface SearchAndFilterProps {
  searchTerm: string;
  onSearch: (term: string) => void;
  selectedFilter: 'all' | 'unread' | 'important';
  onFilterChange: (filter: 'all' | 'unread' | 'important') => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ 
  searchTerm, 
  onSearch, 
  selectedFilter, 
  onFilterChange 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const handleFilterSelect = (filter: 'all' | 'unread' | 'important') => {
    onFilterChange(filter);
    setIsDropdownOpen(false);
  };
  
  return (
    <div className="flex items-center space-x-2 p-2 rounded-md bg-white">
      {/* Search box */}
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor" 
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search"
          className="w-full pl-10 pr-3 py-2 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Filter dropdown */}
      <div className="relative">
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center justify-between px-4 py-2 text-left text-sm text-gray-700 bg-white border-l border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        > Messages
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 ml-2 mt-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
        </button>
        
        {isDropdownOpen && (
          <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-44">
            <button 
              onClick={() => handleFilterSelect('all')}
              className={`block w-full text-left px-4 py-2 text-sm ${selectedFilter === 'all' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              All messages
            </button>
            <button 
              onClick={() => handleFilterSelect('unread')}
              className={`block w-full text-left px-4 py-2 text-sm ${selectedFilter === 'unread' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Unread only
            </button>
            <button 
              onClick={() => handleFilterSelect('important')}
              className={`block w-full text-left px-4 py-2 text-sm ${selectedFilter === 'important' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Important
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;