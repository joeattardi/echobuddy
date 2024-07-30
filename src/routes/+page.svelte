<script>
  import ChatText from 'phosphor-svelte/lib/ChatText';

  let response = '';

  function handleQuery(event) {
    event.preventDefault();
    response = 'Thanks for your question, we will have an answer for you soon!';
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
  </div>
</main>
