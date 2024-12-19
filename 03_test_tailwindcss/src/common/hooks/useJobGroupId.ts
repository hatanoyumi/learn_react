import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

const useJobGroupId = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const key = 'jobGroupId';
  const jobGroupId = searchParams.get(key);

  const isSameJobGroupId = useCallback((id: string) => jobGroupId === id, [jobGroupId]);
  const deleteJobGroupId = useCallback(() => {
    searchParams.delete(key);
    setSearchParams(searchParams, { replace: true });
  }, [searchParams]);
  return {
    jobGroupParamKey: key,
    jobGroupId: jobGroupId,
    isSameJobGroupId,
    setJobGroupId: (value: string) => setSearchParams({ [key]: value }),
    deleteJobGroupId,
  };
};

export default useJobGroupId;
