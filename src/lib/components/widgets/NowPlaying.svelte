<script>
  export let data;
</script>

<div class="grid grid-cols-3 gap-4">
  {#each data as movie}
    <div class="flex flex-col items-center">
      <img src={movie.poster} />
      <h2 class="text-xl">{movie.title}</h2>
    </div>
  {/each}
</div>
