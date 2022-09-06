import { FC } from 'react';
import classNames from 'classnames';
import { endOfDay, startOfDay, startOfToday } from 'date-fns';
import { EventList } from '../../../../../api/events/types';
import styles from './MonthGridCard.module.scss';

interface MonthGridCardProps {
  unixDate: number;
  selectedDate: number;
  eventList: EventList | null;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export const MonthGridCard: FC<MonthGridCardProps> = ({
  unixDate,
  selectedDate,
  eventList,
  onDelete,
  onEdit,
}) => {
  const date = new Date(unixDate);
  const dateOfMonth = date.getDate();
  const dayOfWeek = date.toLocaleString('default', { weekday: 'short' });
  const isNotDateOfMonth =
    date.getMonth() !== new Date(selectedDate).getMonth();

  const startTime = startOfDay(unixDate).getTime();
  const endTime = endOfDay(unixDate).getTime();

  const filteredEventList = eventList
    ? eventList.filter(
        (eventItem) =>
          startTime <= eventItem.unixDate && eventItem.unixDate <= endTime,
      )
    : [];

  const isToday = unixDate === startOfToday().getTime();

  return (
    <div
      className={classNames(
        styles.monthCard,
        isNotDateOfMonth && styles.monthCardNotDateOfMonth,
        isToday && styles.monthCardIsToday,
      )}
    >
      <div className={styles.monthCardTitle}>
        <div>{dateOfMonth}</div>
        <div>{dayOfWeek}</div>
      </div>
      <ul className={styles.monthCardEventList}>
        {filteredEventList.map((eventItem) => (
          <li key={eventItem.id} className={styles.monthCardEventListItem}>
            <div>
              {new Date(eventItem.unixDate).toLocaleTimeString().slice(0, 5)}:{' '}
            </div>
            <div className={styles.monthCardEventListItemTitle}>
              {eventItem.title}
            </div>
            <button
              className={styles.monthCardEventListItemDeleteButton}
              onClick={() => onDelete(eventItem.id)}
            >
              X
            </button>
            <button
              className={styles.monthCardEventListItemEditButton}
              onClick={() => onEdit(eventItem.id)}
            >
              E
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
