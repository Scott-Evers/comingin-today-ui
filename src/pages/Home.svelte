<script lang="ts">
  /// Playground
  import { Search } from '../components/Search/'
  import { Users } from '../lib/fb_types'
  /// /Playground
</script>

<div class="hero">Welcome</div>
<div>
  <h1>Playground</h1>
  <div>
    <Search type={Users} />
  </div>
  <h1>/Playground</h1>
</div>

<style>
  .hero {
    vertical-align: middle;
    text-align: center;
    height: 100%;
  }
</style>
