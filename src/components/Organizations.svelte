<script lang="ts">

import { OrganizationUser } from '../lib/OrganizationUsers'
import { User } from '../lib/stores'
import { ScreenModes } from "../lib/enums"
import Components from '.'
import Login from '../pages/Login.svelte';
import { get_current_component } from 'svelte/internal';
import App from '../App.svelte';


let screen_mode: ScreenModes = ScreenModes.View

let ou: OrganizationUser = new OrganizationUser($User)
let ouser: Promise<OrganizationUser> = OrganizationUser.get_current($User)


const create_org = () => {
  screen_mode = ScreenModes.Create
}
</script>

{#await ouser}
  Loading...
{:then ou}
<div>
  {#if screen_mode == ScreenModes.View}
    <div class="managed_org_header">Managed Organizations</div>
    {#each ou.ManagedOrgs as org}
      <div class="managed_org_name">{org.Name}</div>
    {/each}
    <div><button on:click={create_org}>Create</button></div>
    <div class="member_org_header">Organization Memberships</div>
    {#each ou.MemberOrgs as org}
      <div class="">{org.Name}</div>
    {/each}
    
    {/if}
    
    {#if screen_mode == ScreenModes.Create}
    <Components.Organization org_user={ou} screen_mode={ScreenModes.Create} />
  {/if}
</div>
{:catch e}
  {console.warn('ouser',ouser)}
  {console.error('error',e)}
{/await}

<style>
  .managed_org_name {
    font-size: 1.5rem;
    cursor: pointer;
  }
</style>