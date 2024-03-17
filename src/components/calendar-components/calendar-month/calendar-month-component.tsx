import React from "react";
import styles from "./calendar-month.module.scss";
import moment from "moment";
import CalendarDayComponent from "../calendar-day/calendar-day-component";
import { CalendarEvent, Concert } from "../../../models";

interface Props {
  events: [];
  monthName: string;
}
/**
 * @param {*} props { events: [], monthName: string }
 * @returns
 */
const CalendarMonthComponent: React.FC<Props> = ({ events, monthName }) => {
  console.log("🚀 ~ events:", events);
  const eventsInMonth: Concert[] = [];
  // Map events into month buckets.
  events.map((event) => {
    const monthName = moment(event.date).format("MMMM");
    const sameMonthNames = monthName == monthName ? true : false;
    if (!sameMonthNames) return;

    eventsInMonth.push(event);

    // Sort events in moth bucket on date, ascending.
    eventsInMonth.sort(
      (a, b) => moment(a.date).valueOf() - moment(b.date).valueOf()
    );
  });

  // Checks if month has events, if not we dont draw month at all.
  const monthHasEvents = eventsInMonth.length > 0 ? true : false;
  if (!monthHasEvents) return null;
  return (
    <div className={`flex-column`}>
      <span className={styles.monthName}>{monthName}</span>
      <CalendarDayComponent
        eventsInMonth={eventsInMonth}
      ></CalendarDayComponent>
    </div>
  );
};

export default CalendarMonthComponent;
