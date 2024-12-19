import { apiClient } from '../axios';
import { apiPrefix } from '../urls';
import { booleanToYN } from '../utils';

import type { CodeReq, CodeRes } from './interface';

export const getCodes = async (data: CodeReq) => {
  const res = await apiClient.get<CodeRes>(apiPrefix.codes, {
    params: { ...data, ...(data.useYn ? { useYn: booleanToYN(data.useYn) } : {}) },
  });
  return res.data;
};
