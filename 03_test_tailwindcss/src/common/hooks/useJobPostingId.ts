import { isNil } from 'lodash';
import { useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const useJobPostingId = (jobPostingId?: string) => {
  const jobPostingIdKey = 'jobPostingId';
  const params = useParams() as { [jobPostingIdKey]: string };
  const [searchParams] = useSearchParams();
  const postingId = searchParams.get(jobPostingIdKey);

  const getPostingId = () => {
    if (isValidId(postingId)) {
      return String(postingId);
    }

    if (isValidId(params.jobPostingId)) {
      return String(params.jobPostingId);
    }

    return '';
  };

  const isValidJobPostingId = useCallback((id?: string | null) => isValidId(id), []);
  return {
    jobPostingId: jobPostingId ?? getPostingId(),
    jobPostingIdKey,
    isValidJobPostingId,
  };
};

const isValidId = (id?: string | null) => {
  return !isNil(id) && !['undefined', 'null', ''].includes(id);
};

export default useJobPostingId;
