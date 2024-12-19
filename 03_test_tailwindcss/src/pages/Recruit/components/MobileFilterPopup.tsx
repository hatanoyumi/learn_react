import BottomSheet from '@components/Popup/BottomSheet';
import { ReactComponent as Refresh } from '@icons/systems/arrow/circle.svg';
import { type Code, CodeKind, useGetCodes } from '@src/apis/code';
import { useGetCorporations, useGetJobSeries } from '@src/apis/recruit';
import type { Corporation, JobSeries } from '@src/apis/recruit/interface';
import useCurrentCorporation from '@src/common/hooks/useCurrentCorporation';
import useJobGroupId from '@src/common/hooks/useJobGroupId';
import Button from '@src/components/Buttons/Button';
import IconButton from '@src/components/Buttons/IconButton';
import { flatMap, isNil } from 'lodash';

import useJobPostingParams from '../hooks/useJobPostingParams';

import { FILTER_TITLES } from './Filter';
import MobileCheckBoxGroup from './MobileCheckBoxGroup';

type Props = {
  isOpenFilterModal: boolean;
  setIsOpenFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function MobileFilterPopup({ isOpenFilterModal, setIsOpenFilterModal }: Props) {
  const { jobGroupId } = useJobGroupId();
  const {
    handleClearCachedJobPostingParams,
    handleOnChangeJobPostingParams,
    handleOnChangeCachedJobPostingParams,
    isJobPostingParamsEqual,
    jobPostingParams,
    cachedCorporationId,
    cachedJobSeriesId,
    cachedEmployeeTypeCds,
  } = useJobPostingParams();

  const filterValueList = flatMap([
    jobPostingParams.jobSeriesId,
    jobPostingParams.careerTypeCds,
    jobPostingParams.employeeTypeCds,
    jobPostingParams.corporationId,
  ]);

  const corporation = useCurrentCorporation();
  const getJobSeries = useGetJobSeries({ jobGroupId, corporationId: corporation?.id });
  const getCorporations = useGetCorporations();
  const getEmployeeTypeJPCodes = useGetCodes({ cdKind: CodeKind.employeeTypeJP });

  const corporations = getCorporations.data?.result ?? [];
  const jobSeries = getJobSeries.data?.result ?? [];
  const employeeTypeCds = getEmployeeTypeJPCodes?.data?.result ?? [];

  return (
    <BottomSheet
      isOpen={isOpenFilterModal}
      close={() => {
        setIsOpenFilterModal(false);
        !isJobPostingParamsEqual && handleOnChangeCachedJobPostingParams(jobPostingParams);
      }}
      title='絞り込む'
    >
      <div className='relative px-24'>
        <div className='h-[calc(100dvh-146px)] overflow-auto pb-46 pr-16'>
          {isNil(corporation) && (
            <MobileCheckBoxGroup<Corporation[]>
              options={corporations}
              title={FILTER_TITLES.corporationId}
              checkedValues={cachedCorporationId}
              onChange={(updatedValues) => handleOnChangeCachedJobPostingParams({ corporationId: updatedValues })}
            />
          )}
          <MobileCheckBoxGroup<JobSeries[]>
            options={jobSeries}
            title={FILTER_TITLES.jobSeriesId}
            checkedValues={cachedJobSeriesId}
            onChange={(updatedValues) => handleOnChangeCachedJobPostingParams({ jobSeriesId: updatedValues })}
          />
          <MobileCheckBoxGroup<Code[]>
            options={employeeTypeCds}
            title={FILTER_TITLES.employeeTypeCds}
            checkedValues={cachedEmployeeTypeCds}
            onChange={(updatedValues) => handleOnChangeCachedJobPostingParams({ employeeTypeCds: updatedValues })}
          />
        </div>

        <div className='fixed bottom-0 left-0 flex w-full items-center justify-between gap-x-8 border-t border-t-gs-200 bg-gs-white p-12'>
          <IconButton
            variant='white'
            size='default'
            Icon={<Refresh />}
            onClick={() => {
              handleClearCachedJobPostingParams();
            }}
            // disabled={isEmpty(filterValueList)}
          />
          <Button
            size='large'
            variant='fill'
            className='w-full'
            onClick={() => {
              handleOnChangeJobPostingParams();
              setIsOpenFilterModal(false);
            }}
          >
            適用する
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
}

export default MobileFilterPopup;
