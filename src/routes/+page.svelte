<script>
  import ChatText from 'phosphor-svelte/lib/ChatText';
  import CircleNotch from 'phosphor-svelte/lib/CircleNotch';
  import SpeechInput from '$lib/components/SpeechInput.svelte';
  import { speakText } from '$lib/speech';

  let response = '';
  let error;
  let isLoading = false;

  async function sendChatRequest(query) {
    const apiResponse = await fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    });

    const data = await apiResponse.json();
    if (apiResponse.status !== 200) {
      throw new Error(data.message);
    }

    return data.response.message;
  }

  async function handleQuery(event) {
    const query = event.detail;
    try {
      error = null;
      isLoading = true;
      response = await sendChatRequest(query);
      speakText(response);
    } catch (apiError) {
      error = apiError;
    } finally {
      isLoading = false;
    }
  }

  function handleSpeechError(event) {
    error = event.detail;
  }
</script>

<main class="p-4">
  <h1 class="text-2xl flex items-center justify-center gap-2">
    <ChatText />
    EchoBuddy
  </h1>
  <div class="w-2/3 m-auto text-center">
    <SpeechInput on:query={handleQuery} on:error={handleSpeechError} />
    {#if isLoading}
      <CircleNotch class="m-auto animate-spin" size={64} />
    {/if}
    <div class="mt-4">
      {response}
    </div>
    {#if error}
      <div class="bg-red-300 p-4">
        {error}
      </div>
    {/if}
  </div>
</main>
