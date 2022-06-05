<script lang="ts">
  import type * as FBTypes from '../../lib/fb_types'
  import { ScreenModes } from '../../lib/enums';
import Organization from '../Organization.svelte';
  export let org : FBTypes.Organization
  export let screen_mode = ScreenModes.View

  console.log(org)
  const save_org = () => {
    let o : FBTypes.Organization = org as FBTypes.Organization
    console.log(o)
    o.save()
  }
</script>


<input bind:value={org.Data.name} placeholder="Name" />
<input bind:value={org.Data.domain} placeholder="Domian suffix" />
<button on:click={save_org}>Save</button>