<script lang="ts">
  import type * as FBTypes from '../lib/fb_types'
  import {ScreenModes} from '../lib/enums'
  import {User} from '../lib/stores'
  import Subcollection from './Subcollection.svelte'
  import type { DocumentReference } from 'firebase/firestore';
  import LocationControl from './ItemControls/Location.svelte'
  import MemberControl from './ItemControls/Member.svelte'
  import OrganizationControl from './ItemControls/Organization.svelte'

  export let org : FBTypes.Org = null
  export let screen_mode : ScreenModes = ScreenModes.View

  if (org == null) {
    //org_ready = FBTypes.Org.create_org($User.uid)
    console.error('no org specified')
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


  <OrganizationControl org={org} />
  <Subcollection title="Locations" items={org.Locations} 
      item_control={LocationControl} />
  <Subcollection title="Members" items={org.Members} 
      item_control={MemberControl} />
{#if screen_mode != ScreenModes.View}
  <button on:click={update_org}>Save</button>
{/if}


