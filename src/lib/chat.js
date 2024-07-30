import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
});

export async function sendChatMessage(message) {
  const messages = [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: message }
  ];

  // Send the chat messages to OpenAI and wait for the response.
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages
  });

  // Take the first choice in the list of responses.
  const [choice] = response.choices;

  console.log('Got response from OpenAI:', choice.message.content);

  // Return the message content.
  return {
    message: choice.message.content
  };
}
