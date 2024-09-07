<script>
  export let data;
</script>

<div class="shadow flex flex-col py-4 px-8 gap-4 items-start rounded-md bg-white">
  {#each data as story}
    <a class="text-blue-900 underline text-xl" target="_blank" href={story.link}>
      {story.title}
    </a>
  {/each}
</div>
