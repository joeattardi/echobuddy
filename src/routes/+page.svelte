<script>
  import ChatText from 'phosphor-svelte/lib/ChatText';

  let response = '';
  let error;

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
    event.preventDefault();
    const formData = new FormData(event.target);
    const query = formData.get('query');
    try {
      error = null;
      response = await sendChatRequest(query);
    } catch (apiError) {
      error = apiError;
    }
}
</script>

<main class="p-4">
  <h1 class="text-2xl flex items-center justify-center gap-2">
    <ChatText />
    EchoBuddy
  </h1>
  <div class="w-2/3 m-auto text-center">
    <form on:submit={handleQuery}>
      <input type="text" name="query" class="border border-slate-800 w-full rounded p-2">
    </form>
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
