<script lang="ts">
  import * as FBTypes from '../lib/fb_types'
  import {ScreenModes} from '../lib/enums'
  import {User} from '../lib/stores'
  import Subcollection from './Subcollection.svelte'
  import type { DocumentReference } from 'firebase/firestore';
  import LocationControl from './ItemControls/Location.svelte'
  import OrganizationControl from './ItemControls/Organization.svelte'

  export let org_ref : DocumentReference = null
  export let screen_mode : ScreenModes = ScreenModes.View

  let org_ready : Promise<FBTypes.Organization>
  let org : FBTypes.Organization
  if (org_ref == null) {
    org_ready = FBTypes.Organization.create_org($User.uid)
  } else {
    org_ready = FBTypes.Organization.load(org_ref)
  }

  const update_org = async () => {
    try {
      console.log(org)
      org.save()
      screen_mode = ScreenModes.View
    } catch (e) {
      console.error('Error saving organization:',e)
    }
  }

</script>

{#await org_ready}
Loading organization
{:then org_resolved}
<OrganizationControl org={org_resolved} />
<Subcollection title="Locations" items={org_resolved.Locations} 
    item_control={LocationControl} />
{#if screen_mode != ScreenModes.View}
  <button on:click={update_org}>Save</button>
{/if}
{/await}

