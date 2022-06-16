<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import * as FBTypes from '../lib/fb_types'
  import Button, { ButtonTypes } from './Buttons'
  import { CurrentUserOrgs } from '../lib/stores'

  const get_locations = async (): Promise<FBTypes.Locations> => {
    let locs: FBTypes.Locations = new FBTypes.Locations()
    await $CurrentUserOrgs.forEach(async (org) => {
      await org.Locations.forEach((loc) => {
        loc.Name = `${loc.Name} (${org.Name})`
        locs.push(loc)
      })
    })
    return locs
  }

  const dispatch = createEventDispatcher()
</script>

<div class="background">
  <div class="list_container">
    {#await get_locations() then list}
      {#each list as location}
        <div class="location" on:click={() => dispatch('selected', location)}>
          {location.Name}
        </div>
      {/each}
    {/await}
    <div style="position: absolute; top: 0; right: 0; margin: 1em;">
      <Button type={ButtonTypes.Close} on:click={() => dispatch('cancel', null)} />
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
</style>
