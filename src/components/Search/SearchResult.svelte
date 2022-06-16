<script lang="ts">
  export let items: Array<any>
  export let item_control
</script>

<div class="list_container">
  {#each items as item}
    <svelte:component this={item_control} {item} />
  {/each}
</div>

<style>
  .list_container {
    display: flex;
    flex-direction: column;
  }
</style>
