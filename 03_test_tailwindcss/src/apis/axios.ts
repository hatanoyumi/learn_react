import { getStage } from '@src/common/constants';
import axios from 'axios';
import qs from 'qs';

export const getAxiosBaseURL = () => {
  const stage = getStage();

  if (!stage || !['LOCAL', 'DEVELOPMENT'].includes(stage)) return '';
  return '/server';
};

export const apiClient = axios.create({
  baseURL: getAxiosBaseURL(),
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  },
});
