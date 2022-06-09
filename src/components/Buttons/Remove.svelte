<script lang="ts">
  export let classes : Array<string> = []
  export let style : string = ''
  classes.push(...['material-symbols-outlined', 'add_button', 'round', 'image_button'])
</script>


<span class={classes.join(' ')} style={style}>delete</span>


<style>
  .add_button:hover {
    background-color: var(--danger-color);
  }
</style>
