<script lang="ts">
  import { Link } from 'svelte-navigator'
  import { createEventDispatcher } from 'svelte'
  import Components from '.'

  export let user

  const dispatch = createEventDispatcher()
  let flyover_visible = false

  const toggle_flyover = () => flyover_visible = !flyover_visible

</script>

<header>
  <div class="navbar">
    {#if user}
      <nav>
        <Link to="/">Home</Link>
        <Link to="about">About</Link>
        <Link to="calendar">Calendar</Link>
      </nav>
      <div class="user_icon" on:click={toggle_flyover}>User Menu</div>
    {:else}
      <div></div>
      <nav>
        <Link to="/login">Login</Link>
      </nav>
      {/if}
    {#if flyover_visible}
      <Components.UserFlyover on:logout />
    {/if}
  </div>

</header>

<style>
  .navbar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .user_icon {
    cursor: pointer;
  }
</style>