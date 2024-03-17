import React from "react";
import styles from "./calendar-event.module.scss";
import moment from "moment";
import { CalendarEvent } from "../../../models";

interface Props {
  event: CalendarEvent;
  eventIsToday: boolean;
}
// Destructed prop { event } is an object containing information that this component renders.
const CalendarEventComponent: React.FC<Props> = ({ event }) => {
  const eventDateTime = moment(event.date);

  return (
    <li
      className={
        styles.event
        // (
        // event.isBeforeToday
        //   ? "eventIsOld"
        //   : "null" && eventIsToday
        //   ? "event flex-column eventIsToday"
        //   : "event flex-column")
      }
      key={event.id}
    >
      <div className="flex-column">
        <span className={styles.eventName}>{event.artist}</span>
      </div>
      <span className={styles.eventTime}>{eventDateTime.format("HH:mm")}</span>
      <div className="flex-column">
        <span>{event.country}</span>
        <span>{event.city}</span>
        <span> {event.venue}</span>
      </div>
    </li>
  );
};

export default CalendarEventComponent;
