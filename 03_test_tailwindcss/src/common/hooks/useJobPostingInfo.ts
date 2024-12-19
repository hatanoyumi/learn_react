import type { Code } from '@src/apis/code';
import type { JobPosting } from '@src/apis/recruit';
import { ynToBoolean } from '@src/apis/utils';
import { getDDay, getExpiryDate, isMagicExpiryDate } from '@src/pages/Main/utils';
import { getDurationInMin } from '@src/utils';
import { first, isEmpty, isNil } from 'lodash';
import { useMemo } from 'react';

const getNameFromCode = (code?: Code) => code?.name ?? '';

const useJobPostingInfo = (jobPostingInfo?: JobPosting) => {
  const hasMultipleJobs = jobPostingInfo && jobPostingInfo?.jobSeries?.length > 1;
  const getFirstJobSeries = useMemo(() => first(jobPostingInfo?.jobSeries), [jobPostingInfo?.jobSeries]);
  const getFirstJobGroup = useMemo(() => getFirstJobSeries?.jobGroup, [getFirstJobSeries]);
  const getCareerTypeName = () => getNameFromCode(jobPostingInfo?.careerType);
  const getEmployeeTypeName = () => getNameFromCode(jobPostingInfo?.employeeType);
  const getCorporationName = () => jobPostingInfo?.corporation.name ?? '';
  const getCorporationCode = () => jobPostingInfo?.corporation.cd ?? '';
  const jobGroupName = useMemo(
    () => (hasMultipleJobs ? '共通' : getFirstJobGroup?.name ?? ''),
    [getFirstJobGroup?.name, hasMultipleJobs]
  );
  const jobSeriesName = useMemo(
    () => (hasMultipleJobs ? '共通' : getFirstJobSeries?.name ?? ''),
    [getFirstJobSeries, hasMultipleJobs]
  );
  const jobPostingName = useMemo(() => jobPostingInfo?.name ?? '', [jobPostingInfo?.name]);

  return {
    jobPostingName,
    jobSeriesName,
    jobGroupName,
    careerTypeName: getCareerTypeName(),
    employeeTypeName: getEmployeeTypeName(),
    corporationName: getCorporationName(),
    corporationCode: getCorporationCode(),
    isFinished:
      !isNil(jobPostingInfo) &&
      (ynToBoolean(jobPostingInfo?.finishYn) || Number(getDurationInMin(jobPostingInfo?.postingEndDatetime)) <= 0),
    postingEndDate: {
      // ISO8601 DATE
      isMagicExpiryDate: isMagicExpiryDate(jobPostingInfo?.postingEndDatetime ?? ''),
      dDay: getDDay(jobPostingInfo?.postingEndDatetime),
      expiryDate: getExpiryDate(jobPostingInfo?.postingEndDatetime),
    },
    isAbleToApply: !isNil(jobPostingInfo?.outerApplicationUrl) && !isEmpty(jobPostingInfo?.outerApplicationUrl),
  };
};

export default useJobPostingInfo;
