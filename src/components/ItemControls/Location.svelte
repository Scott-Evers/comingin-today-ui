<script lang="ts">
  import type { Location as Loc } from '../../lib/fb_types'
  import Button, { ButtonTypes } from '../Buttons'
  export let item: Loc

  console.log('location', item)

  const reactivate = () => {
    item.reactivate()
    item.init(item.Ref).then((i) => (item = i))
  }
  const disable = () => {
    item.delete()
    item.init(item.Ref).then((i) => (item = i))
  }
</script>

<div class="tr">
  {#if item.Active}
    <input
      bind:value={item.Name}
      on:change={async (e) => {
        await item.save()
      }}
      placeholder="Location name" />
    <div><Button type={ButtonTypes.Remove} on:click={disable} /></div>
  {/if}
  {#if !item.Active}
    <div>{item.Name}</div>
    <button on:click={reactivate}>reactivate</button>
  {/if}
</div>

<style>
  .tr {
    display: flex;
    flex-direction: row;
    align-content: center;
  }
</style>
