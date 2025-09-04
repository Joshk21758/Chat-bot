import type { Message } from '@/app/actions';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-4 p-4 animate-fade-in-up',
        message.role === 'user' && 'justify-end'
      )}
    >
      {message.role === 'assistant' && (
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot className="w-5 h-5" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'rounded-lg px-4 py-2 max-w-[80%] break-words',
          message.role === 'user'
            ? 'bg-primary text-primary-foreground'
            : 'bg-card-foreground/5'
        )}
      >
        <p className="text-sm">{message.content}</p>
      </div>
      {message.role === 'user' && (
        <Avatar className="w-8 h-8">
          <AvatarFallback>
            <User className="w-5 h-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

export function LoadingMessage() {
  return (
    <div className="flex items-start gap-4 p-4 animate-fade-in-up">
      <Avatar className="w-8 h-8">
        <AvatarFallback className="bg-primary text-primary-foreground">
          <Bot className="w-5 h-5" />
        </AvatarFallback>
      </Avatar>
      <div className="rounded-lg px-4 py-3 bg-card-foreground/5">
        <div className="flex items-center space-x-1">
          <Skeleton className="h-2 w-2 rounded-full animate-pulse [animation-delay:-0.3s]" />
          <Skeleton className="h-2 w-2 rounded-full animate-pulse [animation-delay:-0.15s]" />
          <Skeleton className="h-2 w-2 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
