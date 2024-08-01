import { getJoke } from './getJoke';

const functions = {
  getJoke
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
    message: response.choices[0].message.content
  };
}
