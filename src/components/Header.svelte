<script lang="ts">
 import { signOut } from 'firebase/auth'
  import { Link, useNavigate } from 'svelte-navigator'
  import { get_auth } from '../lib/fb_helper'

  const navigate = useNavigate()
  export let auth

  const logout = () => {
    signOut(auth)
    navigate('/', { replace: false });
  }
</script>

<header>
  <nav>
    <Link to="/">Home</Link>
    <Link to="about">About</Link>
    <Link to="calendar">Calendar</Link>
  </nav>
  <div on:click={logout}>Sign Out</div>
</header>