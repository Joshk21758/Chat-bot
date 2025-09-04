'use server';

import { improveUserQuery } from '@/ai/flows/improve-user-query';
import { getSmartReplySuggestions } from '@/ai/flows/smart-reply-suggestions';
import { summarizeChatHistory } from '@/ai/flows/summarize-chat-history';

export async function getImprovedQuery(
  currentConversation,
  query
) {
  try {
    const { improvedQuery } = await improveUserQuery({ query });
    return {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: `I've improved your query: "${improvedQuery}"`,
    };
  } catch (error) {
    console.error(error);
    return {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: "Sorry, I couldn't improve your query at the moment.",
    };
  }
}

export async function getSuggestions(messages) {
  if (messages.length === 0) return [];
  try {
    const conversationHistory = messages
      .map(m => `${m.role}: ${m.content}`)
      .join('\n');
    const { suggestions } = await getSmartReplySuggestions({
      conversationHistory,
    });
    return suggestions;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getSummary(messages) {
  if (messages.length === 0) return 'The chat is empty.';
  try {
    const chatHistory = messages
      .map(m => `${m.role}: ${m.content}`)
      .join('\n');
    const { summary } = await summarizeChatHistory({ chatHistory });
    return summary;
  } catch (error) {
    console.error(error);
    return "Sorry, I couldn't summarize the chat at the moment.";
  }
}
