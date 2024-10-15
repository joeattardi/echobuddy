import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';

import { schema as getJoke } from './functions/getJoke';
import { schema as getWeather } from './functions/getWeather';
import { schema as getNews } from './functions/getNews';
import { schema as getStock } from './functions/getStock';
import { schema as getNowPlaying } from './functions/getNowPlaying';
import { schema as getActor } from './functions/getActor';
import { schema as getMovie } from './functions/getMovie';
import { callFunction } from './functions';

const tools = [
  getJoke,
  getWeather,
  getNews,
  getStock,
  getNowPlaying,
  getActor,
  getMovie
];

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
});

export async function sendChatMessage(message) {
  const messages = [
    { role: 'system', content: 'You are a helpful assistant. When calling a function, only include data from the function call in your response. Do not use Markdown in the response, use plain text only.' },
    { role: 'user', content: message }
  ];

  // Send the chat messages to OpenAI and wait for the response.
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages,
    tools,
    tool_choice: 'auto'
  });

  // Take the first choice in the list of responses.
  const [choice] = response.choices;

  console.log('Got response from OpenAI:', choice.message.content);

  if (choice.finish_reason === 'tool_calls') {
    // Add this response message to the message list.
    messages.push(choice.message);

    // Get the first tool call and capture the ID and function name.
    const [toolCall] = choice.message.tool_calls;
    const id = toolCall.id;
    const name = toolCall.function.name;
    console.log('Received tool call:', name);

    // Parse the arguments to a JavaScript object.
    const args = JSON.parse(toolCall.function.arguments);

    // Call the helper.
    return callFunction(name, args, id, openai, messages);
  }

  // Return the message content.
  return {
    message: choice.message.content
  };
}
