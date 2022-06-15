<script lang="ts">
  export let full_week : boolean = true
</script>

{#if full_week}<div class="day-header">Sunday</div>{/if}
<div class="day-header">Monday</div>
<div class="day-header">Tuesday</div>
<div class="day-header">Wednesday</div>
<div class="day-header">Thursday</div>
<div class="day-header">Friday</div>
{#if full_week}<div class="day-header">Saturday</div>{/if}

<style>
  .day-header {
    font-weight: 100;
    padding: 10px 3px;
  }
  .day-header::first-letter {
    font-size: 4em;
  }
</style>