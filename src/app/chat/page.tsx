"use client"
import React, { useState } from 'react';
import ChatSidebar from '@/components/Chat/ChatSidebar';
import ChatApp from '@/components/Chat/ChatApp';
import { currentUser, chatThreads } from '@/components/Chat/mockData';
import { createNewMessage } from '@/components/Chat/chatUtils';

const ChatApplication: React.FC = () => {
  const [activeChat, setActiveChat] = useState(chatThreads[0]);
  const [chats, setChats] = useState(chatThreads);

  const handleSelectChat = (chatId: string) => {
    const selected = chats.find(chat => chat.id === chatId);
    if (selected) {
      const updatedChats = chats.map(chat => 
        chat.id === chatId 
          ? { ...chat, unreadCount: 0 } 
          : chat
      );
      setChats(updatedChats);
      setActiveChat(selected);
    }
  };

  const handleCreateNewChat = () => {
    console.log('Create new chat clicked');
  };

  const handleSendMessage = (content: string) => {
    const newMessage = createNewMessage(content, currentUser.id);
    const updatedActiveChat = {
      ...activeChat,
      messages: [...activeChat.messages, newMessage],
    };
    const updatedChats = chats.map(chat => 
      chat.id === activeChat.id ? updatedActiveChat : chat
    );
    setChats(updatedChats);
    setActiveChat(updatedActiveChat);
  };

  return (
    <div className="flex flex-col sm:flex-row w-full h-full  md:h-[calc(100vh-80px)] py-0 bg-white dark:bg-neutral-900 overflow-hidden rounded-xl shadow-xl">
      <ChatSidebar 
        chats={chats} 
        activeChatId={activeChat.id} 
        onSelectChat={handleSelectChat} 
        onCreateNewChat={handleCreateNewChat}
      />
      <div className="sm:flex-1 flex sm:flex-col overflow-hidden">
        <ChatApp 
          chat={activeChat}
          currentUser={currentUser}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default ChatApplication;