// Summarizes the chat history provided as input.
//
// - summarizeChatHistory - A function that summarizes the chat history.
// - SummarizeChatHistoryInput - The input type for the summarizeChatHistory function.
// - SummarizeChatHistoryOutput - The return type for the summarizeChatHistory function.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeChatHistoryInputSchema = z.object({
  chatHistory: z.string().describe('The complete chat history to summarize.'),
});

const SummarizeChatHistoryOutputSchema = z.object({
  summary: z.string().describe('The summarized chat history.'),
});

export async function summarizeChatHistory(
  input
) {
  return summarizeChatHistoryFlow(input);
}

const summarizeChatHistoryPrompt = ai.definePrompt({
  name: 'summarizeChatHistoryPrompt',
  input: {schema: SummarizeChatHistoryInputSchema},
  output: {schema: SummarizeChatHistoryOutputSchema},
  prompt: `Summarize the following chat history. The summary should be concise and capture the main points of the conversation:\n\nChat History:\n{{chatHistory}}`,
});

const summarizeChatHistoryFlow = ai.defineFlow(
  {
    name: 'summarizeChatHistoryFlow',
    inputSchema: SummarizeChatHistoryInputSchema,
    outputSchema: SummarizeChatHistoryOutputSchema,
  },
  async input => {
    const {output} = await summarizeChatHistoryPrompt(input);
    return output;
  }
);
