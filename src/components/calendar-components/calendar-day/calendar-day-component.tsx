import React, { ReactElement } from "react";
import styles from "./calendar-day.module.scss";
import moment from "moment";
import CalendarEventComponent from "../calendar-event/calendar-event-component";
import { CalendarEvent } from "../../../models";
/**
 * @param eventList list of events.
 * @returns Bucket named by day and date and holds array of events on that day.
 *
 * example. { Friday 01: [ {…}, {…} ] }
 */
const eventsIntoDayBuckets = (eventList: CalendarEvent[]) => {
  const dayBucket: { [key: string]: CalendarEvent[] } = {};
  eventList.map((event) => {
    const dayName = `${moment(event.date).format("dddd")} ${moment(
      event.date
    ).format("DD")}`;
    dayBucket[dayName] = dayBucket[dayName] || [];
    return dayBucket[dayName].push(event);
  });
  return dayBucket;
};

interface Props {
  eventsInMonth: CalendarEvent[];
}

const CalendarDayComponent: React.FC<Props> = ({ eventsInMonth }) => {
  const dayBucket = eventsIntoDayBuckets(eventsInMonth);
  const daysInMonth: ReactElement[] = [];

  Object.entries(dayBucket).map((dayBucket) => {
    const events = dayBucket[1];
    const day = dayBucket[0].split(" ");
    const dayName = day[0];
    const dayNumber = day[1];
    const eventIsToday = String(day[2]) == "true";

    return daysInMonth.push(
      <div key={dayNumber} className={`${styles.wrapper} `}>
        <div className="flex-column">
          <span className={` ${styles.dateNumber}`}>{dayNumber}</span>
          <span className={styles.dateName}>{dayName}</span>
        </div>
        <div className="events">
          <ul>
            {events.map((event) => {
              return (
                <CalendarEventComponent
                  eventIsToday={eventIsToday}
                  key={event.id}
                  event={event}
                ></CalendarEventComponent>
              );
            })}
          </ul>
        </div>
      </div>
    );
  });
  return <div>{daysInMonth}</div>;
};

export default CalendarDayComponent;
