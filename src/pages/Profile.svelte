<script lang="ts">
  import { User } from '../lib/stores'
  import { User as UserType } from 'firebase/auth'
  
  let user: UserType
  $: user = $User
</script>


<div class="user_grid">
  <div class="label">Email:</div>
  <div><input type="text" bind:value={user.email} /></div>
  <div>{user.emailVerified}</div>

  <div class="label">Name:</div>
      <div><input type="text" bind:value={user.providerData[0].displayName} />
        {$User.providerData[0].displayName ? $User.providerData[0].displayName : ''}</div>
  <div></div>
  
  <div class="label">Photo:</div>
  <div><img src={$User.photoURL ? $User.photoURL : '/img/avatar.png'} alt="Avatar" /></div>
  <div></div>

  <div class="label"></div>
  <div><button>Save</button><button>Cancel</button></div>
  <div></div>
</div>

{JSON.stringify($User)}

<style>
  .user_grid {
    max-width: 1000px;
    display: grid;
    align-content: center;
    justify-content: center;
    grid-template-columns: 1fr 15fr 1fr;
  }
  .user_grid > div {
    padding: 1em;
  }
  .user_grid > div > img {
    border-radius: 50%;
    max-width: 300px;
  }
  input {
    width: 100%;
  }
  button {
    pointer-events: none;
  }
</style>