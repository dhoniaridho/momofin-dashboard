import { DateTime } from 'luxon'

export function fromIsoToLocale(value: string) {
  return DateTime.fromJSDate(new Date(value)).toLocaleString(
    DateTime.DATETIME_MED_WITH_WEEKDAY,
    {
      locale: 'id',
    }
  )
}
