<script lang="ts">
  import {Organization} from '../lib/Organizations'
  import {ScreenModes} from '../lib/enums'
  import {User} from '../lib/stores'
  import type { OrganizationUser } from '../lib/OrganizationUsers';

  export let org = new Organization($User)
  export let org_user : OrganizationUser
  export let screen_mode : ScreenModes = ScreenModes.View

  const create_org = async () => {
    org.save(org_user)
    screen_mode = ScreenModes.View
  }
  const update_org = async () => {
    org.save(org_user)
    screen_mode = ScreenModes.View
  }
</script>

{#if screen_mode == ScreenModes.Create}
  <input bind:value={org.Name} placeholder="Name" />
  <button on:click={create_org}>Create</button>
{/if}

{#if screen_mode == ScreenModes.Edit}
  <input bind:value={org.Name} placeholder="Name" />
  {JSON.stringify(org.Locations )}
  {#each org.Locations as location}
    <div>{location.Name}</div>
  {/each}
  <button on:click={update_org}>Save</button>
{/if}
