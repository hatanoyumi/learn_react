import { useJobContentsItem } from '@src/apis/recruit';
import useJobPostingId from '@src/common/hooks/useJobPostingId';
import useJobPostingInfo from '@src/common/hooks/useJobPostingInfo';
import Divider from '@src/components/common/Divider';
import { shouldHighlightDDay } from '@src/pages/Main/utils';
import { isEmpty } from 'lodash';

const DetailCategories = () => {
  const { jobPostingId } = useJobPostingId();
  const jobContentsItem = useJobContentsItem(jobPostingId, { retry: 0 });
  const { jobSeriesName, jobGroupName, employeeTypeName, postingEndDate } = useJobPostingInfo(
    jobContentsItem?.data?.result
  );

  return (
    <div className='flex  items-center gap-x-16 font-300 text-b3 text-gs-700'>
      <span>{jobGroupName}</span>
      {!isEmpty(jobSeriesName) && <Divider />}
      <span>{jobSeriesName}</span>
      {!isEmpty(employeeTypeName) && <Divider />}
      <span>{employeeTypeName}</span>
      {!isEmpty(postingEndDate.dDay) && <Divider />}
      <span className={shouldHighlightDDay(postingEndDate.dDay) ? 'font-600 text-primary' : ''}>
        {postingEndDate.dDay}
      </span>
    </div>
  );
};

export default DetailCategories;
