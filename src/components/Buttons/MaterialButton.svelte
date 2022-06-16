<script lang="ts">
  export let classes: Array<string> = []
  export let type: string
  export let style: string = ''
  classes.push(...['material-icons', 'round', 'image_button'])
</script>

<span on:click class={classes.join(' ')} {style}>{type}</span>
