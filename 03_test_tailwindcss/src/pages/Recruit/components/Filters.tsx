import { ReactComponent as ArrowCircle } from '@icons/systems/arrow/circle.svg';
import { CodeKind, useGetCodes } from '@src/apis/code';
import { useGetCorporations, useGetJobSeries } from '@src/apis/recruit';
import useCorpParam from '@src/common/hooks/useCorpParam';
import useCurrentCorporation from '@src/common/hooks/useCurrentCorporation';
import useJobGroupId from '@src/common/hooks/useJobGroupId';
import { useSetAtom } from 'jotai';
import { isNil } from 'lodash';

import { initialPostingParams, postingParamsAtom } from '../store/atom';

import Filter, { FILTER_IDS, FILTER_TITLES } from './Filter';

export type FormValue = {
  [key: string]: boolean;
};

function Filters() {
  const corp = useCorpParam();
  const setJobPostingParams = useSetAtom(postingParamsAtom);
  const { jobGroupId } = useJobGroupId();
  const getCorporations = useGetCorporations();
  const corporation = useCurrentCorporation();
  const getJobSeries = useGetJobSeries({ jobGroupId, corporationId: corporation?.id });
  const getEmployeeTypeJPCodes = useGetCodes({ cdKind: CodeKind.employeeTypeJP });

  const jobSeries = getJobSeries.data?.result ?? [];
  const corporations = getCorporations.data?.result ?? [];
  const employeeTypeCds = getEmployeeTypeJPCodes?.data?.result ?? [];

  return (
    <aside className='sticky top-200 h-max w-282 space-y-32 overflow-y-scroll overscroll-contain pr-17 text-gs-1000 scrollbar scrollbar-thumb-GL/12 scrollbar-thumb-rounded-10 scrollbar-w-4'>
      <header className='flex w-full justify-between'>
        <h4 className='font-700 text-t3 text-gs-1000'>絞り込む</h4>
        <button
          onClick={() => {
            setJobPostingParams((prev) => ({
              ...initialPostingParams,
              jobGroupId: prev.jobGroupId,
              corporationId: corporation ? [corporation.id] : [],
            }));
          }}
        >
          <ArrowCircle className='size-24' />
        </button>
      </header>

      <div className='h-full max-h-[calc(100vh-256px)] space-y-24 scrollbar-none'>
        {isNil(corp) && (
          <Filter title={FILTER_TITLES.corporationId} id={FILTER_IDS.corporationId} filterList={corporations} />
        )}
        <Filter title={FILTER_TITLES.jobSeriesId} id={FILTER_IDS.jobSeriesId} filterList={jobSeries} />
        <Filter title={FILTER_TITLES.employeeTypeCds} id={FILTER_IDS.employeeTypeCds} filterList={employeeTypeCds} />
      </div>
    </aside>
  );
}

export default Filters;
