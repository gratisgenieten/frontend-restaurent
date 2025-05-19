// ChatApp.tsx
import React, { useState, useRef, useEffect } from 'react';
import ChatHeader from '@/components/Chat/ChatHeader';
import ChatMessage from '@/components/Chat/ChatMessage';
import ChatInput from '@/components/Chat/ChatInput';
import { User, Message, ChatThread, FileInfo, DisplayMessage } from '@/components/Chat/types';
import { formatMessageDate, formatFileSize, prepareMessagesForDisplay } from './chatUtils';

interface ChatAppProps {
  chat: ChatThread;
  currentUser: User;
  onSendMessage: (content: string) => void;
  isMobile?: boolean;
}

const ChatApp: React.FC<ChatAppProps> = ({
  chat,
  currentUser,
  onSendMessage,
  isMobile = false,
}) => {
  const [displayMessages, setDisplayMessages] = useState<DisplayMessage[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Format messages for display, adding showDate property
  useEffect(() => {
    const formattedMessages = prepareMessagesForDisplay(
      chat.messages,
      currentUser,
      chat.user
    );

    setDisplayMessages(formattedMessages);
  }, [chat, currentUser]);

  // Scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom();
  }, [displayMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendFile = (file: File) => {
    // In a real app, you would upload the file to a server here
    const fileExtension = file.name.split(".").pop() || "";

    const fileInfo: FileInfo = {
      name: file.name,
      size: formatFileSize(file.size),
      extension: fileExtension,
    };

    // Creating a new message object that would be handled by the parent component in a real app
    console.log("Sending file:", {
      senderId: currentUser.id,
      content: file.name,
      timestamp: new Date(),
      type: "file",
      fileInfo,
    });
  };

  const handleMessageOptions = (option: string, messageId: string) => {
    switch (option) {
      case "delete":
        // This would be handled by the parent component in a real app
        console.log("Delete message:", messageId);
        break;
      case "reply":
        // Implement reply functionality
        console.log("Reply to message:", messageId);
        break;
      case "forward":
        // Implement forward functionality
        console.log("Forward message:", messageId);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col px-8 overflow-hidden">
      {/* Fixed Header */}
      <div className="flex-shrink-0">
        <ChatHeader
          avatar={chat.user.avatar.toString()}
          name={chat.user.name}
          status={chat.user.status || "online"}
          lastSeen={chat.user.lastOnline ? "5 hours ago" : undefined}
          onInfoClick={() => console.log("Info clicked")}
          onOptionsClick={() => console.log("Options clicked")}
        />
      </div>

      {/* Scrollable Messages Section */}
      <div className="flex-1 overflow-y-auto p-2 md:p-4 bg-gray-50">
        {displayMessages.map((msg, index) => (
          <React.Fragment key={msg.id}>
            {msg.showDate && (
              <div className="flex justify-center my-3 md:my-4">
                <span className="text-xs bg-gray-200 rounded-full px-3 py-1 text-gray-500">
                  {formatMessageDate(msg.timestamp)}
                </span>
              </div>
            )}

            <ChatMessage
              id={msg.id}
              content={msg.content}
              timestamp={msg.timestamp}
              type={msg.type}
              isCurrentUser={msg.isCurrentUser}
              senderAvatar={msg.senderAvatar.toString()}
              senderName={msg.senderName}
              fileInfo={msg.fileInfo}
              onOptionSelect={handleMessageOptions}
              isMobile={isMobile}
            />
          </React.Fragment>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Fixed Input at Bottom */}
      <div className="flex-shrink-0">
        <ChatInput
          onSendMessage={onSendMessage}
          onSendFile={handleSendFile}
          onSendVoice={() => console.log("Voice recording started/stopped")}
        />
      </div>
    </div>
  );
};

export default ChatApp;