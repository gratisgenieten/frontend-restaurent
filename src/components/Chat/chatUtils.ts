// chatUtils.ts
import { format, isToday, isYesterday, differenceInDays } from 'date-fns';
import { Message, FileInfo, User, ChatThread, DisplayMessage } from '@/components/Chat/types';

/**
 * Formats a date for message grouping (Today, Yesterday, X days ago, or date)
 */
export const formatMessageDate = (date: Date): string => {
  if (isToday(date)) {
    return 'Today';
  } else if (isYesterday(date)) {
    return 'Yesterday';
  } else {
    const diffDays = differenceInDays(new Date(), date);
    if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return format(date, 'dd MMM yyyy');
    }
  }
};

/**
 * Formats file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Gets time representation for message list
 */
export const getMessageTime = (timestamp: Date): string => {
  const now = new Date();
  
  // If it's today, return the time
  if (isToday(timestamp)) {
    return format(timestamp, 'h:mm a');
  }
  
  // If it's within the last 7 days, return the day
  const diffTime = Math.abs(now.getTime() - timestamp.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 7) {
    return format(timestamp, 'EEE'); // Mon, Tue, etc.
  }
  
  // Otherwise, return the date
  return format(timestamp, 'dd/MM/yyyy');
};

/**
 * Creates a new message object
 */
export const createNewMessage = (
  content: string, 
  senderId: string, 
  type: 'text' | 'file' | 'voice' | 'photo' = 'text',
  fileInfo?: FileInfo
): Message => {
  return {
    id: `m${Date.now()}`,
    senderId,
    content,
    timestamp: new Date(),
    type,
    fileInfo,
    isDelivered: true,
  };
};

/**
 * Transforms messages for display with additional properties
 */
export const prepareMessagesForDisplay = (
  messages: Message[], 
  currentUser: User, 
  chatUser: User
): DisplayMessage[] => {
  return messages.map((msg, index) => {
    const isCurrentUser = msg.senderId === currentUser.id;
    const showDate = index === 0 || 
      formatMessageDate(messages[index-1].timestamp) !== formatMessageDate(msg.timestamp);
    
    return {
      ...msg,
      isCurrentUser,
      senderAvatar: isCurrentUser ? currentUser.avatar : chatUser.avatar,
      senderName: isCurrentUser ? currentUser.name : chatUser.name,
      showDate
    };
  });
};

/**
 * Gets the last message from a chat thread
 */
export const getLastMessage = (chat: ChatThread): Message | null => {
  return chat.messages.length > 0 
    ? chat.messages[chat.messages.length - 1] 
    : null;
};

/**
 * Returns a readable preview of a message
 */
export const getMessagePreview = (message: Message | null): string => {
  if (!message) return '';
  
  if (message.type === 'text') {
    return message.content.length > 38
      ? message.content.substring(0, 38) + '...'
      : message.content;
  }
  
  if (message.type === 'file') {
    return message.fileInfo?.name || 'File';
  }
  
  if (message.type === 'voice') {
    return 'Voice message';
  }
  
  if (message.type === 'photo') {
    return 'Photo';
  }
  
  return '';
};