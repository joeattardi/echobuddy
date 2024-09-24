<script>
  import { ArrowUp, ArrowDown } from 'phosphor-svelte';
  export let data;
</script>

{#if data?.ticker}
  <!-- Define a constant for the change in price from the opening price -->
  <div class="shadow py-4 px-8 m-auto rounded-md bg-white w-80">
    <div class="text-4xl">{data.ticker}</div>
    <h3 class="text-2xl">{data.company}</h3>
    <div class="text-xl">{data.price}</div>
    <!-- Conditionally apply CSS classes to the following div:
      - text-red-500 if change < 0
      - text-green-500 if change > 0 
    -->
    <div
      class="text-xl justify-center flex items-center"
    >
      <!-- Render ArrowDown if change < 0, render ArrowUp if change > 0 -->
      <!-- Render the value of the change constant above -->
    </div>
  </div>
{/if}
