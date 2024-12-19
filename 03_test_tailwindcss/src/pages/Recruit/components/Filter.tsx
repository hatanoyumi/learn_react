import { Disclosure, Transition } from '@headlessui/react';
import { ReactComponent as Arrow } from '@icons/systems/chevron/up.svg';
import type { Code } from '@src/apis/code';
import type { Corporation, JobPostingsReq, JobSeries } from '@src/apis/recruit/interface';
import CheckboxInput from '@src/components/Input/CheckboxInput';
import { tw } from '@src/utils';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { get, isArray } from 'lodash';
import { Fragment } from 'react/jsx-runtime';

import { postingParamsAtom } from '../store/atom';

const MotionPanel = motion(Disclosure.Panel);

function Filter({ title, id, filterList }: FilterProps) {
  const [jobPostingParams, setJobPostingParams] = useAtom(postingParamsAtom);

  const getJobPostingParam = (id: FilterId) => get(jobPostingParams, id);

  const getFilterIdentity = (filter: FilterType) => {
    const filterId = (filter as JobSeries | Corporation)?.id;
    const filterCd = (filter as Code)?.cd;

    return { filterId, filterCd };
  };

  const filterJobPostingParam = (arg: string) => {
    const params = getJobPostingParam(id);
    if (!isArray(params)) return params;

    return params.includes(arg) ? params.filter((val) => val !== arg) : params.concat(arg);
  };

  const handleCheckedFilter = (filter: FilterType) => {
    const { filterId, filterCd } = getFilterIdentity(filter);
    const stringIds: FilterId[] = [FILTER_IDS.jobSeriesId, FILTER_IDS.corporationId];

    const updatedParams = stringIds.includes(id) // stringParam 일 경우 id 를 기준으로 필터 / 아닐 경우, cd 를 기준으로 필터
      ? filterJobPostingParam(filterId)
      : filterJobPostingParam(filterCd);

    setJobPostingParams({
      ...jobPostingParams,
      [id]: updatedParams,
    });
  };

  const isChecked = (filter: FilterType) => {
    const params = getJobPostingParam(id);
    if (!isArray(params)) return false;

    const { filterId, filterCd } = getFilterIdentity(filter);

    return (params && params.includes(filterId)) || params.includes(filterCd);
  };

  return (
    <Disclosure as='div' defaultOpen>
      {({ open }) => {
        return (
          <>
            <Disclosure.Button className='flex w-full items-center justify-between py-16 font-400 font-700 text-b1'>
              <h5>{title}</h5>

              <Arrow className={tw('transition-transform duration-300', open ? 'rotate-0' : 'rotate-180')} />
            </Disclosure.Button>

            <Transition
              as={Fragment}
              enter='transition-all duration-300'
              enterFrom='max-h-0'
              enterTo='max-h-800'
              leave='transition-all duration-300'
              leaveFrom='max-h-800'
              leaveTo='max-h-0'
            >
              <Disclosure.Panel as='ul' className='overflow-hidden' unmount={false}>
                {filterList?.map((filter, idx) => {
                  const checked = isChecked(filter);
                  const key = `${id}_${(filter as JobSeries | Corporation).id ?? (filter as Code).cd}_${idx}`;

                  return (
                    <li key={key} className='py-8'>
                      <CheckboxInput id={key} checked={checked} onChange={() => handleCheckedFilter(filter)}>
                        <span className={checked ? 'font-600' : ''}>{filter.name}</span>
                      </CheckboxInput>
                    </li>
                  );
                })}
              </Disclosure.Panel>
            </Transition>
          </>
        );
      }}
    </Disclosure>
  );
}

export default Filter;

type FilterType = JobSeries | Corporation | Code;
type FilterProps = {
  title: string;
  id: keyof JobPostingsReq;
  filterList: FilterType[] | undefined;
};
type FilterId = keyof JobPostingsReq;

export const FILTER_TITLES: Record<FilterId, string> = {
  corporationId: '法人',
  jobSeriesId: '職種',
  employeeTypeCds: '雇用形態',
  intensiveRecruiting: '',
  keyword: '',
  jobGroupId: '',
  careerTypeCds: '',
} as const;

export const FILTER_IDS: Record<FilterId, FilterId> = {
  corporationId: 'corporationId',
  jobSeriesId: 'jobSeriesId',
  employeeTypeCds: 'employeeTypeCds',

  intensiveRecruiting: 'intensiveRecruiting',
  keyword: 'keyword',
  jobGroupId: 'jobGroupId',
  careerTypeCds: 'careerTypeCds',
} as const;
