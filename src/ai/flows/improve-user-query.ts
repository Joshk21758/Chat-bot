'use server';

/**
 * @fileOverview Flow to improve user queries for better clarity and relevance.
 *
 * - improveUserQuery - A function that improves the user's query using GenAI.
 * - ImproveUserQueryInput - The input type for the improveUserQuery function.
 * - ImproveUserQueryOutput - The return type for the improveUserQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveUserQueryInputSchema = z.object({
  query: z.string().describe('The user query to be improved.'),
});
export type ImproveUserQueryInput = z.infer<typeof ImproveUserQueryInputSchema>;

const ImproveUserQueryOutputSchema = z.object({
  improvedQuery: z.string().describe('The improved user query.'),
});
export type ImproveUserQueryOutput = z.infer<typeof ImproveUserQueryOutputSchema>;

export async function improveUserQuery(input: ImproveUserQueryInput): Promise<ImproveUserQueryOutput> {
  return improveUserQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveUserQueryPrompt',
  input: {schema: ImproveUserQueryInputSchema},
  output: {schema: ImproveUserQueryOutputSchema},
  prompt: `You are an AI assistant designed to improve user queries for clarity and relevance.\n\nUser Query: {{{query}}}\n\nImproved Query:`,
});

const improveUserQueryFlow = ai.defineFlow(
  {
    name: 'improveUserQueryFlow',
    inputSchema: ImproveUserQueryInputSchema,
    outputSchema: ImproveUserQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
