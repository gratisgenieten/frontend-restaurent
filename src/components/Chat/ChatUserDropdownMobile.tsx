import React, { useState } from 'react';
import { ChatThread } from './types';

interface Props {
  chats: ChatThread[];
  activeChatId: string;
  onSelectChat: (id: string) => void;
}

const ChatUserDropdownMobile: React.FC<Props> = ({
  chats,
  activeChatId,
  onSelectChat
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChats = chats.filter(chat =>
    chat.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sm:hidden p-4 bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800 space-y-3">
      <input
        type="text"
        placeholder="Search user..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-white dark:border-neutral-700"
      />

      <select
        value={activeChatId}
        onChange={(e) => onSelectChat(e.target.value)}
        className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-white dark:border-neutral-700"
      >
        {filteredChats.map(chat => (
          <option key={chat.id} value={chat.id}>
            {chat.user.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChatUserDropdownMobile;
