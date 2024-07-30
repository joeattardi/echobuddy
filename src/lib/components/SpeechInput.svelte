<script>
  import { createEventDispatcher } from 'svelte';
  import Microphone from 'phosphor-svelte/lib/Microphone';
  import { captureSpeech } from '$lib/speech';

  let isListening = false;
  let query = '';

  const dispatch = createEventDispatcher();

  async function onClickCapture() {
    try {
      isListening = true;
      query = await captureSpeech();
      dispatch('query', query);
    } catch (error) {
      dispatch('error', error);
    } finally {
      isListening = false;
    }
  }
</script>

<div class="m-4">
  <button
    on:click={onClickCapture}
    class="rounded-full p-2"
    class:bg-gray-200={!isListening}
    class:bg-blue-200={isListening}
  >
    <Microphone size={64} /></button
  >
  <div class="text-gray-400 text-2xl">{query}</div>
</div>
