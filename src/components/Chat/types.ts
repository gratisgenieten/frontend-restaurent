// types.ts
import { StaticImageData } from 'next/image';
import { Route } from 'next';

export interface User {
  id: string;
  name: string;
  avatar: string | StaticImageData;
  lastOnline?: Date;
  status?: 'online' | 'offline' | 'away' | 'do-not-disturb';
}

export interface FileInfo {
  name: string;
  size: string;
  extension: string;
  url?: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'file' | 'voice' | 'photo';
  fileInfo?: FileInfo;
  isDelivered?: boolean;
  isRead?: boolean;
  isNew?: boolean;
  replyTo?: string; // Message id this is replying to
  isMobile?: boolean;
}

export interface ChatThread {
  id: string;
  user: User;
  messages: Message[];
  unreadCount?: number;
  lastMessageTimestamp?: Date;
  isPinned?: boolean;
  isArchived?: boolean;
  isMuted?: boolean;
}

// Used for internal component state
export interface DisplayMessage extends Message {
  isCurrentUser: boolean;
  senderAvatar: string | StaticImageData;
  senderName: string;
  showDate?: boolean;
}

// Type definitions for utility functions
export interface ChatUtils {
  formatMessageDate: (date: Date) => string;
  formatFileSize: (bytes: number) => string;
  getMessageTime: (timestamp: Date) => string;
  createNewMessage: (
    content: string, 
    senderId: string, 
    type?: 'text' | 'file' | 'voice' | 'photo',
    fileInfo?: FileInfo
  ) => Message;
  prepareMessagesForDisplay: (
    messages: Message[], 
    currentUser: User, 
    chatUser: User
  ) => DisplayMessage[];
  getLastMessage: (chat: ChatThread) => Message | null;
  getMessagePreview: (message: Message | null) => string;
}

// Props for components
export interface ChatAppProps {
  chat: ChatThread;
  currentUser: User;
  onSendMessage: (content: string) => void;
  isMobile?: boolean;
}

export interface ChatHeaderProps {
  avatar: string;
  name: string;
  status: 'online' | 'offline' | 'away' | 'do-not-disturb';
  lastSeen?: string;
  onInfoClick: () => void;
  onOptionsClick: () => void;
}

export interface ChatMessageProps {
  id: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'file' | 'voice' | 'photo';
  isCurrentUser: boolean;
  senderAvatar: string;
  senderName: string;
  fileInfo?: FileInfo;
  onOptionSelect: (option: string, messageId: string) => void;
  isMobile?: boolean;
}

export interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onSendFile: (file: File) => void;
  onSendVoice: () => void;
}

export interface ChatSidebarProps {
  chats: ChatThread[];
  activeChatId: string;
  onSelectChat: (chatId: string) => void;
  onCreateNewChat: () => void;
}

export interface ChatListHeaderProps {
  onCreateNewChat: () => void;
}

export interface ChatSearchProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

export interface ChatFilterProps {
  selectedFilter: 'all' | 'unread' | 'important';
  onFilterChange: (filter: 'all' | 'unread' | 'important') => void;
}

export interface SearchAndFilterProps {
  searchTerm: string;
  onSearch: (term: string) => void;
  selectedFilter: 'all' | 'unread' | 'important';
  onFilterChange: (filter: 'all' | 'unread' | 'important') => void;
}

export interface ChatListProps {
  chats: ChatThread[];
  activeChatId: string;
  onSelectChat: (chatId: string) => void;
}

export interface ChatListItemProps {
  chat: ChatThread;
  isActive: boolean;
  onClick: () => void;
}