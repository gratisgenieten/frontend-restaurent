import React, { useState } from "react";
import ChatListHeader from "@/components/Chat/ChatListHeader";
import ChatList from "@/components/Chat/ChatList";
import { ChatSidebarProps } from "@/components/Chat/types";

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  chats,
  activeChatId,
  onSelectChat,
  onCreateNewChat,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "unread" | "important"
  >("all");

  const filteredChats = chats.filter((chat) => {
    const matchesSearch =
      chat.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.messages.some((msg) =>
        msg.content.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "unread" && (chat.unreadCount || 0) > 0) ||
      (selectedFilter === "important" && chat.isPinned);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="md:w-[460px] h-fit md:h-full flex flex-col  border border-gray-200 dark:border-neutral-700 bg-gray-100 dark:bg-neutral-900 md:px-8 transition-colors duration-300">
      <ChatListHeader onCreateNewChat={onCreateNewChat} />

      <div className="flex-1 overflow-y-auto md:mt-2">
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
