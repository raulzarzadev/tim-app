'use client'
import { Calendar, View, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import es from 'date-fns/locale/es'
import { useState } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './styles.css'
import { event } from 'cypress/types/jquery'
export type Event = {
  title: string
  start: Date
  end: Date
  allDay?: boolean
  resource?: any
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: es
})
const MyCalendar = ({
  onClickPeriod,
  events = [],
  event
}: {
  onClickPeriod?: (start: Date, end: Date) => void
  events?: Event[]
  event?: Event
}) => {
  const [date, setDate] = useState(new Date())
  const [view, setView] = useState<View>('month')

  return (
    <div className="w-full aspect-square">
      <Calendar
        events={events}
        localizer={localizer}
        onNavigate={setDate}
        onView={setView}
        date={date}
        view={view}
        selectable={true}
        onSelectSlot={(slotInfo) => {
          onClickPeriod?.(slotInfo.start, slotInfo.end)
        }}
        step={60}
        min={new Date(0, 0, 0, 9)}
        max={new Date(0, 0, 0, 19)}
      />{' '}
    </div>
  )
}

export default MyCalendar
