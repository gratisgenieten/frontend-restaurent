import React from 'react';
import Image from 'next/image';
import { ChatListItemProps } from './types';
import { getLastMessage, getMessagePreview, getMessageTime } from './chatUtils';

const ChatListItem: React.FC<ChatListItemProps> = ({ chat, isActive, onClick }) => {
  const lastMessage = getLastMessage(chat);

  const getStatusColor = () => {
    if (chat.user.status === 'online') return 'bg-green-500';
    if (chat.user.status === 'do-not-disturb') return 'bg-red-500';
    return 'bg-gray-400';
  };

  return (
    <div
      onClick={onClick}
      className={`relative w-full px-4 py-4 my-0 md:my-2 sm:px-6 sm:py-5 flex items-start rounded-lg border border-gray-200 dark:border-neutral-700 cursor-pointer transition-all duration-200 ease-in-out
        ${
          isActive
            ? 'bg-white dark:bg-neutral-800 border-l-4 border-blue-500 scale-[1.02] shadow-md dark:shadow-lg'
            : 'bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800 hover:scale-[1.01] hover:shadow-sm'
        }`}
    >
      <div className="relative mr-4 flex-shrink-0">
        <Image
          src={chat.user.avatar.toString()}
          alt={chat.user.name}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full object-cover"
        />
        {chat.user.status && (
          <div
            className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor()} rounded-full border-2 border-white dark:border-neutral-900`}
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center space-x-2">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[65%] sm:max-w-none">
            {chat.user.name}
          </h3>
          <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
            {lastMessage && getMessageTime(lastMessage.timestamp)}
          </span>
        </div>

        <div className="flex items-center mt-1">
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 flex-1">
            {lastMessage?.senderId !== chat.user.id && (
              <span className="text-gray-400 dark:text-gray-500">You: </span>
            )}
            {getMessagePreview(lastMessage)}
          </p>

          {chat.unreadCount && chat.unreadCount > 0 && (
            <span className="ml-2 w-5 h-5 flex items-center justify-center text-xs font-medium rounded-full bg-blue-500 text-white">
              {chat.unreadCount}
            </span>
          )}
        </div>
      </div>

      {/* Blue dot for new message */}
      {lastMessage?.isNew && !chat.unreadCount && (
        <div className="absolute right-4 bottom-4 w-2 h-2 bg-blue-500 rounded-full" />
      )}
    </div>
  );
};

export default ChatListItem;
