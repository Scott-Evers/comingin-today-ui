<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { CalendarModes } from '../lib/enums'
    export let day: string
    export let attendances = null
    export let selected: boolean = false
    export let mode: CalendarModes = CalendarModes.Week

    const dispatch = createEventDispatcher()

    let styles: Array<string> = ['', '', '', 'common']
    let styles_str: string = styles.join(' ')
    const active: boolean = day != ''

    const set_styles = (): void => {
        switch (mode) {
            case CalendarModes.Day:
                styles[0] = 'cal_mode_day'
                break
            case CalendarModes.Month:
                styles[0] = 'cal_mode_month'
                break
            default:
                styles[0] = 'cal_mode_week'
                break
        }
        styles[1] = selected ? 'selected' : ''
        styles[2] = active ? '' : 'inactive'

        styles_str = styles.join(' ')
    }

    const click_handler = (): void => {
        selected = !selected
        dispatch('toggle', { day, selected })
        set_styles()
    }

    set_styles()
</script>

<div class={styles_str} on:click={click_handler}>
    <div>
        {day}
    </div>
    <div>
        <!-- content -->
    </div>
</div>

<style>
    .common {
        padding: 0.5rem;
        border-width: 0.25px;
        border-style: solid;
        border-color: var(--muted-color-2);
    }
    .cal_mode_month > div:first-child {
        font-size: 2em;
        font-weight: 100;
    }
    .cal_mode_week > div:first-child {
        font-size: 3em;
        font-weight: 100;
    }
    .cal_mode_day > div:first-child {
        font-size: 2em;
        font-weight: 100;
    }
    .inactive {
        background-color: var(--muted-color-2);
    }
    .selected {
        border-color: var(--accent-color-1);
        border-width: 2px;
    }
</style>
