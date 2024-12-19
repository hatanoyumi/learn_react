import type { JobPostingsReq, LastPageScrollYType } from '@src/apis/recruit/interface';
import { atom } from 'jotai';

export const initialPostingParams: Omit<JobPostingsReq, 'keyword'> = {
  intensiveRecruiting: false,
  jobSeriesId: [],
  jobGroupId: [],
  corporationId: [],
  careerTypeCds: [],
  employeeTypeCds: [],
};

export const postingParamsAtom = atom<Omit<JobPostingsReq, 'keyword'>>(initialPostingParams);
export const initialLastPageScrollY = { y: 0 };
export const lastPageScrollY = atom<LastPageScrollYType>(initialLastPageScrollY);
