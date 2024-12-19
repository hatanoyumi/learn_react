import List from '@components/Card/List';
import { ReactComponent as Filter } from '@icons/systems/etc/filter.svg';
import { useGetInfiniteJobPostings } from '@src/apis/recruit/hooks';
import useCorpParam from '@src/common/hooks/useCorpParam';
import { useIntersectionObserver } from '@src/common/hooks/useIntersectionObserver';
import useJobGroupId from '@src/common/hooks/useJobGroupId';
import IconButton from '@src/components/Buttons/IconButton';
import NoDataGuard from '@src/components/common/NoDataGuard';
import { getClsByDevice } from '@src/utils';
import { getCorpData } from '@src/utils/corp';
import { useAtom } from 'jotai';
import { first, isEmpty } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { BrowserView, isMobile, MobileView } from 'react-device-detect';

import Banner from '../components/Banner';
import Categories from '../components/Categories';
import Filters from '../components/Filters';
import MobileFilterPopup from '../components/MobileFilterPopup';
import NoData from '../components/NoData';
import SearchResults from '../components/SearchResults';
import { postingParamsAtom } from '../store/atom';

function RecruitCorp() {
  const corpParam = useCorpParam();
  const [isOpenFilterModal, setIsOpenFilterModal] = useState(false);
  const [jobPostingParams, setJobPostingParams] = useAtom(postingParamsAtom);
  const { jobGroupId } = useJobGroupId();
  const [keyword, setKeyword] = useState('');
  const {
    isFetching,
    data: jobPostingsList,
    fetchNextPage,
  } = useGetInfiniteJobPostings({ ...jobPostingParams, keyword });
  const { isIntersecting, ref: targetRef } = useIntersectionObserver({ threshold: 0.5 });
  const { recruitBannersObject } = getCorpData();

  const jobPostings = useMemo(
    () => jobPostingsList?.pages.flatMap((page) => page.result.map((info) => info)),
    [jobPostingsList]
  );
  const jobPosting = useMemo(() => first(jobPostingsList?.pages), [jobPostingsList]);
  const jobPostingCount = (jobPosting?.paging.totalSize ?? 0) as number;
  const isEmptyJobPostings = useMemo(() => isEmpty(jobPostings), [jobPostings]);
  const banners = useMemo(() => (corpParam ? recruitBannersObject[corpParam] : []), [corpParam, recruitBannersObject]);

  useEffect(() => {
    if (jobPostings || !isIntersecting) return;
    fetchNextPage();
  }, [fetchNextPage, isIntersecting, jobPostings]);

  useEffect(() => {
    const jobGroupIdParam = jobGroupId ? { jobGroupId: [jobGroupId] } : {};
    setJobPostingParams((prev) => ({ ...prev, ...jobGroupIdParam }));
  }, [jobGroupId, setJobPostingParams]);

  return (
    <>
      <Banner data={banners} />
      <MobileView className='mx-auto max-w-mobile px-24 pt-12'>{first(banners)?.Link}</MobileView>

      <div
        className={getClsByDevice({
          common: 'mx-auto',
          desktop: 'max-w-desktop',
          mobile: 'max-w-mobile',
        })}
      >
        <Categories
          wrapClassNames={getClsByDevice({
            desktop: 'mt-32',
            mobile: 'mt-24',
          })}
          setKeyword={setKeyword}
        />

        <section
          className={getClsByDevice({
            desktop: 'grid grid-cols-[15rem_auto] gap-x-100 pb-96',
            mobile: 'px-24',
          })}
        >
          <BrowserView renderWithFragment>
            <Filters />
          </BrowserView>

          <div>
            <div
              className={getClsByDevice({
                desktop: 'mb-24',
                mobile: 'sticky top-148 z-10 flex w-full items-center justify-between bg-gs-white py-24',
              })}
            >
              {!isEmptyJobPostings && !isMobile && <SearchResults jobPostingCount={jobPostingCount} />}

              <MobileView renderWithFragment>
                <div className='flex gap-x-8'>
                  <span className='font-400 text-b1-m text-primary-500'>{jobPostingCount}</span>
                  <span className='text-b2-m font-600'>件の募集職種</span>
                </div>

                <IconButton
                  Icon={<Filter />}
                  onClick={() => setIsOpenFilterModal(true)}
                  variant='white'
                  size='default'
                />
              </MobileView>
            </div>

            <NoDataGuard
              condition={!isEmptyJobPostings}
              Placeholder={
                isFetching ? (
                  <div
                    className={getClsByDevice({
                      desktop: 'h-512',
                      mobile: 'h-320',
                    })}
                  />
                ) : (
                  <NoData />
                )
              }
            >
              {jobPostings?.map((info, idx) => (
                <List id={info.id} info={info} key={`${info.name}_${idx}`} idx={idx} />
              ))}
            </NoDataGuard>
            <div ref={targetRef} className='h-10 w-full' />
          </div>
        </section>
      </div>

      <MobileFilterPopup isOpenFilterModal={isOpenFilterModal} setIsOpenFilterModal={setIsOpenFilterModal} />
    </>
  );
}

export default RecruitCorp;
