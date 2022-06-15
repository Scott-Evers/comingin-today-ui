<script lang="ts">
  
      import * as Components from '.'
      import type { DayType } from '../lib/calendar'
      import WeekHeader from './WeekHeader.svelte'
      export let week: Array<DayType> = []
      console.log('week is ', week)
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
      grid-template-rows: .1fr 10fr;
    }
    .week {
      height: 100%;
      margin: 0;
    }
  </style>