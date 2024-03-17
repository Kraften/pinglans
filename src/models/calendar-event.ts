import { Concert } from ".";

export interface CalendarEvent extends Concert {
  id: string;
  isBeforeToday: boolean;
}
