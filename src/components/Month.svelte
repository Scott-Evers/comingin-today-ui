<script lang="ts">

    import DayOfMonthCard from '../components/DayOfMonthCard.svelte'
    import type { DayType } from '../lib/calendar'
    export let month: Array<DayType> = []
    console.log('month is ', month)
</script>

<div class="month month-7">
  <div class="month-header">Sunday</div>
  <div class="month-header">Monday</div>
  <div class="month-header">Tuesday</div>
  <div class="month-header">Wednesday</div>
  <div class="month-header">Thursday</div>
  <div class="month-header">Friday</div>
  <div class="month-header">Saturday</div>
  {#each Array(month[0].DayInWeek) as _}
    <DayOfMonthCard day="" />
  {/each}
  {#each month as day}
    <DayOfMonthCard day={day.DayInMonth.toString()} />
  {/each}
  {#each Array(42-month.length-month[0].DayInWeek) as _}
    <DayOfMonthCard day="" />
  {/each}
</div>

<style>
  .month-header {
    font-weight: bold;
    padding: 10px 3px;
  }
  .month-header::first-letter {
    font-size: 4rem;
  }
  .month-7 {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: .1fr repeat(5, 1fr);
  }
</style>