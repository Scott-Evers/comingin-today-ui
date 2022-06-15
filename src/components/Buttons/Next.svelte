<script lang="ts">
  export let classes : Array<string> = []
  export let style : string = ''
  classes.push(...['material-icons', 'next_button', 'round', 'image_button'])
</script>


<span on:click class={classes.join(' ')} style={style}>navigate_next</span>


<style>
  .next_button {
    color: var(--muted-color-0);
    background-color: white;
  }
  .next_button:hover {
    background-color: var(--muted-color-2);
  }
</style>
