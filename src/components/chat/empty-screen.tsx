'use client';

import { Button } from '@/components/ui/button';
import { CornerDownLeft } from 'lucide-react';

interface EmptyScreenProps {
  onSuggestionClick: (suggestion: string) => void;
}

const exampleMessages = [
  {
    heading: 'Explain a concept',
    message: `What is the theory of relativity?`,
  },
  {
    heading: 'Summarize an article',
    message: 'Summarize the following article for a 5 year old: \n',
  },
  {
    heading: 'Give me ideas',
    message: `What are some creative gift ideas for a programmer?`,
  },
];

export function EmptyScreen({ onSuggestionClick }: EmptyScreenProps) {
  return (
    <div className="mx-auto max-w-2xl px-4 flex-1 flex items-center justify-center">
      <div className="rounded-lg border bg-background p-8 w-full text-center">
        <h1 className="mb-2 text-lg font-semibold font-headline">
          Welcome to SmartChat
        </h1>
        <p className="mb-6 leading-normal text-muted-foreground">
          Start a conversation or try one of these examples.
        </p>
        <div className="flex flex-col items-start space-y-2">
          {exampleMessages.map((item, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => onSuggestionClick(item.message)}
            >
              <CornerDownLeft className="mr-2 h-4 w-4" />
              {item.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
