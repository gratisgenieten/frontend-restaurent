// ChatListItem.tsx
import React from 'react';
import Image from 'next/image';
import { ChatListItemProps } from './types';
import { getLastMessage, getMessagePreview, getMessageTime } from './chatUtils';

const ChatListItem: React.FC<ChatListItemProps> = ({ chat, isActive, onClick }) => {
  // Get last message
  const lastMessage = getLastMessage(chat);
  
  // Get status color
  const getStatusColor = () => {
    if (chat.user.status === 'online') return 'bg-green-500';
    if (chat.user.status === 'do-not-disturb') return 'bg-red-500';
    return 'bg-gray-400';
  };

  return (
    <div 
      className={`relative px-6 py-5 flex items-start cursor-pointer transition-all duration-200 ease-in-out transform ${
        isActive 
          ? 'bg-white border-l-4 border-l-blue-500 scale-[1.02] shadow-md' 
          : 'bg-white hover:bg-gray-50 border-l-4 border-l-transparent hover:scale-[1.01] hover:shadow-sm'
      }`}
      onClick={onClick}
    >
      <div className="relative mr-3 flex-shrink-0">
        <Image
          src={chat.user.avatar.toString()} 
          alt={chat.user.name} 
          className="w-12 h-12 rounded-full object-cover"
        />
        {chat.user.status && (
          <div className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor()} rounded-full border-2 border-white`}></div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <h3 className="text-sm font-medium text-gray-900 truncate">{chat.user.name}</h3>
          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
            {lastMessage && getMessageTime(lastMessage.timestamp)}
          </span>
        </div>
        
        <div className="flex items-center mt-1">
          {lastMessage?.senderId === chat.user.id && (
            <p className="text-xs text-gray-500 line-clamp-1 flex-1">
              {getMessagePreview(lastMessage)}
            </p>
          )}
          
          {lastMessage?.senderId !== chat.user.id && (
            <p className="text-xs text-gray-500 line-clamp-1 flex-1">
              <span className="text-gray-400">You: </span>
              {getMessagePreview(lastMessage)}
            </p>
          )}
          
          {(chat.unreadCount && chat.unreadCount > 0) && (
            <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full bg-blue-500 text-white">
              {chat.unreadCount}
            </span>
          )}
        </div>
      </div>
      
      {/* Conditional indicator for new messages or statuses */}
      {chat.user.status === 'do-not-disturb' && (
        <div className="absolute right-4 top-4 text-xs font-medium text-red-500">
          do not disturb
        </div>
      )}

      {lastMessage && lastMessage.isNew && !chat.unreadCount && (
        <div className="absolute right-4 bottom-4 w-2 h-2 bg-blue-500 rounded-full"></div>
      )}
    </div>
  );
};

export default ChatListItem;