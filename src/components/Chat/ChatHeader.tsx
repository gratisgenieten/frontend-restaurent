// ChatHeader.tsx
import React from 'react';
import { ChatHeaderProps } from '@/components/Chat/types';
import Image from 'next/image';

const ChatHeader: React.FC<ChatHeaderProps> = ({
  avatar,
  name,
  status,
  lastSeen,
  onInfoClick,
  onOptionsClick
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'do-not-disturb': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="flex justify-between items-center p-4 border border-gray-50 shadow-md rounded-t-lg bg-green-50">
      <div className="flex items-center">
        <div className="relative">
          <Image
            src={avatar}
            alt={name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div
            className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor()} rounded-full border-2 border-white`}
          ></div>
        </div>
        <div className="ml-3">
          <h3 className="font-medium text-gray-900">{name}</h3>
          <p className="text-xs text-gray-500">
            {status === "online" ? "online" : `last online ${lastSeen}`}
          </p>
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          className="p-2 rounded-full border bg-white shadow-md hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={onInfoClick}
          aria-label="Edit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
        <button
          className="p-2 rounded-full border bg-white shadow-md hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={onOptionsClick}
          aria-label="More options"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;