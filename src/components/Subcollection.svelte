<script lang="ts">
  import Button, { ButtonTypes } from './Buttons/'
  export let title: string
  export let items: Array<any>
  export let item_control

  console.log('items', items)
</script>

Hello world

<div class="table">
  <div class="th">
    <div>{title}</div>
    <div><Button type={ButtonTypes.Add} classes={[]} on:click={() => console.log('add')} /></div>
  </div>
  {#each items as item}
    {console.log({ item })}
    {console.log({ item_control })}
    <svelte:component this={item_control} {item} />
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
