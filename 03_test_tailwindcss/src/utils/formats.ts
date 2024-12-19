import { format, isValid, parseISO } from 'date-fns';
import { first, isNil, last } from 'lodash';

export const transformCtzNo = (value: string) => {
  const hyphen = '-';
  if (isNil(value)) return '';
  if (value.length > 6) return value.slice(0, 6) + hyphen + value.slice(6);
  return value;
};

export const convertTelForAPI = (tel: string) => tel?.replace(/-/g, '');

export const transformPhoneNumberOnChange = (prev: string | undefined, curr: string) => {
  const hyphen = '-';

  // 한번에 입력된 경우
  if (((prev?.length ?? 0) < 10 || prev?.length === 13) && curr.length === 11) {
    return curr.slice(0, 3) + hyphen + curr.slice(3, 7) + hyphen + curr.slice(7, 11);
  }

  if (prev && prev.length > curr.length) {
    return curr;
  }

  if (prev?.length === 3 && curr.length === 4 && last(curr) !== hyphen) {
    return curr.slice(0, 3) + hyphen + curr.slice(3);
  }

  if (prev?.length === 8 && curr.length === 9 && last(curr) !== hyphen) {
    return curr.slice(0, 8) + hyphen + curr.slice(8);
  }

  if (curr.length >= 13) {
    return curr.slice(0, 13);
  }

  return curr;
};

export const transformBirthday = (value?: string) => {
  const dot = '.';
  if (isNil(value)) return '';
  if (value.length > 6) return value.slice(0, 4) + dot + value.slice(4, 6) + dot + value.slice(6);
  if (value.length > 4) return value.slice(0, 4) + dot + value.slice(4);
  return value;
};

export const transformTel = (value?: string) => {
  const hyphen = '-';
  if (isNil(value)) return '';
  if (first(value) === '+') return value;
  const val = value.slice(0, 11);
  if (val.length > 7) return val.slice(0, 3) + hyphen + val.slice(3, 7) + hyphen + val.slice(7);
  if (val.length > 3) return val.slice(0, 3) + hyphen + val.slice(3);
  return val;
};

export const convertBirthdayForAPI = (birthday: string) => birthday.replace(/\./g, '');

export const transformBirthdayOnChange = (prev: string | undefined, curr: string) => {
  const dot = '.';

  // 한번에 입력된 경우
  if (((prev?.length ?? 0) < 7 || prev?.length === 10) && curr.length === 8) {
    return curr.slice(0, 4) + dot + curr.slice(4, 6) + dot + curr.slice(6, 8);
  }

  if (prev && prev.length > curr.length) {
    return curr;
  }

  if (prev?.length === 4 && curr.length === 5 && last(curr) !== dot) {
    return curr.slice(0, 4) + dot + curr.slice(4);
  }

  if (prev?.length === 7 && curr.length === 8 && last(curr) !== dot) {
    return curr.slice(0, 7) + dot + curr.slice(7);
  }

  if (curr.length >= 10) {
    return curr.slice(0, 10);
  }

  return curr;
};

type DateFormatType = 'hasYear' | 'hasFullYear' | 'hasTime';

/**
 *
 * @param {string | Date} date - YYYYMMDD | ISO8601 string | Date
 * @param {DateFormatType} type - 날짜 포멧 타입
 * @returns {string}
 */
export const changeDateFormat = (date?: string | Date | null, type?: DateFormatType): string => {
  if (!date) return '';
  if (typeof date === 'string') {
    // YYYY.MM.DD 일 경우 대비
    // ISO8601 포멧일 경우, 길이가 10이 넘고, 마지막쯤에 . 이 있기 때문에 replace 하면 안 됨
    const parsedDate = parseISO(date.length > 10 ? date : date.replace('.', ''));

    if (!isValid(parsedDate)) return '';

    if (type === 'hasYear') return format(parsedDate, 'yy.MM.dd');
    if (type === 'hasFullYear') return format(parsedDate, 'yyyy.MM.dd');
    if (type === 'hasTime') return format(parsedDate, 'yy.MM.dd a hh:mm');

    return format(parsedDate, 'MM.dd');
  }

  if (type === 'hasYear') return format(date, 'yy.MM.dd');
  if (type === 'hasFullYear') return format(date, 'yyyy.MM.dd');
  if (type === 'hasTime') return format(date, 'yy.MM.dd A hh:mm');

  return format(date, 'MM.dd');
};

export const changeTelFormat = (tel?: string | null) => {
  if (!tel) return '';
  const hyphen = '-';

  return tel.slice(0, 3) + hyphen + tel.slice(3, 7) + hyphen + tel.slice(7);
};

export const formatPhoneNumber = (numberString?: string): string => {
  if (!numberString) return '';
  if (first(numberString) === '+') return formatInternationalTel(numberString);
  const digitsOnly = numberString.replace(/\D/g, '');
  return `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3, 7)}-${digitsOnly.slice(7)}`;
};

const formatInternationalTel = (tel: string) => tel;
