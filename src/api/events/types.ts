export interface EventItemData {
  unixDate: number;
  title: string;
  description: string;
}

export interface EventItem extends EventItemData {
  id: string;
}

export type EventList = EventItem[];
