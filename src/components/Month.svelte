<script lang="ts">
    import * as Components from '.'
    import type { DayType } from '../lib/calendar'
    import { CalendarModes } from '../lib/enums'

    export let month: Array<DayType> = []
</script>

<div class="month month-7">
    <Components.WeekHeader />
    {#each Array(month[0].DayInWeek) as _}
        <Components.DayCard mode={CalendarModes.Month} day="" />
    {/each}
    {#each month as day}
        <Components.DayCard mode={CalendarModes.Month} on:toggle day={day.DayInMonth.toString()} />
    {/each}
    {#each Array((month[0].DayInWeek + month[month.length - 1].DayInMonth <= 35 ? 35 : 42) - month.length - month[0].DayInWeek) as _}
        <Components.DayCard mode={CalendarModes.Month} day="" />
    {/each}
</div>

<style>
    .month-7 {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: 0.1fr repeat(5, 1fr);
    }
</style>
