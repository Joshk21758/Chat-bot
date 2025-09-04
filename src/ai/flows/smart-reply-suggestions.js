'use server';

/**
 * @fileOverview Provides smart reply suggestions based on the current conversation context.
 *
 * - getSmartReplySuggestions - A function that generates smart reply suggestions.
 * - SmartReplySuggestionsInput - The input type for the getSmartReplySuggestions function.
 * - SmartReplySuggestionsOutput - The return type for the getSmartReplySuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartReplySuggestionsInputSchema = z.object({
  conversationHistory: z
    .string()
    .describe('The complete conversation history as a single string.'),
});

const SmartReplySuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('An array of smart reply suggestions.'),
});

export async function getSmartReplySuggestions(
  input
) {
  return smartReplySuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartReplySuggestionsPrompt',
  input: {schema: SmartReplySuggestionsInputSchema},
  output: {schema: SmartReplySuggestionsOutputSchema},
  prompt: `Given the following conversation history, generate three smart reply suggestions.

Conversation History:
{{conversationHistory}}

Suggestions:`,
});

const smartReplySuggestionsFlow = ai.defineFlow(
  {
    name: 'smartReplySuggestionsFlow',
    inputSchema: SmartReplySuggestionsInputSchema,
    outputSchema: SmartReplySuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output;
  }
);
