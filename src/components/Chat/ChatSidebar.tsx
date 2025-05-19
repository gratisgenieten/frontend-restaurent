// ChatSidebar.tsx
import React, { useState } from "react";
import ChatListHeader from "@/components/Chat/ChatListHeader";
import SearchAndFilter from './Search&Filter';
// import ChatSearch from "@/components/Chat/ChatSearch";
// import ChatFilter from "@/components/Chat/ChatFilter";
import ChatList from "@/components/Chat/ChatList";
import { ChatSidebarProps } from "@/components/Chat/types";

const ChatSidebar: React.FC<ChatSidebarProps> = ({
    chats, 
    activeChatId, 
    onSelectChat,
    onCreateNewChat
  }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'unread' | 'important'>('all');
    
    // Filter chats based on search term and selected filter
    const filteredChats = chats.filter(chat => {
      const matchesSearch = chat.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.messages.some(msg => msg.content.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesFilter = selectedFilter === 'all' || 
        (selectedFilter === 'unread' && (chat.unreadCount || 0) > 0) ||
        (selectedFilter === 'important' && chat.isPinned);
      
      return matchesSearch && matchesFilter;
    });
  
    return (
      <div className="w-[460px] h-full flex flex-col bg-blue-50 px-8">
        <ChatListHeader 
          onCreateNewChat={onCreateNewChat} 
        />

        <SearchAndFilter
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        />
        
        {/* <div className="px-4 py-2">
          <ChatSearch 
            searchTerm={searchTerm} 
            onSearch={setSearchTerm} 
          />
        </div>
        
        <div className="px-4 py-2">
          <ChatFilter 
            selectedFilter={selectedFilter} 
            onFilterChange={setSelectedFilter} 
          />
        </div> */}
        
        <div className="flex-1 overflow-y-auto mt-2">
          <ChatList 
            chats={filteredChats} 
            activeChatId={activeChatId} 
            onSelectChat={onSelectChat} 
          />
        </div>
      </div>
    );
  };
  
  export default ChatSidebar;