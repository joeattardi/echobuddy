import { getJoke } from './getJoke';
import { getWeather } from './getWeather';
import { getNews } from './getNews';
import { getStock } from './getStock';
import { getNowPlaying } from './getNowPlaying';
import { getActor } from './getActor';
import { getMovie } from './getMovie';

const functions = {
  getJoke,
  getWeather,
  getNews,
  getStock,
  getNowPlaying,
  getActor,
  getMovie
};

export async function callFunction(name, args, toolCallId, openai, messages) {
  console.log('Calling function:', name);
  const result = await functions[name](args);
  console.log('Function result:', result);

  // Create a message containing the function result
  const toolResult = {
    role: 'tool',
    content: JSON.stringify(result.reply),
    tool_call_id: toolCallId
  };

  // Add this message to the message history
  messages.push(toolResult);

  // Send the updated message history to OpenAI
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages
  });

  console.log('Received from OpenAI:', response.choices[0].message.content);
  return {
    message: response.choices[0].message.content,
    data: {
      function: name,
      widgetData: result.widgetData
    }
  };
}
