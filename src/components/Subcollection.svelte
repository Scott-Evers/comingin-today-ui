<script lang="ts">
import type { SvelteComponent } from "svelte";

  export let title : string
  export let items : Array<any>
  export let item_control
</script>


Hello world


<div class="table">
  <div class="th">
    <div>{title}</div><div><button>+</button></div>
  </div>
  {#each items as item}
    <svelte:component this={item_control} />
  {/each}
</div>


<style>
  .table {
    display: flex;
    flex-direction: column;
  }
  .th {
    display: flex;
    flex-direction: row;
  }
  .tr {
    display: flex;
    flex-direction: row;
  }
</style>