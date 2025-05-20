import React, { useState } from "react";
export type FilterType = 'all' | 'unread' | 'important';

export interface ChatSearchProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

interface SearchAndFilterProps {
  selectedFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  selectedFilter,
  onFilterChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleFilterSelect = (filter: FilterType) => {
    onFilterChange(filter);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Messages
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 ml-2 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-20">
          {(['all', 'unread', 'important'] as FilterType[]).map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterSelect(filter)}
              className={`block w-full text-left px-4 py-2 text-sm ${
                selectedFilter === filter
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {filter === 'all'
                ? 'All messages'
                : filter === 'unread'
                ? 'Unread only'
                : 'Important'}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;
