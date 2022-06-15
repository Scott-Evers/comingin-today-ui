<script lang="ts">
  import { Link } from 'svelte-navigator'
  import { createEventDispatcher } from 'svelte'
  import * as Components from '.'
  import * as Buttons from './Buttons'

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
        <Link to="calendar">Calendar</Link>
      </nav>
      <Link to="/settings"><Buttons.Settings /></Link>
      <Buttons.User on:click={toggle_flyover} />
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
  .navbar > nav {
    display: flex;
    flex-direction: row;    
  }

  .user_icon {
    cursor: pointer;
  }
</style>