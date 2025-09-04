'use client';

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Sparkles, Trash2 } from 'lucide-react';

export function ChatHeader({ onClear, onSummarize }) {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <h1 className="text-xl font-bold font-headline">Gemini Chat Companion</h1>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onSummarize}>
          <Sparkles className="w-5 h-5 text-accent" />
          <span className="sr-only">Summarize Chat</span>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Trash2 className="w-5 h-5 text-destructive" />
              <span className="sr-only">Clear Chat</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the current chat history.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onClear}>Clear</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </header>
  );
}
