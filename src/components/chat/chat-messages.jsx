'use client';

import { useEffect, useRef } from 'react';
import { ChatMessage, LoadingMessage } from './chat-message';
import { ScrollArea } from '../ui/scroll-area';

export function ChatMessages({ messages, isLoading }) {
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isLoading]);

  return (
    <ScrollArea className="flex-1" ref={scrollAreaRef}>
      <div className="p-4">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && <LoadingMessage />}
      </div>
    </ScrollArea>
  );
}
