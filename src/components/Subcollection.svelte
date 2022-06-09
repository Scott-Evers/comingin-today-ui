<script lang="ts">
import type { SvelteComponent } from "svelte";
 import * as Buttons from './Buttons/'
  export let title : string
  export let items : Array<any>
  export let item_control

  console.log('items',items)
</script>


Hello world


<div class="table">
  <div class="th">
    <div>{title}</div><div><Buttons.Add classes={[]} on:click={() => console.log('add')} /></div>
  </div>
  {#each items as item}
    <svelte:component this={item_control} item={item} />
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

</style>