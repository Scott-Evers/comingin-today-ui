<script lang="ts">
  import { useNavigate, useLocation, Link } from "svelte-navigator";
  import { getContext } from "svelte";
  import * as security from '../lib/security'
  import { User } from '../lib/stores'

  const navigate = useNavigate();
  const location = useLocation();
  
  let user_valid = false
  $:{ //todo this line updates on changes to variables on this line...watch $User
    console.log('guard:user',$User)
    user_valid = security.validate_user($User)
    console.log('guard:user_valid',user_valid)
    // if (!user_valid) {
      // }
    }
  const send_to_login = () => {
    navigate("/login", {
      state: { from: $location.pathname },
      replace: true,
    })
    }
  
  </script>

{#if user_valid}
  <slot />
{:else}
  <div on:click={send_to_login}>Login in</div>
{/if}
<!-- todo else block for timer / button to go to login-->
