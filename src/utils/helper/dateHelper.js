import { format } from 'date-fns'

const currentDate = new Date()
const MONTH_IN_MILISEC = 2678400000
const dateMonthBehind = new Date(currentDate.getTime() - MONTH_IN_MILISEC)
const DATE_FORMAT = 'yyyy-MM-dd'
const optionsDate = {
  year: '2-digit',
  month: 'short',
  day: 'numeric',
}
const optionsTime = {
  timeStyle: 'short',
}

function timeZoneSwitcher(zone) {
  switch (zone) {
    case 'WIB':
      return '+07:00'
    case 'WITA':
      return '+08:00'
    case 'WIT':
      return '+09:00'
    default:
      return '+07:00'
  }
}

const postDateTime = (date, time) => {
  const timeZone = timeZoneSwitcher(time.timezone ? time.timezone : '')
  return format(date, DATE_FORMAT) + 'T' + format(time.val, 'HH:00') + ':00' + timeZone
}

export default {
  timeZoneSwitcher,
  postDateTime,
}

export { currentDate, MONTH_IN_MILISEC, dateMonthBehind, DATE_FORMAT, optionsDate, optionsTime }
