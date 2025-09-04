'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

export function ChatInput({
  input,
  setInput,
  handleSendMessage,
  isLoading,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    handleSendMessage(input);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!input.trim() || isLoading) return;
      handleSendMessage(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center">
      <Textarea
        placeholder="Type your message..."
        className="pr-16 resize-none min-h-[40px] max-h-[200px]"
        rows={1}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
      <Button
        type="submit"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-accent hover:bg-accent/90"
        disabled={isLoading || !input.trim()}
      >
        <Send className="w-4 h-4 text-accent-foreground" />
      </Button>
    </form>
  );
}
