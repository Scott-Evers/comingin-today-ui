<script lang="ts">
  import { Router, Route, Link } from 'svelte-navigator'
  import * as Components from './components'
  import Pages from './pages'
  import * as security from './lib/security'
  import * as FBUtils from './lib/fb_util'
  import * as FBTypes from './lib/fb_types'
  import {
    setPersistence,
    browserLocalPersistence,
    signOut,
    connectAuthEmulator,
    User as UserType,
  } from 'firebase/auth'
  import { User, UserObj, CurrentUserOrgs } from './lib/stores'

  const auth = FBUtils.get_auth()
  connectAuthEmulator(auth, 'http://localhost:9099')
  //  const navigate = useNavigate()

  setPersistence(auth, browserLocalPersistence)
  auth.onAuthStateChanged((user) => {
    User.set(user)
  })

  const handle_message = (e) => {
    console.log(e)
  }
  const logout = () => {}

  // set global contexts on user change
  User.subscribe(async (u) => {
    if (u) {
      let orgs: FBTypes.Orgs = new FBTypes.Orgs()
      orgs = await orgs.get_by_member(u.uid)
      CurrentUserOrgs.set(orgs)

      UserObj.set(new FBTypes.User(u.uid))
    }
  })
</script>

<Router basepath="/" primary={false}>
  <main style="height: 100%;">
    <Components.Header
      user={$User}
      on:logout={() => {
        signOut(auth)
      }} />
    <div class="content">
      <Route path="login">
        <Pages.Login {auth} />
      </Route>

      <Route path="/">
        <Pages.Home />
      </Route>

      <Components.PrivateRoute path="/calendar">
        <Pages.Calendar />
      </Components.PrivateRoute>

      <Components.PrivateRoute path="/settings">
        <Pages.Settings />
      </Components.PrivateRoute>

      <Components.PrivateRoute path="/profile">
        <Pages.Profile />
      </Components.PrivateRoute>
    </div>
    <Components.Footer />
  </main>
</Router>

<style>
  main {
    height: 100%;
  }
  .content {
    min-height: 80%;
  }
</style>
