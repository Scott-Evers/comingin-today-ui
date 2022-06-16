<script lang="ts">
  import * as FBTypes from '../../lib/fb_types'
  import SearchResult from './SearchResult.svelte'
  import * as Search from './'

  export let type: any

  let query: string = ''
  let results = []
  let obj_search: Function = type.search

  const search = async () => {
    console.log({ query })
    results = obj_search(query)
  }
</script>

<input placeholder="search" bind:value={query} on:input={search} />
{#await results then rs}
  <SearchResult items={rs} item_control={Search.ResultUser} />
{/await}
