import React, { useState } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import { ChatMessageProps } from './types';

const ChatMessage: React.FC<ChatMessageProps> = ({
  id,
  content,
  timestamp,
  type,
  isCurrentUser,
  senderAvatar,
  senderName,
  fileInfo,
  onOptionSelect
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const toggleOptions = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowOptions((prev) => !prev);
  };

  const handleOptionClick = (option: string) => {
    onOptionSelect(option, id);
    setShowOptions(false);
  };

  const renderFileMessage = () => (
    <div
      className={`p-3 rounded-lg relative ${
        isCurrentUser
          ? 'bg-blue-500 text-white'
          : 'bg-white border text-gray-800'
      }`}
    >
      <div className="flex items-center">
        <div className="bg-blue-100 text-blue-500 p-2 rounded mr-2">
          {fileInfo?.extension === 'zip' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          )}
        </div>
        <div>
          <p className={`text-sm font-medium ${isCurrentUser ? 'text-white' : 'text-gray-800'}`}>
            {fileInfo?.name}
          </p>
          <p className={`text-xs ${isCurrentUser ? 'text-blue-200' : 'text-gray-500'}`}>
            {fileInfo?.size}
          </p>
        </div>
      </div>
    </div>
  );

  const renderTextMessage = () => (
    <div
      className={`p-3 rounded-lg relative ${
        isCurrentUser
          ? 'bg-blue-500 text-white'
          : 'bg-white border text-gray-800'
      }`}
    >
      <p className="text-sm whitespace-pre-wrap">{content}</p>
    </div>
  );

  return (
    <div className={`flex mb-4   ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      {!isCurrentUser && (
        <Image
          src={senderAvatar}
          alt={senderName}
          width={32}
          height={32}
          className="w-8 h-8 rounded-full object-cover mr-3 mt-1"
        />
      )}
      <div className="max-w-[70%] relative group my-2">
        {type === 'text' ? renderTextMessage() : renderFileMessage()}
        <div className="absolute -bottom-4 text-xs text-gray-500 whitespace-nowrap">
          {format(timestamp, 'h:mm a')}
        </div>
        <button
          onClick={toggleOptions}
          className={`absolute top-1 ${isCurrentUser ? 'left-0 -ml-6' : 'right-0 -mr-6'} 
            opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-gray-200`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
          </svg>
        </button>
        {showOptions && (
          <div className={`absolute top-0 ${isCurrentUser ? 'left-0 -ml-32' : 'right-0 -mr-32'} 
            bg-white shadow-md rounded-md py-1 z-10 w-28`}
          >
            {['reply', 'forward', 'delete'].map((opt) => (
              <button
                key={opt}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  opt === 'delete' ? 'text-red-600' : 'text-gray-700'
                } hover:bg-gray-100`}
                onClick={() => handleOptionClick(opt)}
              >
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>
      {isCurrentUser && (
        <Image
          src={senderAvatar}
          alt={senderName}
          width={32}
          height={32}
          className="w-8 h-8 rounded-full object-cover ml-3 mt-1"
        />
      )}
    </div>
  );
};

export default ChatMessage;
