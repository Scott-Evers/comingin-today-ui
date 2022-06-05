<script lang="ts">
  import type { Location } from '../../lib/fb_types'
  export let location : Location
</script>

{location.Data.name}


{#await location}
{:then loc}
  <div class="tr">
    <div>
      <input bind:value={location.Data.name} on:change={async e => {
          console.log(location)
          location = await location.save()
      }
        } placeholder="Location name" />
    </div>
    <div><button>-</button></div>
  </div>
{/await}