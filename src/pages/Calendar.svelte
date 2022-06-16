<script lang="ts">
  import * as Components from '../components'
  import Button, { ButtonTypes } from '../components/Buttons'
  import { DateFocus } from '../lib/stores'
  import { User, UserObj } from '../lib/stores'
  import * as cal_lib from '../lib/calendar'
  import * as FBTypes from '../lib/fb_types'

  const get_days = (view_type: cal_lib.CalType): Array<cal_lib.DayType> => {
    return view_type == cal_lib.CalType.Month
      ? cal_lib.get_days_in_month($DateFocus)
      : cal_lib.get_days_in_week($DateFocus)
  }

  let view: cal_lib.CalType = cal_lib.CalType.Month
  let days: Array<cal_lib.DayType> = get_days(view)
  let days_selected: Array<cal_lib.DayType> = []
  let adding: boolean = false

  FBTypes.Attendances.load_for_timeframe($UserObj, null, new Date(), new Date())

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
  const add_attendences = async (e): Promise<void> => {
    adding = false
    await days_selected.forEach(async (day) => {
      let att = new FBTypes.Attendance()
      att.Location = e.detail
      att.User = new FBTypes.User($User.uid)
      att.Date = day.Date
      att.save()
    })
  }
</script>

<div class="cal_container">
  <Button type={ButtonTypes.Prev} on:click={() => update_date(-1)} />
  <Button type={ButtonTypes.Next} on:click={() => update_date(1)} />
  <Button type={ButtonTypes.Month} on:click={() => change_view(cal_lib.CalType.Month)} />
  <Button type={ButtonTypes.Week} on:click={() => change_view(cal_lib.CalType.Week)} />

  {#if view == cal_lib.CalType.Month}
    <Components.Month on:toggle={handle_day_toggled} bind:month={days} />
  {/if}

  {#if view == cal_lib.CalType.Week}
    <Components.Week bind:week={days} />
  {/if}
</div>
{#if days_selected.length > 0}
  <Button
    type={ButtonTypes.Add}
    on:click={() => (adding = true)}
    style="font-size: 2em; position: fixed; bottom: 50px; right: 50px;" />
{/if}
{#if adding}
  hello
  <Components.LocationList on:selected={add_attendences} on:cancel={() => (adding = false)} />
{/if}

<style>
  .cal_container {
    height: 100%;
  }
</style>
