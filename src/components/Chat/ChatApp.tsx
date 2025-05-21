import React, { useState, useRef, useEffect } from 'react';
import ChatHeader from '@/components/Chat/ChatHeader';
import ChatMessage from '@/components/Chat/ChatMessage';
import ChatInput from '@/components/Chat/ChatInput';
import { User, ChatThread, FileInfo, DisplayMessage } from '@/components/Chat/types';
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
  const containerRef = useRef<HTMLDivElement>(null); // NEW

  useEffect(() => {
    const formattedMessages = prepareMessagesForDisplay(
      chat.messages,
      currentUser,
      chat.user
    );
    setDisplayMessages(formattedMessages);
  }, [chat, currentUser]);

  useEffect(() => {
  if (containerRef.current) {
    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }
}, [displayMessages]);


  const handleSendFile = (file: File) => {
    const fileExtension = file.name.split(".").pop() || "";
    const fileInfo: FileInfo = {
      name: file.name,
      size: formatFileSize(file.size),
      extension: fileExtension,
    };
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
        console.log("Delete message:", messageId);
        break;
      case "reply":
        console.log("Reply to message:", messageId);
        break;
      case "forward":
        console.log("Forward message:", messageId);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex w-full flex-col px-0 overflow-hidden bg-white dark:bg-neutral-900 transition-colors duration-300">
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
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-2 md:p-4 bg-gray-50 dark:bg-neutral-800  max-h-[420px] md:max-h-full min-h-[420px]  md:min-h-[calc(100vh-230px)] transition-colors duration-300"
      >
        {displayMessages.map((msg) => (
          <div key={msg.id}>
            {msg.showDate && (
              <div className="flex justify-center my-3 md:my-4">
                <span className="text-xs bg-gray-200 dark:bg-neutral-700 rounded-full px-3 py-1 text-gray-500 dark:text-gray-300">
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
          </div>
        ))}
      </div>

      {/* Input */}
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
