import { config } from 'dotenv';
config();

import '@/ai/flows/smart-reply-suggestions.ts';
import '@/ai/flows/improve-user-query.ts';
import '@/ai/flows/summarize-chat-history.ts';