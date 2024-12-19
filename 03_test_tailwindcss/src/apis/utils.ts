import { type AxiosError, isAxiosError } from 'axios';
import { isNil } from 'lodash';

import { renewAccessToken } from './account';
import { getAxiosBaseURL } from './axios';
import { apiPrefix } from './urls';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const refreshAccessTokenWrapper = <T>(fn: (...args: any[]) => Promise<T>): ((...args: any[]) => Promise<T>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (...args: any[]): Promise<T> => {
    try {
      const response = await fn(...args);
      return response;
    } catch (e) {
      const error = e as ServerError;
      if (!isAxiosError(error) || error.response?.status !== 401) {
        throw error;
      }

      try {
        await renewAccessToken();
        const response = await fn(...args);
        return response;
      } catch (e) {
        throw error;
      }
    }
  };
};

export const logError = (error: unknown) => console.error(error);

export const handleGeneralError = (error: unknown) => {
  const err = error as ServerError;

  if (err.response) {
    const { data } = err.response;

    if (data?.result) {
      const { detail, error: errorCode, message } = data.result;
      logError({ detail, errorCode, message });
    }
  } else {
    logError(err);
  }
};

export const isBooleanYN = (data: string): data is BooleanYN => ['Y', 'N'].includes(data);

export const ynToBoolean = (yn?: boolean | BooleanYN | null): boolean => {
  if (isNil(yn)) return false;
  if (typeof yn === 'boolean') return yn;

  switch (yn) {
    case 'Y':
      return true;
    case 'N':
      return false;
    default:
      return false;
  }
};

export const booleanToYN = (flag?: boolean | string | null): BooleanYN | null => {
  if (isNil(flag)) return null;
  if (typeof flag === 'string' && ['Y', 'N'].includes(flag)) return flag as BooleanYN;

  switch (flag) {
    case true:
      return 'Y';
    case false:
      return 'N';
  }

  return null;
};

export const lazyUseQueryOption = (opt?: Record<string, unknown>) => {
  return {
    refetchInterval: 30 * 60 * 1000, // 자주 변하지 않는 데이터는 30분마다 refetch 하도록 한다
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    ...opt,
  };
};

export const getDownloadImageUrl = (fileGroupId?: string | null, fileId?: string | null) => {
  if (!fileGroupId || !fileId) return '';

  return `${window.origin}${getAxiosBaseURL()}${apiPrefix.files?.groups}/${fileGroupId}/files/${fileId}/download`;
};

export type APIHeader = {
  resultCode: number;
  resultMessage: string;
  successful: boolean;
};

export type APIResponse<T, P extends boolean = false> = {
  header: APIHeader;
  result: T;
  totalCount: T extends Array<unknown> ? number : undefined;
  paging: P extends true ? Paging : undefined;
};

export type Paging = {
  totalSize: string;
  page: number;
  size: number;
};

export type CommonError = APIResponse<{
  detail: string;
  error: number;
  message: string;
}>;

export type ServerError = AxiosError<CommonError>;

export type BooleanYN = 'Y' | 'N';

export type Pageable = {
  page: number;
  size: number;
};
