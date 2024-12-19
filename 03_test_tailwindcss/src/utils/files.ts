import type { FileUploadPolicyRes } from '@src/apis/file';
import { curry, isEmpty, isNil, last } from 'lodash';

export const getMaxSizeFromPolicyRes = (res?: FileUploadPolicyRes) => {
  return res?.result.maxSize ?? 104857600; // Default 100MB
};

export const getFileExtensionsFromPolicyRes = (res?: FileUploadPolicyRes) => {
  return res?.result.extensions;
};

export const convertFileSizeFromByte = (size?: number | null, convertTo: 'KB' | 'MB' | 'GB' = 'KB') => {
  // 소수점 1자리까지 반올림하여 변환한다
  if (!size) return 0;

  switch (convertTo) {
    case 'KB': {
      return Math.round(size / 1024 ** 1);
    }
    case 'MB': {
      return Math.round((size / 1024 ** 2) * 10) / 10;
    }
    case 'GB': {
      return Math.round((size / 1024 ** 3) * 10) / 10;
    }
  }
};

export const formatFileSizeFromByte = (size?: number | null, format: 'KB' | 'MB' | 'GB' = 'KB'): string => {
  if (!size) return '';

  if (format === 'KB') {
    const length = String(convertFileSizeFromByte(size, format)).length;
    if (3 < length) {
      return formatFileSizeFromByte(size, 'MB');
    }
  }

  if (format === 'MB') {
    const length = String(convertFileSizeFromByte(size, format)).length;
    if (4 < length) {
      return formatFileSizeFromByte(size, 'GB');
    }
  }

  if (format === 'GB') {
    return convertFileSizeFromByte(size, 'GB') + 'GB';
  }

  return convertFileSizeFromByte(size, format) + format;
};

export const getImageAcceptFromExt = (ext?: string) => {
  return ext
    ?.split(', ')
    .map((it) => `.${it}`)
    .join(',');
};

export const createFormData = (file: File, fileGroupId?: string | null) => {
  const formData = new FormData();
  const name = 'file';
  const fileGroupIdName = 'fileGroupId';

  formData.append(name, file);
  if (!isNil(fileGroupId) && !isEmpty(fileGroupId)) {
    formData.append(fileGroupIdName, fileGroupId);
  }

  return formData;
};

export const doesFileMatchExt = (file: File, ext?: string) => {
  if (!ext || !file) return;
  const exts = ext.split(',').map((it) => it.trim());
  return exts.includes(last(file.name.split('.')) ?? '');
};

export const isFileSizeGtMaxSize = curry((maxSize: number, file: File) => {
  if (!maxSize || !file) return true;

  return maxSize < file.size;
});
