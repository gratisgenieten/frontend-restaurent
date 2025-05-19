"use client"
import React, { useState } from 'react';
import ChatSidebar from '@/components/Chat/ChatSidebar';
import ChatApp from '@/components/Chat/ChatApp';
// import { Message } from '@/components/Chat/types';
import { currentUser, chatThreads } from '@/components/Chat/mockData';
import { createNewMessage } from '@/components/Chat/chatUtils';

const ChatApplication: React.FC = () => {
  const [activeChat, setActiveChat] = useState(chatThreads[0]);
  const [chats, setChats] = useState(chatThreads);

  const handleSelectChat = (chatId: string) => {
    const selected = chats.find(chat => chat.id === chatId);
    if (selected) {
      // Clear unread count when selecting a chat
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
    // In a real app, this would open a contact picker or new chat dialog
  };

  const handleSendMessage = (content: string) => {
    const newMessage = createNewMessage(content, currentUser.id);

    // Update active chat with new message
    const updatedActiveChat = {
      ...activeChat,
      messages: [...activeChat.messages, newMessage],
    };

    // Update chats list
    const updatedChats = chats.map(chat => 
      chat.id === activeChat.id ? updatedActiveChat : chat
    );

    setChats(updatedChats);
    setActiveChat(updatedActiveChat);
  };

  return (
    <div className="flex h-screen max-w-7xl mx-auto my-16 overflow-hidden py-10 bg-blue-50 rounded-xl shadow-xl">
      {/* Left Sidebar */}
      <ChatSidebar 
        chats={chats} 
        activeChatId={activeChat.id} 
        onSelectChat={handleSelectChat} 
        onCreateNewChat={handleCreateNewChat}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
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