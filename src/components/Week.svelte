<script lang="ts">
  
      import DayOfWeekCard from '../components/DayOfWeekCard.svelte'
      import type { DayType } from '../lib/calendar'
      export let week: Array<DayType> = []
      console.log('week is ', week)
  </script>
  
  <div class="week week-7">
    <div class="week-header">Sunday</div>
    <div class="week-header">Monday</div>
    <div class="week-header">Tuesday</div>
    <div class="week-header">Wednesday</div>
    <div class="week-header">Thursday</div>
    <div class="week-header">Friday</div>
    <div class="week-header">Saturday</div>
    {#each week as day}
      <DayOfWeekCard day={day.DayInMonth.toString()} />
    {/each}
  </div>
  
  <style>
    .week-header {
      font-weight: bold;
      padding: 10px 3px;
    }
    .week-header::first-letter {
      font-size: 4rem;
    }
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