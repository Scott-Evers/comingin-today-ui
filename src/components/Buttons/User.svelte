<script lang="ts">
  export let classes : Array<string> = []
  export let style : string = ''
  classes.push(...['material-symbols-outlined', 'user_button', 'round', 'image_button'])
</script>


<span on:click class={classes.join(' ')} style={style}>person</span>


<style>
  .user_button:hover {
    background-color: var(--accent-color-0);
  }
</style>
