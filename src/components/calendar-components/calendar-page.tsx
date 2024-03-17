import React, { ReactElement, useEffect, useState } from "react";
import moment from "moment";
import styles from "./calendar.module.scss";
// import CalendarMonthComponent from '../../components/calendar-month-component';
import CalendarMonthComponent from "./calendar-month/calendar-month-component";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useBooleanToggle } from "../../hooks";
import { CalendarEvent, Concert, EventsByMonth } from "../../models";

const CalendarComponent: React.FC = () => {
  const [eventsBeforeToday, setEventsBeforeToday] = useState<CalendarEvent[]>(
    []
  );
  const [eventsTodayOrAfter, setEventsTodayOrAfter] = useState<CalendarEvent[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [showHistory, toggleHistory] = useBooleanToggle(false);
  const today = moment(new Date());

  useEffect(() => {
    axios.get("https://concert-scraper.vercel.app/api").then((response) => {
      const calendarEvents = addIsBeforeBooleanToEvent(response.data);
      splitOldAndNewEvents(calendarEvents ? calendarEvents : []);
      setIsLoading(false);
    });
  }, []);

  const addIsBeforeBooleanToEvent = (events: Concert[]) => {
    if (events) {
      const eventsWithBeforeBoolean = events.map((e) => {
        const newEvent = {
          ...e,
          id: uuidv4(),
          isBeforeToday: !today.isSameOrBefore(e.date, "day"),
        };
        return newEvent;
      });
      return eventsWithBeforeBoolean;
    }
  };

  /**
   * Split elements by before today, today and beyond.
   * @param {*} events
   */
  const splitOldAndNewEvents = (events: CalendarEvent[]) => {
    const eventsBefore: CalendarEvent[] = [];
    const eventsAfter: CalendarEvent[] = [];
    events.forEach((e) => {
      if (e.isBeforeToday) {
        eventsBefore.push(e);
      } else if (!e.isBeforeToday) {
        eventsAfter.push(e);
      }
    });

    setEventsBeforeToday(eventsBefore);
    setEventsTodayOrAfter(eventsAfter);
  };

  const eventsIntoYearBuckets = (events: CalendarEvent[]) => {
    if (events) {
      const yearBucketList: Record<string, CalendarEvent[]> = events.reduce(
        (acc, item) => {
          const year = moment(item.date).format("YYYY");

          // Use a mapped type for the accumulator to ensure correct indexing
          acc = {
            ...acc,
            [year]: [...(acc[year] || []), item],
          };

          return acc;
        },
        {} as Record<string, CalendarEvent[]>
      );
      return yearBucketList;
    }
  };

  const listElementsByYear = () => {
    const eventsInYearBuckets = eventsIntoYearBuckets(eventsTodayOrAfter);
    const litsElementsByYear = [];
    for (const [year, eventList] of Object.entries(eventsInYearBuckets)) {
      const a = organizeEventsByMonth(eventList);
      console.log("🚀 ~ listElementsByYear ~ a:", a);
      litsElementsByYear.push(
        <li key={year}>
          {today.format("YYYY") !== year ? (
            <div className={styles.year}>{year}</div>
          ) : null}
          <ul className={styles.calendarList}>
            {listElementsByMonth(a)}
            {/* {showHistory ? eventsIntoMonthBuckets(eventsBeforeToday) : null} */}
            {/* {eventsIntoMonthBuckets(eventList)} */}
          </ul>
        </li>
      );
    }
    return litsElementsByYear;
  };

  const organizeEventsByMonth = (events: CalendarEvent[]): EventsByMonth => {
    const eventsByMonth: EventsByMonth = {};

    if (events) {
      // Iterate over each event and organize by month
      for (const event of events) {
        const monthKey = moment(event.date).format("MMMM"); // Using "YYYY-MM" as the key format

        // If the key doesn't exist in the dictionary, create an empty array
        eventsByMonth[monthKey] = eventsByMonth[monthKey] || [];

        // Push the current event into the array for the corresponding month
        eventsByMonth[monthKey].push(event);
      }

      // Sort events within each month
      for (const monthKey in eventsByMonth) {
        eventsByMonth[monthKey].sort((a, b) => {
          // You can customize the sorting logic based on your requirements
          return moment(a.date).valueOf() - moment(b.date).valueOf();
        });
      }
    }

    return eventsByMonth;
  };

  const listElementsByMonth = (eventsByMonth: EventsByMonth) => {
    return (
      <>
        <li key={month}>
          <CalendarMonthComponent
            monthName={month.toString()}
            events={eventsByMonth}
          ></CalendarMonthComponent>
        </li>
        ;
      </>
    );
  };
  // const eventsIntoMonthBuckets = (events: CalendarEvent[]) => {
  //   const monthList = moment.months();
  //   const eventsByMonth: ReactElement[] = [];
  //   const eventsListIsEmpty = events.length == 0;
  //   if (eventsListIsEmpty) return nothingToDoElement;
  //   return monthList.map((month) => {
  //     events.map((event) => {
  //       const monthOfEvent = moment(event.date).format("MMMM");
  //       if (month === monthOfEvent) {
  //         eventsByMonth.push(event);
  //       }
  //     });
  //     return (
  //       <li key={month}>
  //         <CalendarMonthComponent
  //           monthName={month.toString()}
  //           events={eventsByMonth}
  //         ></CalendarMonthComponent>
  //       </li>
  //     );
  //   });
  // };

  const calendarElement = () => {
    if (isLoading) return <h1>Loading</h1>;
    return (
      <div className={styles.calendarWrapper}>
        <button onClick={() => toggleHistory}>
          {showHistory ? "Hide history" : "Show history"}
        </button>
        <div>
          <ul className={styles.calendarList}>{listElementsByYear()}</ul>
        </div>
      </div>
    );
  };

  const nothingToDoElement = (
    <div>
      <span>NOTHING</span>
      <span> TO DO </span>
    </div>
  );

  return <div className={styles.calendarWrapper}>{calendarElement()}</div>;
};
export default CalendarComponent;
