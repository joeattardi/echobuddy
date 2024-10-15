<script>
  export let data;
</script>

<div class="shadow flex flex-col py-4 px-8 m-auto rounded-md">
  <div class="flex items-start gap-4">
    <img src={data.poster}>
    <div class="flex flex-col items-start gap-4 text-left">
      <h2 class="text-3xl">{data.title}</h2>
      <p>{data.released}</p>
      <p>{data.overview}</p>
    </div>
  </div>
  <div>
    <h3 class="text-xl">Cast</h3>
    <div class="grid grid-cols-3 gap-4">
      {#each data.cast as person}
        <div class="flex flex-col">
          <img src={person.photo}>
          <h4>{person.name}</h4>
          <p>{person.character}</p>
        </div>
      {/each}
    </div>
  </div>
</div>
