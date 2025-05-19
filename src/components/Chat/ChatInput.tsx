// ChatInput.tsx
import React, { useState, useRef, useEffect } from 'react';
import { ChatInputProps } from './types';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onSendFile,
  onSendVoice
}) => {
  const [message, setMessage] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [showAttachments, setShowAttachments] = useState<boolean>(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const attachmentsRef = useRef<HTMLDivElement>(null);

  // Auto-grow textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  // Close emoji picker and attachments dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
      if (attachmentsRef.current && !attachmentsRef.current.contains(event.target as Node)) {
        setShowAttachments(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    onSendMessage(message);
    setMessage('');
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleFileUpload = (inputRef: React.RefObject<HTMLInputElement>) => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: string) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onSendFile(files[0]);
      console.log(`Uploading ${fileType} file:`, files[0].name);
      // Reset the input to allow selecting the same file again
      if (e.target) {
        e.target.value = '';
      }
    }
    setShowAttachments(false);
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    onSendVoice();
    setShowAttachments(false);
  };

  return (
    <div className="border-t px-5 py-3 flex items-end bg-white">
          {/* Attachments dropdown */}
      <div className="relative mr-3" ref={attachmentsRef}>
        <button 
          className="p-2 rounded-full border bg-blue-500 text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={() => setShowAttachments(!showAttachments)}
          aria-label="Add attachments"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        
        {showAttachments && (
          <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg p-2 flex flex-col space-y-2 z-10">
            <button 
              onClick={() => handleFileUpload(documentInputRef)}
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm">Document</span>
            </button>
            
            <button 
              onClick={() => handleFileUpload(imageInputRef)}
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">Image</span>
            </button>
            
            <button 
              onClick={() => handleFileUpload(videoInputRef)}
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">Video</span>
            </button>
            
            <button 
              onClick={handleVoiceRecord}
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              <span className="text-sm">Voice</span>
            </button>
          </div>
        )}
      </div>
      
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={documentInputRef}
        className="hidden"
        onChange={(e) => handleFileChange(e, 'document')}
        accept=".pdf,.doc,.docx,.txt,.xls,.xlsx"
      />
      <input
        type="file"
        ref={imageInputRef}
        className="hidden"
        onChange={(e) => handleFileChange(e, 'image')}
        accept="image/*"
      />
      <input
        type="file"
        ref={videoInputRef}
        className="hidden"
        onChange={(e) => handleFileChange(e, 'video')}
        accept="video/*"
      />
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => handleFileChange(e, 'file')}
        accept="*/*"
      />
      
      <div className="flex-1 bg-white overflow-hidden">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message here"
          className="w-full p-2 border-none border-transparent outline-none focus:outline-none resize-none min-h-[40px] max-h-[120px]"
          rows={1}
        />
      </div>
      
      <div className="flex ml-3 space-x-2">
        {/* Emoji picker */}
        <div className="relative" ref={emojiPickerRef}>
          <button 
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            aria-label="Add emoji"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          
          {showEmojiPicker && (
            <div className="absolute bottom-full right-0 mb-2 z-10">
              <EmojiPicker 
                onEmojiClick={handleEmojiClick} 
                theme={Theme.LIGHT}
                width={320}
                height={400}
                lazyLoadEmojis={true}
              />
            </div>
          )}
        </div>
        
        <button 
          onClick={handleSendMessage}
          disabled={message.trim() === ''}
          className={`p-2 rounded-full ${
            message.trim() === '' 
              ? 'bg-blue-300 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
          aria-label="Send message"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-0 translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;