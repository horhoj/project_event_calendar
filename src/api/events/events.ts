import { delay } from '../../utils/delay';
import { getUUID } from '../../utils/getUUID';
import { EVENTS_API_DELAY, EVENTS_EVENT_LIST_LS_KEY } from '../../config/api';
import { EventItem, EventItemData, EventList } from './types';

const getCurrentEventList = () => {
  const currentEventListStr = localStorage.getItem(EVENTS_EVENT_LIST_LS_KEY);
  const currentEventList: EventList = currentEventListStr
    ? JSON.parse(currentEventListStr)
    : [];

  return currentEventList;
};

const setCurrentEventList = (eventList: EventList) => {
  localStorage.setItem(EVENTS_EVENT_LIST_LS_KEY, JSON.stringify(eventList));
};

export const fetchEventList = async (
  startUnixTime: number,
  endUnixTIme: number,
): Promise<EventList> => {
  await delay(EVENTS_API_DELAY);

  const currentEventList = getCurrentEventList();

  const filteredEventList = currentEventList.filter(
    (eventTime) =>
      startUnixTime <= eventTime.unixDate && eventTime.unixDate <= endUnixTIme,
  );

  const filteredAndFilteredEventList = [...filteredEventList].sort(
    (a, b) => a.unixDate - b.unixDate,
  );

  return Promise.resolve(filteredAndFilteredEventList);
};

export const addEvent = async (eventItemData: EventItemData): Promise<void> => {
  await delay(EVENTS_API_DELAY);
  const currentEventList = getCurrentEventList();
  const id = getUUID();

  const newEventItem: EventItem = {
    ...eventItemData,
    id,
  };

  currentEventList.push(newEventItem);

  setCurrentEventList(currentEventList);

  return Promise.resolve();
};

export const deleteEvent = async (id: string): Promise<void> => {
  await delay(EVENTS_API_DELAY);
  const currentEventList = getCurrentEventList();

  const newEventList = currentEventList.filter(
    (eventItem) => eventItem.id !== id,
  );

  setCurrentEventList(newEventList);

  return Promise.resolve();
};

export const fetchEventItem = async (id: string): Promise<EventItem> => {
  await delay(EVENTS_API_DELAY);
  const currentEventList = getCurrentEventList();

  const eventItem = currentEventList.find((item) => item.id === id);
  if (eventItem) {
    return Promise.resolve(eventItem);
  }

  return Promise.reject(`not find event with id=${id}`);
};

export const patchEventItem = async (
  id: string,
  eventItemData: EventItemData,
): Promise<EventItem> => {
  await delay(EVENTS_API_DELAY);

  // console.log('patchEventItem', id, eventItemData);
  const currentEventList = getCurrentEventList();
  const findIdx = currentEventList.findIndex((item) => item.id === id);
  if (findIdx > -1) {
    const eventItem: EventItem = { id, ...eventItemData };
    currentEventList[findIdx] = eventItem;
    setCurrentEventList(currentEventList);
    return Promise.resolve(eventItem);
  }
  return Promise.reject();
};
