<script lang="ts">
	import { Router, Route, Link } from 'svelte-navigator'
	import Components from './components'
	import Pages from './pages'
  import * as security from './lib/security'
  import * as fb_helper from './lib/fb_helper'
  import { setPersistence, browserLocalPersistence, signOut,
    connectAuthEmulator } from 'firebase/auth'
  import { User } from './lib/stores'

  const auth = fb_helper.get_auth()
  connectAuthEmulator(auth,'http://localhost:9099')
  //  const navigate = useNavigate()

  setPersistence(auth, browserLocalPersistence)
  auth.onAuthStateChanged(user => {
    User.set(user)
  })

  const handle_message = (e) => {
    console.log(e)
  }
  const logout = () => {
  }
</script>

<Router basepath="/" primary={false}>
  
  <main style="height: 100%;">
      <Components.Header user={$User} on:logout={() => {
        signOut(auth)
      }} />
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

      <Components.PrivateRoute path='/settings' >
        <Pages.Settings />
      </Components.PrivateRoute>

      <Components.PrivateRoute path='/profile' >
        <Pages.Profile />
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