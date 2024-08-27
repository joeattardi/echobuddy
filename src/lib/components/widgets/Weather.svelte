<script>
  export let data;
  const iconUrl = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
</script>

<div class="shadow flex py-4 px-8 m-auto rounded-md justify-between w-80">
  <div>
    <h3 class="text-2xl">{data.location}</h3>
    <div class="text-4xl">{data.temperature}°</div>
    <div>{data.conditions}</div>
  </div>
  <img src={iconUrl} />
</div>
