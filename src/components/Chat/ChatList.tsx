// ChatList.tsx
import React from 'react';
import ChatListItem from './ChatListItems';
import { ChatListProps } from './types';
import ChatUserDropdownMobile from './ChatUserDropdownMobile';

const ChatList: React.FC<ChatListProps> = ({ chats, activeChatId, onSelectChat }) => {
  // Sort chats by last message timestamp (newest first)
  const sortedChats = [...chats].sort((a, b) => {
    const aLastMessage = a.messages.length > 0 ? a.messages[a.messages.length - 1].timestamp : new Date(0);
    const bLastMessage = b.messages.length > 0 ? b.messages[b.messages.length - 1].timestamp : new Date(0);

    return bLastMessage.getTime() - aLastMessage.getTime();
  });

  return (
    <div className="space-y-0 md:space-y-3">
      <div className='md:block hidden'>
        {sortedChats.map(chat => (
          <div key={chat.id} className="rounded-lg overflow-hidden">

            <ChatListItem
              key={chat.id}
              chat={chat}
              isActive={chat.id === activeChatId}
              onClick={() => onSelectChat(chat.id)}
            />
          </div>

        ))}
      </div>
      <div className='md:hidden block'>
        <ChatUserDropdownMobile
          chats={chats}
          activeChatId={activeChatId}
          onSelectChat={onSelectChat}
        />
      </div>

      {sortedChats.length === 0 && (
        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
          No conversations found
        </div>
      )}
    </div>
  );
};

export default ChatList;
