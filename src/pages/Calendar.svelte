<script lang="ts">
  import * as Components from '../components'
  import * as Buttons from '../components/Buttons'
  import { DateFocus } from '../lib/stores'
  import * as stores from '../lib/stores'
  import * as cal_lib from '../lib/calendar'
  import LocationList from '../components/LocationList.svelte'
  import Next from '../components/Buttons/Next.svelte'

  const get_days = (view_type: cal_lib.CalType): Array<cal_lib.DayType> => {
    return view_type == cal_lib.CalType.Month
      ? cal_lib.get_days_in_month($DateFocus)
      : cal_lib.get_days_in_week($DateFocus)
  }

  let view: cal_lib.CalType = cal_lib.CalType.Month
  let days: Array<cal_lib.DayType> = get_days(view)
  let days_selected: Array<cal_lib.DayType> = []
  let adding: boolean = false

  const update_date = (delta: number) => {
    //console.log(delta,view)
    cal_lib.update_date(delta, view)
    days = get_days(view)
  }
  const change_view = (v: cal_lib.CalType) => {
    view = v
    days = get_days(view)
  }
  const handle_day_toggled = async (e) => {
    //console.log(e.detail)
    let d = await days.filter((d) => e.detail.day == d.DayInMonth.toString())[0]
    d.Selected = !d.Selected
    days_selected = days.filter((d) => d.Selected)
  }
  const add_attendences = (e): void => {
    adding = false
    console.log({ e })
  }
</script>

<div class="cal_container">
  <Buttons.Prev on:click={() => update_date(-1)} />
  <Buttons.Next on:click={() => update_date(1)} />
  <button on:click={() => change_view(cal_lib.CalType.Month)}>month</button>
  <button on:click={() => change_view(cal_lib.CalType.Week)}>week</button>

  {#if view == cal_lib.CalType.Month}
    <Components.Month on:toggle={handle_day_toggled} bind:month={days} />
  {/if}

  {#if view == cal_lib.CalType.Week}
    <Components.Week bind:week={days} />
  {/if}
</div>
{#if days_selected.length > 0}
  <Buttons.Add
    on:click={() => {
      adding = !adding
    }}
    style="font-size: 2em; position: fixed; bottom: 50px; right: 50px;" />
{/if}
{#if adding}
  <Components.LocationList on:selected={add_attendences} on:cancel={() => (adding = false)} />
{/if}

<style>
  .cal_container {
    height: 100%;
  }
</style>
