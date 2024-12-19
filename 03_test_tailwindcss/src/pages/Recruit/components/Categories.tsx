import { useGetJobGroups } from '@src/apis/recruit/hooks';
import type { JobGroup, JobPostingsReq } from '@src/apis/recruit/interface';
import { JOB_GROUP_CODES, JobGroupsPerCorp } from '@src/common/constants';
import useCorpParam from '@src/common/hooks/useCorpParam';
import useCurrentCorporation from '@src/common/hooks/useCurrentCorporation';
import useJobGroupId from '@src/common/hooks/useJobGroupId';
import SearchInput from '@src/components/Input/SearchInput/NewSearchInput';
import { getClsByDevice, tw } from '@src/utils';
import { useSetAtom } from 'jotai';
import { get, isEmpty, isNil, omit, values } from 'lodash';
import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { twJoin } from 'tailwind-merge';

import { initialPostingParams, postingParamsAtom } from '../store/atom';

interface ICategories {
  wrapClassNames?: string;
  setKeyword?: (keyword: string) => void;
}

function Categories({ wrapClassNames, setKeyword }: ICategories) {
  const setJobPostingParams = useSetAtom(postingParamsAtom);
  const { jobGroupId, jobGroupParamKey, isSameJobGroupId, setJobGroupId, deleteJobGroupId } = useJobGroupId();
  const corp = useCorpParam();
  const corporation = useCurrentCorporation();
  const [searchValue, setSearchValue] = useState('');
  const getJobGroups = useGetJobGroups({ corporationId: corporation?.id });
  const allButtonAction = useRef(0);
  const jobGroups = getJobGroups?.data?.result;
  const isAllSelected = isNil(jobGroupId) || isEmpty(jobGroupId);
  const jobGroupsPerCorp = isNil(corp) ? values(JOB_GROUP_CODES) : get(JobGroupsPerCorp, corp);
  const categories: JobGroup[] = jobGroupsPerCorp
    .map((it) => jobGroups?.find((jg) => jg.id === it) as JobGroup)
    .filter((it) => !isNil(it));

  const onSubmit = useCallback(() => {
    if (isNil(setKeyword)) return;
    setKeyword(searchValue);
  }, [searchValue, setKeyword]);

  const handleSearchOnChange = (e?: ChangeEvent<HTMLInputElement>) => {
    const value = e?.target.value ?? '';
    setSearchValue(value);
  };

  useEffect(() => {
    if (isNil(corporation)) return;

    setJobPostingParams((prev) => ({ ...prev, corporationId: [corporation.id] }));
  }, [corporation, setJobPostingParams]);

  useEffect(() => {
    if (isMobile) onSubmit();
  }, [onSubmit]);

  const resetKeyword = () => {
    setKeyword && setKeyword('');
    setSearchValue('');
  };

  useEffect(() => {
    if (jobGroupId === null && allButtonAction.current === 0) {
      setJobPostingParams(
        (prev) => omit({ ...prev, jobGroupId: initialPostingParams.jobGroupId }, jobGroupParamKey) as JobPostingsReq
      );
      deleteJobGroupId();
    }
  }, [deleteJobGroupId, jobGroupId, jobGroupParamKey, setJobPostingParams]);

  return (
    <section
      className={getClsByDevice({
        common: tw('sticky z-20 mx-auto flex  items-center justify-between bg-white', wrapClassNames),
        desktop: 'top-header-desktop mx-auto mb-48 w-full max-w-desktop py-24',
        mobile: 'top-0 flex-wrap-reverse overflow-hidden border-b-10 border-gs-100 px-24',
      })}
    >
      <div
        className={getClsByDevice({
          common: 'flex overflow-x-auto',
          desktop: 'gap-x-40',
          mobile: 'flex w-max gap-x-32 py-24 scrollbar-none',
        })}
      >
        <button
          key='all'
          className={buttonStyle(isAllSelected)}
          onClick={() => {
            allButtonAction.current = 1;
            setJobPostingParams(
              (prev) =>
                omit(
                  {
                    ...prev,
                    jobGroupId: initialPostingParams.jobGroupId,
                    jobSeriesId: initialPostingParams.jobSeriesId,
                  },
                  jobGroupParamKey
                ) as JobPostingsReq
            );
            deleteJobGroupId();
            setTimeout(() => (allButtonAction.current = 0), 50);
          }}
        >
          <span className={buttonTextStyle(isAllSelected)}>All</span>
        </button>

        {categories.map((jobGroup) => {
          const isSelected = isSameJobGroupId(jobGroup.id);
          return (
            <button
              key={jobGroup.name}
              className={buttonStyle(isSelected)}
              onClick={() => {
                setJobPostingParams((prev) => ({
                  ...prev,
                  jobGroupId: [jobGroup.id],
                  jobSeriesId: initialPostingParams.jobSeriesId,
                }));
                setJobGroupId(jobGroup.id);
              }}
            >
              <span className={buttonTextStyle(isSelected)}>{jobGroup.name}</span>
            </button>
          );
        })}
      </div>

      {!isNil(corp) && (
        <form
          className={getClsByDevice({ mobile: 'w-full', desktop: 'w-400' })}
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSubmit();
          }}
        >
          <SearchInput
            value={searchValue}
            onChange={handleSearchOnChange}
            onReset={resetKeyword}
            placeholder='職務、技術スタックなどで検索'
          />
        </form>
      )}
    </section>
  );
}

export default Categories;

const buttonStyle = (isSelected: boolean) =>
  tw(
    'border-b-2 border-solid focus:opacity-100 h-40',
    isSelected ? 'border-primary-500' : 'border-transparent  hover:text-gs-500'
  );

const buttonTextStyle = (isSelected: boolean) =>
  twJoin(
    'font-700 flex items-center relative',
    isMobile ? 'font-700 text-t3-m' : 'font-700 text-t3',
    isSelected ? 'text-primary-500' : 'text-gs-500'
  );
