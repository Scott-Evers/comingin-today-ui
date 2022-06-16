<script lang="ts">
  import type { User } from '../../lib/fb_types'

  export let item: User
</script>

<div class="user_item">
  {item.DisplayName}
</div>

<style>
  .user_item {
    color: red;
  }
</style>
