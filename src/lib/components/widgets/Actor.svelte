<script>
  export let data;
</script>

<div class="shadow flex flex-col py-4 px-8 m-auto rounded-md justify-between">
    <div>
      <h2 class="text-3xl">{data.name}</h2>
      <img src={data.photo} />
    </div>
    <div class="grid grid-cols-3 gap-4 items-end">
      {#each data.movies as movie}
        <div class="flex flex-col">
          <h3>{movie.title}</h3>
          <img src={movie.poster} />
        </div>
      {/each}
    </div>
</div>