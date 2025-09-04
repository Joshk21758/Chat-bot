'use client';

import { useState, useEffect } from 'react';
import {
  getImprovedQuery,
  getSuggestions,
  getSummary,
} from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { ChatHeader } from './chat-header';
import { ChatMessages } from './chat-messages';
import { ChatInput } from './chat-input';
import { EmptyScreen } from './empty-screen';
import { SuggestionChips } from './suggestion-chips';
import { Card } from '@/components/ui/card';

const initialMessages = [
  {
    id: '0',
    role: 'assistant',
    content:
      "Hello! I'm SmartChat. I can help you refine your questions to get better answers. Type a query to get started.",
  },
];

export default function ChatLayout() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const { toast } = useToast();

  const fetchSuggestions = async (currentMessages) => {
    const newSuggestions = await getSuggestions(currentMessages);
    setSuggestions(newSuggestions);
  };

  useEffect(() => {
    if (messages.length > 1) {
      fetchSuggestions(messages);
    }
  }, [messages]);

  const handleSendMessage = async (messageContent) => {
    if (isLoading) return;

    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: messageContent,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);
    setSuggestions([]);

    const assistantResponse = await getImprovedQuery(newMessages, messageContent);
    setMessages(prevMessages => [...prevMessages, assistantResponse]);
    setIsLoading(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    handleSendMessage(suggestion);
    setInput('');
  };

  const handleClear = () => {
    setMessages(initialMessages);
    setSuggestions([]);
  };

  const handleSummarize = async () => {
    setIsLoading(true);
    const summary = await getSummary(messages);
    toast({
      title: 'Chat Summary',
      description: summary,
      duration: 9000,
    });
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-2xl h-[90dvh] max-h-[800px] flex flex-col shadow-2xl rounded-xl">
      <ChatHeader onClear={handleClear} onSummarize={handleSummarize} />
      {messages.length > 0 ? (
        <ChatMessages messages={messages} isLoading={isLoading} />
      ) : (
        <EmptyScreen onSuggestionClick={handleSuggestionClick} />
      )}
      <div className="p-4 border-t">
        <SuggestionChips
          suggestions={suggestions}
          onSuggestionClick={handleSuggestionClick}
        />
        <ChatInput
          input={input}
          setInput={setInput}
          handleSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </Card>
  );
}
