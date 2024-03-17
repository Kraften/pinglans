import { CalendarEvent } from ".";

export interface EventsByMonth {
  [month: string]: CalendarEvent[];
}
