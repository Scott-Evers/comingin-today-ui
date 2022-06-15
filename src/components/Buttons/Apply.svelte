<script lang="ts">
  export let classes: Array<string> = []
  export let style: string = ''
  classes.push(...['material-icons', 'button_apply', 'round', 'image_button'])
</script>

<span on:click class={classes.join(' ')} {style}>done</span>
