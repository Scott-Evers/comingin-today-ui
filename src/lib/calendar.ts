import { DateFocus } from './stores'

export type DayType = {
  DayInMonth: number,
  DayInWeek: number,
}
export enum CalType {
  Month,
  Week,
  Day,
}


export const update_date = (n: number, ctype: CalType): void => {
  DateFocus.update(d => {

    switch (ctype) {
      case CalType.Month:
        return new Date(d.setMonth(d.getMonth() + n))
        break
      case CalType.Week:
        return new Date(d.setDate(d.getDate() + 7*n))
        break
      case CalType.Day:
        return new Date(d.setDate(d.getDate() + n))
        break
    }
    return d
  })
}

export const get_days_in_month = (when: Date) : Array<DayType> => {
  console.log('getting days in month for ', when.toISOString())
  let r: Array<DayType> = []
  let month = when.getMonth()
  let year = when.getFullYear()
  let i : number = 1
  let d = new Date(year, month, i)
  while (d.getMonth() == month) {
    r.push({
      DayInMonth: i,
      DayInWeek: d.getDay()
    })
    i++
    d = new Date(year, month, i)
  }
  return r
}

export const get_days_in_week = (when: Date) : Array<DayType> => {
  console.log('getting days in week for ', when.toISOString())
  let start = new Date(when.setDate(when.getDate() - when.getDay()))
  let r: Array<DayType> = []
  for (let i = 0; i < 7; i++) {
    let d : Date = new Date(start.setDate(when.getDate() + i))
    r.push({
      DayInMonth: d.getDate(),
      DayInWeek: d.getDay()
    })
  }
  return r
}
