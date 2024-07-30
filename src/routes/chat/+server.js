import { json, error } from '@sveltejs/kit';
import { sendChatMessage } from '../../lib/chat.js';

export async function POST({ request }) {
  // Extract the payload from the request
  const { query } = await request.json();

  try {
    // Call the OpenAI helper
    const response = await sendChatMessage(query);
    
    // Return the response as JSON.
    return json({
      response
    });
  } catch (apiError) {
    // If there was an error with the OpenAI call, return a
    // HTTP 500 error.
    console.error('OpenAI error:', apiError);
    return error(500, 'Failed to get response from OpenAI');
  }
}
