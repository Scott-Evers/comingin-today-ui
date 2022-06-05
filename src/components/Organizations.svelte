<script lang="ts">

import * as FBTypes from '../lib/fb_types'
import { User } from '../lib/stores'
import { ScreenModes } from "../lib/enums"
import Components from '.'
import { each } from 'svelte/internal'
import Organization from './Organization.svelte';
import type { DocumentReference } from 'firebase/firestore';


let screen_mode: ScreenModes = ScreenModes.View

let org_promise: Promise<FBTypes.Organizations> = FBTypes.Organizations.memberships($User.uid)
let current_org_ref : DocumentReference


const delete_org = (org) => {
  console.info('delete org',org)
  org.delete()
}
const edit_org = (org) => {
  current_org_ref = org.ref
  screen_mode = ScreenModes.Edit
}
const create_org = () => {
  current_org_ref = null
  screen_mode = ScreenModes.Edit
}
</script>

{#await org_promise}
  Loading...
{:then orgs}
<div>
  {#if screen_mode == ScreenModes.View}
    <div class="managed_org_header">Managed Organizations</div>
    {#each orgs as org}
        <div class="managed_org_name">
          {org.Data.name}
          <button on:click={e => edit_org(org)}>edit</button>
          <button on:click={e => delete_org(org)}>delete</button>
        </div>
    {/each}

    <div><button on:click={create_org}>Create</button></div>

    <div class="member_org_header">Organization Memberships</div>
    {#each orgs as org}
      <div class="">{org.Data.name}</div>
    {/each} 
    
  {/if}
  {#if screen_mode != ScreenModes.View}
     <Components.Organization bind:screen_mode={screen_mode} org_ref={current_org_ref} />
  {/if}
</div>
{:catch e}
  {console.error('error',e)}
{/await}

<style>
  .managed_org_name {
    font-size: 1.5rem;
    cursor: pointer;
  }
  .member_org_name {
    color: #888;
  }
</style>