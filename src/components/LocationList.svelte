<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import * as Buttons from './Buttons'

  export let list = [
    { id: '1', name: 'HQ', selected: false },
    { id: '2', name: 'Branch one', selected: false },
    { id: '3', name: 'The bar', selected: false },
    { id: '4', name: 'Behind the building', selected: false },
    { id: '5', name: 'Clubhouse', selected: false },
  ]

  const dispatch = createEventDispatcher()
</script>

<div class="background">
  <div class="list_container">
    {#each list as location, i}
      <div class="location" on:click={() => dispatch('selected', location)}>
        <div class="material-symbols-outlined" style="font-size: 1em;">
          {location.selected ? 'check_box' : 'check_box_outline_blank'}
        </div>
        &nbsp;
        {location.name}
      </div>
    {/each}
    <div style="position: absolute; top: 0; right: 0; margin: 1em;">
      <Buttons.Close on:click={() => dispatch('cancel', null)} />
    </div>
  </div>
</div>

<style>
  .background {
    position: fixed;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.85);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(12, 1fr);
    justify-content: space-around;
    align-content: center;
  }
  .list_container {
    position: relative;
    grid-row-start: 2;
    grid-row-end: 12;
    grid-column-start: 2;
    grid-column-end: 12;
    display: flex;
    flex-direction: column;
    scroll-behavior: auto;
    background-color: white;
    padding: 1em;
    overflow-y: scroll;
    scroll-behavior: auto;
  }
  .location {
    margin: 0.2em;
    padding: 0.4em;
    width: 100%;
    cursor: pointer;
    border-radius: 0.2em;
  }
  .location:hover {
    background-color: var(--muted-color-2);
  }
  .button_cancel {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 12;
  }
</style>
