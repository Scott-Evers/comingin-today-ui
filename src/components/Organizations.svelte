<script lang="ts">

import * as FBTypes from '../lib/fb_types'
import * as Buttons from './Buttons'
import { User } from '../lib/stores'
import { ScreenModes } from "../lib/enums"
import Components from '.'
import { each } from 'svelte/internal'
import Organization from './Organization.svelte';
import type { DocumentReference } from 'firebase/firestore';
import App from '../App.svelte'
import Add from './Buttons/Add.svelte';
import Remove from './Buttons/Remove.svelte';


let screen_mode: ScreenModes = ScreenModes.View

let g_orgs : FBTypes.Orgs = new FBTypes.Orgs()
let org_promise: Promise<FBTypes.Orgs> = g_orgs.get_by_member($User.uid)
let current_org_ref : FBTypes.Org

 
const delete_org = (org) => {
  console.info('delete org',org)
  org.delete()
}
const edit_org = (org) => {
  console.log('Editing',org)
  current_org_ref = org
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
        {org.Name}
        <Buttons.Edit on:click={e => edit_org(org)} />
        <Buttons.Remove on:click={e => delete_org(org)} />
      </div>
    {/each}

    <div style="text-align: right;"><Buttons.Add style="font-size: 3.6rem;" on:click={create_org} /></div>

    <div class="member_org_header">Organization Memberships</div>
    {#each orgs as org}
      <div class="">{org.Name}</div>
    {/each} 
    
  {/if}
  {#if screen_mode != ScreenModes.View}
     <Components.Organization bind:screen_mode={screen_mode} org={current_org_ref} />
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