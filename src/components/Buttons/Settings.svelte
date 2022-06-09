<script lang="ts">
  export let classes : Array<string> = []
  export let style : string = ''
  classes.push(...['material-icons', 'add_button', 'round', 'image_button'])
</script>


<span class={classes.join(' ')} style={style}>settings</span>


<style>
  .add_button {
    background-color: var(--accent-color-0);
  }
</style>
