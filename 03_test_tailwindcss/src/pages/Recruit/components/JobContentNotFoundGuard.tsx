import { useJobContentsItem } from '@src/apis/recruit';
import { route } from '@src/common/constants';
import useJobPostingId from '@src/common/hooks/useJobPostingId';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const JobContentNotFoundGuard = ({ children }: Props) => {
  const navigate = useNavigate();
  const { jobPostingId } = useJobPostingId();
  const jobContentsItem = useJobContentsItem(jobPostingId, { retry: 0 });

  useEffect(() => {
    if (!jobContentsItem.isError || jobContentsItem.error?.response?.status !== 500) return;

    navigate(route.notFound, { replace: true });
  }, [jobContentsItem.error?.response?.status, jobContentsItem.isError, navigate]);

  return <>{children}</>;
};

export default JobContentNotFoundGuard;

type Props = {
  children?: ReactNode;
};
