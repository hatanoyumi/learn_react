import type { JobPostingsReq } from '@src/apis/recruit';
import useCurrentCorporation from '@src/common/hooks/useCurrentCorporation';
import useJobGroupId from '@src/common/hooks/useJobGroupId';
import { useAtom } from 'jotai';
import { isNil } from 'lodash';
import { useEffect, useReducer } from 'react';

import { initialPostingParams, postingParamsAtom } from '../store/atom';

const TYPE = { CLEAR: 'CLEAR', SET: 'SET' } as const;
type Payload = Partial<JobPostingsReq>;
type Action = { type: typeof TYPE.CLEAR } | { type: typeof TYPE.SET; payload: Payload };

const useJobPostingParams = () => {
  const { jobGroupId } = useJobGroupId();
  const [jobPostingParams, setJobPostingParams] = useAtom(postingParamsAtom);
  const corporation = useCurrentCorporation();

  const initialState = {
    ...initialPostingParams,
    jobGroupId: jobPostingParams.jobGroupId,
    ...(isNil(corporation) ? {} : { corporationId: [corporation.id] }),
  };

  const reducer = (state: Omit<JobPostingsReq, 'keyword'>, action: Action) => {
    switch (action.type) {
      case TYPE.CLEAR:
        return initialState;
      case TYPE.SET:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };
  const [cachedJobPostingParams, cachedJobPostingParamsDispatch] = useReducer(reducer, jobPostingParams);
  const isJobPostingParamsEqual = jobPostingParams === cachedJobPostingParams;

  const handleOnChangeJobPostingParams = () => {
    setJobPostingParams(cachedJobPostingParams);
  };
  const handleOnChangeCachedJobPostingParams = (payload: Payload) => {
    cachedJobPostingParamsDispatch({ type: 'SET', payload });
  };
  const handleClearCachedJobPostingParams = () => {
    cachedJobPostingParamsDispatch({ type: 'CLEAR' });
  };

  useEffect(() => {
    const payload = jobPostingParams as Payload;
    handleOnChangeCachedJobPostingParams(payload);
  }, [jobPostingParams]);

  useEffect(() => {
    handleOnChangeCachedJobPostingParams({ jobGroupId: jobGroupId ? [jobGroupId] : undefined });
  }, [jobGroupId]);

  const {
    corporationId: cachedCorporationId,
    jobSeriesId: cachedJobSeriesId,
    employeeTypeCds: cachedEmployeeTypeCds,
  } = cachedJobPostingParams;
  return {
    handleOnChangeCachedJobPostingParams,
    handleOnChangeJobPostingParams,
    handleClearCachedJobPostingParams,
    isJobPostingParamsEqual,
    jobPostingParams,
    cachedCorporationId,
    cachedJobSeriesId,
    cachedEmployeeTypeCds,
  };
};
export default useJobPostingParams;
