// ChatListHeader.tsx
import React, { useState } from 'react';
import { ChatListHeaderProps } from './types';

const ChatListHeader: React.FC<ChatListHeaderProps> = ({ onCreateNewChat }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold text-gray-800">Chats</h2>
        <button 
          className="ml-2 p-1 focus:outline-none"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          aria-label="Chat options"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        {isDropdownOpen && (
          <div className="absolute top-0 left-1 bg-white shadow-md rounded-md py-1 z-10 w-44">
            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              All chats
            </button>
            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Unread
            </button>
            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Archived
            </button>
          </div>
        )}
      </div>
      
      <button 
        onClick={onCreateNewChat}
        className="flex items-center justify-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        <span className="text-sm font-medium">Create New Chat</span>
      </button>
    </div>
  );
};

export default ChatListHeader;