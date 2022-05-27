<script lang="ts">
  export let day: string
  export let selected: boolean = false

  let styles: Array<string> = ['card']
  let styles_str: string = styles.join(' ')
  const active: boolean = day != ''

  const set_styles = () : void => {
    if (active) {
      if (selected) {
        if (!styles.includes('selected')) styles.push('selected')
      } else {
        styles = styles.filter(word => word != 'selected')
      }
    } else {
      if (!styles.includes('inactive')) styles.push('inactive')
    }
    styles_str = styles.join(' ')
  }

  const click_handler = (): void => {
    selected = !selected
    set_styles()
  }

  set_styles()

</script>


<div class={styles_str} on:click={click_handler}>
  <div class="day_number">
    {day}
  </div>
  <div class="attendees">
  </div>
</div>

<style>
  .card {
    aspect-ratio: 1 / 1;
    font-size: 1.5rem;
    padding: .5rem; 
    border-width: .25px;
    border-style: solid;
    border-color: #ccc;
  }
  .inactive {
    background-color: rgba(8,8,8,.2);
  }
  .selected {
    border-color: #44f;
    border-width: 2px;
  }
</style>