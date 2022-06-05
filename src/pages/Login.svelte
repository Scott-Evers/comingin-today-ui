<script lang="ts">
  import { useNavigate, useLocation } from "svelte-navigator"
  import * as FBUtil from '../lib/fb_util'
  import { Auth, getAuth } from 'firebase/auth'

  const navigate = useNavigate();
  const location = useLocation();

  export let auth

  let username;
  let password;

  async function handleSubmit() {
    try {
      let user = await FBUtil.authenticate_user_passwd(auth,username,password)
      if (user) {
        const from = ($location.state && $location.state.from) || "/";
        navigate(from, { replace: true });
      }
    } catch (err) {
      alert(err)
      console.error(err)
    }
  }
</script>

<h3>Login</h3>
  <input
    bind:value={username}
    type="text"
    name="email"
    placeholder="Email"
  />
  <br />
  <input
    bind:value={password}
    type="password"
    name="password"
    placeholder="Password"
  />
  <br />
  <button on:click={handleSubmit}>Login</button>
