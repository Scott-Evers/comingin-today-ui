<script lang="ts">
  import type { Member, User } from '../../lib/fb_types'
  export let item : Member

  console.log('member',item)

  const promote = () => {
    item.promote().then(v => item.init(item.Ref).then(i => item = i))
  }
  const demote = () => {
    item.demote().then(v => item.init(item.Ref).then(i => item = i))
  }
  const revoke = () => {
    item.revoke().then(v => item.init(item.Ref).then(i => item = i))
  }
</script>


    <div class="tr">
      {#await item.User}
      Getting user info
      {:then user}
      {console.log(user)}
        <div>{user.Nickname}</div>
        {#if item.IsOwner}
            <div><button on:click={demote}>Demote to member</button></div>
        {/if}
        {#if !item.IsOwner}
          <button on:click={promote}>Make owner</button>
          <button on:click={revoke}>remove from org</button>
        {/if}
      {/await}
    </div>

  <style>  
    .tr {
      display: flex;
      flex-direction: row;
      align-content: center;
    }
  </style>