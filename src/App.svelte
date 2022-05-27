<script lang="ts">
	import { Router, Route, Link } from 'svelte-navigator'
	import Components from './components'
	import Pages from './pages'
  import * as security from './lib/security'
  import * as fb_helper from './lib/fb_helper'
  import { setPersistence, browserLocalPersistence, signOut } from 'firebase/auth'
  import { User } from './lib/stores'

  const auth = fb_helper.get_auth()

  setPersistence(auth, browserLocalPersistence)
  auth.onAuthStateChanged(user => {
    User.set(user)
  })
  // TODO race condition between loading user from state and rendering routes on reload.  How do we hold of on procesing the route until user has loaded?

</script>

<Router basepath="/" primary={false}>
  
  <main style="height: 100%;">
    {#if (security.validate_user($User))}
      <Components.Header auth={auth} />
    {/if}
    <div class="content">
      <Route path="login">
        <Pages.Login auth={auth} />
      </Route>
  
      <Route path="/">
        <Pages.Home />
      </Route>
  
      <Components.PrivateRoute path='/calendar' >
        <Pages.Calendar />
      </Components.PrivateRoute>
    </div>
    <Components.Footer />
  </main>
</Router>

<style>
  main {
    height: 100%
  }
  .content {
    min-height: 80%;
  }
</style>