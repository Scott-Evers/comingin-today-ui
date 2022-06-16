<script lang="ts">
  import * as Components from '.'
  import type { DayType } from '../lib/calendar'
  import WeekHeader from './WeekHeader.svelte'
  export let week: Array<DayType> = []
</script>

<div class="week week-7">
  <Components.WeekHeader />
  {#each week as day}
    <Components.DayCard day={day.DayInMonth.toString()} />
  {/each}
</div>

<style>
  .week-7 {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
  .week {
    min-height: 70vh;
    margin: 0;
  }
</style>
