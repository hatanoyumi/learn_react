import { isEmpty, isNil } from 'lodash';

export const convertYYYYMMDDToObj = (date?: string | null) => {
  if (!date) return null;
  // date = yyyymmdd
  const year = Number(date.slice(0, 4));
  const month = Number(date.slice(4, 6));
  const day = Number(date.slice(6));

  return {
    year,
    month,
    day,
  };
};

export const createDate = (date?: { year: number; month: number; day: number } | null) => {
  if (!date) return null;
  const { year, month, day } = date;
  return new Date(year, month - 1, day);
};

export const convertDateToYYYYMMDD = (date?: Date | null) => {
  if (!date) return null;

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const monthString = month < 10 ? `0${month}` : `${month}`;
  const dayString = day < 10 ? `0${day}` : `${day}`;

  return `${year}${monthString}${dayString}`;
};

export const convertSafeNumber = (numString?: string) => {
  if (!numString) return null;

  const num = Number.parseInt(numString);

  return Number.isNaN(num) ? null : num;
};

export const returnIfNilOrEmpty = <T>(data: T) => {
  // 타입 때문에 별도 지정 필요
  if (data === null || isNil(data) || isEmpty(data)) {
    return null;
  }

  return data;
};
