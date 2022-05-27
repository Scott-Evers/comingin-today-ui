<script lang="ts">
  import Components from '../components'
  import { DateFocus } from '../lib/stores';  
  import * as stores from '../lib/stores'
  import * as cal_lib from '../lib/calendar'

  let month: Array<cal_lib.DayType> = cal_lib.get_days_in_month($DateFocus)
  let week: Array<cal_lib.DayType> = cal_lib.get_days_in_week($DateFocus)
  console.log('month in calendar:', month)

  let view: cal_lib.CalType = cal_lib.CalType.Month
  const update_date = (delta: number) => {
    console.log(delta,view)
    cal_lib.update_date(delta, view)
    month = cal_lib.get_days_in_month($DateFocus)
    week = cal_lib.get_days_in_week($DateFocus)
  }
  const change_view = (v: cal_lib.CalType) => {
    view = v
    console.log(view)
  }

</script>



<div class="cal_container">

  <button on:click={() => update_date(-1)}>prev</button>
  <button on:click={() => update_date(1)}>next</button>
  <button on:click={() => change_view(cal_lib.CalType.Month)}>month</button>
  <button on:click={() => change_view(cal_lib.CalType.Week)}>week</button>
  
  {#if (view == cal_lib.CalType.Month)}
  <Components.Month bind:month={month} />
  {/if}
  
  {#if (view == cal_lib.CalType.Week)}
  <Components.Week bind:week={week} />
  {/if}
  
</div>

<style>
  .cal_container {
    height: 100%;
  }
</style>