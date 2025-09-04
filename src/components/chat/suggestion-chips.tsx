'use client';

import { Button } from '@/components/ui/button';

interface SuggestionChipsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

export function SuggestionChips({
  suggestions,
  onSuggestionClick,
}: SuggestionChipsProps) {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4 animate-fade-in-up">
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          className="h-auto py-1 px-3"
          onClick={() => onSuggestionClick(suggestion)}
        >
          {suggestion}
        </Button>
      ))}
    </div>
  );
}
