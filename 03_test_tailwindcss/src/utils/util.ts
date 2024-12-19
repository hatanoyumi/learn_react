import { pageLimit } from '@common/constants';
import { isArray, isBoolean, isEmpty, isNil, isNumber, isObject, isString, pickBy, reduce } from 'lodash';
import sanitize from 'sanitize-html';

export const filterNonEmptyValues = <T extends Record<string, unknown>>(obj: T): T => {
  return pickBy(obj, (value) => {
    if (isArray(value)) {
      return !isEmpty(value);
    }
    if (isString(value)) {
      return value.trim().length > 0;
    }
    if (isBoolean(value)) return value;
    if (isObject(value)) return !isEmpty(value);
    if (isNumber(value)) return true;

    return false;
  }) as T;
};

export const createMarkup = (html: string, opt?: { sanitize: boolean }) => {
  const shouldSanitize = !isNil(opt?.sanitize) ? !!opt?.sanitize : true;
  return { __html: shouldSanitize ? sanitize(html) : html };
};

export const generateRandomChars = (count = 8) => {
  return Math.random().toString(36).substring(2, count);
};

export const maxPageNumber = (totalSize?: number) => {
  return Number(totalSize) / pageLimit - 1;
};

export const allTruthy = <T>(arr: T[], fn: (it: T) => boolean): boolean => {
  return reduce(
    arr,
    (result, value) => {
      return fn(value) && result;
    },
    true
  );
};

export const sliceToMaxLength = (maxLength: number) => (val: string) => val.slice(0, maxLength);
export const commonMaxLength = 200;
export const sliceToCommonLength = sliceToMaxLength(commonMaxLength);
export const largeMaxLength = 2000;
export const sliceToLargeLength = sliceToMaxLength(largeMaxLength);

export const isFilled = <T>(args: T) => !isEmpty(args);

export const goToTop = () => window.scrollTo({ top: 0 });
