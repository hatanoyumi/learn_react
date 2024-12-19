import { isBefore, parseISO, startOfToday } from 'date-fns';
import { isNil, isString } from 'lodash';

export const calculateDday = (targetDate?: Date | string | null) => {
  if (isNil(targetDate)) return null;
  const today = new Date();
  const dDay = new Date(targetDate);
  today.setHours(0, 0, 0, 0);
  dDay.setHours(0, 0, 0, 0);
  const timeDiff = dDay.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

export const getDurationInMin = (targetDate?: Date | string | null, standard = new Date()) => {
  if (isNil(targetDate)) return null;
  const target = new Date(targetDate);
  target.setSeconds(0, 0);
  standard.setSeconds(0, 0);
  const timeDiff = target.getTime() - standard.getTime();

  return Math.ceil(timeDiff / (1000 * 60));
};

export const magicDateForExpiry = () => {
  return new Date(2999, 11, 31);
};

export const isBeforeToday = (date: Date | string): boolean => {
  if (isString(date)) {
    return isBefore(parseISO(date), startOfToday());
  }

  return isBefore(date, startOfToday());
};
