<script lang="ts">
  export let classes : Array<string> = []
  export let style : string = ''
  classes.push(...['material-icons', 'add_button', 'round', 'image_button'])
</script>


<span class={classes.join(' ')} style={style}>add</span>


<style>
  .add_button:hover {
    background-color: var(--accent-color-2);
  }
</style>
