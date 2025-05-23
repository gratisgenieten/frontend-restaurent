import React, { useState } from "react";
export type FilterType = 'all' | 'unread' | 'important';

export interface ChatSearchProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}
import Filter from "./Search&Filter";

const ChatSearch: React.FC<ChatSearchProps> = ({ searchTerm, onSearch }) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');

  return (
    <div className="relative bg-white shadow-sm p-2 rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="relative w-full sm:max-w-md">
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
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <Filter
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />
    </div>
  );
};

export default ChatSearch;
