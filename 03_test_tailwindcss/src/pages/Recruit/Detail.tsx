import { CORPORATION_CODES, Corps, recruitPathnamePerCorp, route } from '@common/constants';
import Block from '@components/Card/Block';
import { useGetInfiniteJobPostings, useJobContentsItem } from '@src/apis/recruit';
import useCorpParam from '@src/common/hooks/useCorpParam';
import useElTouchTopObserver from '@src/common/hooks/useElTouchTopObserver';
import { useIntersectionObserver } from '@src/common/hooks/useIntersectionObserver';
import useJobGroupId from '@src/common/hooks/useJobGroupId';
import useJobPostingId from '@src/common/hooks/useJobPostingId';
import useJobPostingInfo from '@src/common/hooks/useJobPostingInfo';
import useNavigateWithSearch from '@src/common/hooks/useNavigateWithSearch';
import useScrollToSearchParams from '@src/common/hooks/useScrollToSearchParams';
import Button from '@src/components/Buttons/Button';
import TypoButton from '@src/components/Buttons/TypoButton';
import ShareTooltip from '@src/components/Card/ShareTooltip';
import Br from '@src/components/common/Br';
import NoDataGuard from '@src/components/common/NoDataGuard';
import { getClsByDevice, tw } from '@src/utils';
import { getCorpData } from '@src/utils/corp';
import { motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { fill, findKey, first, get, isEmpty, nth } from 'lodash';
import type { MouseEventHandler } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { Link } from 'react-router-dom';

import DetailCategories from './components/DetailCategories';
import JobContentNotFoundGuard from './components/JobContentNotFoundGuard';
import RecruitContents from './components/RecruitContents';
import { postingParamsAtom } from './store/atom';

/**
 *
 * Flow 1. 채용 공고 리스트에서 진입 시,
 *    jobPostingParams 그대로 노출
 * FLow 2. 그 외에서 진입 했을 경우,
 *    추천 공고 노출
 * Except. 북마크에서 진입했을 경우, 북마크 노출
 */
function DetailPage() {
  const go = useNavigateWithSearch();
  const detailWrapperRef = useRef<HTMLElement | null>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { jobPostingId } = useJobPostingId();
  const corpParam = useCorpParam();
  const { corpSiteUrls, corpNameObject } = getCorpData();
  const jobPostingParams = useAtomValue(postingParamsAtom);
  const { jobGroupId, jobGroupParamKey } = useJobGroupId();
  const jobContentsItem = useJobContentsItem(jobPostingId, { retry: 0 });
  const { ref: targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
  });
  const contentItem = jobContentsItem?.data?.result;
  const { corporationName, corporationCode, jobPostingName, isAbleToApply } = useJobPostingInfo(contentItem);
  const { setRef: setApplyButtonRef, isTouchTop } = useElTouchTopObserver();
  const corpNameKey = findKey(CORPORATION_CODES, (key) => key === corporationCode) ?? '';
  const corpName = get(corpNameObject, corpNameKey);
  const getInfiniteJobPostings = useGetInfiniteJobPostings({
    ...jobPostingParams,
    keyword: '',
    corporationId: [contentItem?.corporation.id as string],
    jobGroupId: [contentItem?.jobSeries[0].jobGroup.id as string] || [],
  });
  const {
    key,
    values: { benefits },
  } = useScrollToSearchParams();

  const jobPostingList = useMemo(() => getInfiniteJobPostings.data?.pages ?? [], [getInfiniteJobPostings.data?.pages]);
  const jobPostingListLength = jobPostingList.flatMap((page) => page.result).length ?? 0;
  const cardTotalLength = first(jobPostingList)?.paging.totalSize ?? 0;
  const dummyRefs = fill(Array(jobPostingListLength), null);
  const listRef = useRef<(HTMLDivElement | null)[]>(dummyRefs);
  const cards = useMemo(() => jobPostingList.flatMap((page) => page.result.flatMap(identity)) ?? [], [jobPostingList]);
  const recruitPathname = corpParam ? get(recruitPathnamePerCorp, corpParam) : route.recruit.list.main;
  const showWelfareBenefits = corpParam !== Corps.FUKUOKA;

  const goToBenefits = () => go({ pathname: route.info, searchParams: [{ key, value: benefits }] });

  const handleApplyButton: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.stopPropagation();
    const pathname = contentItem?.outerApplicationUrl ?? '';
    if (isEmpty(pathname)) return;

    window.open(parseURL(), '_blank');

    function parseURL() {
      if (pathname?.startsWith('https://') || pathname?.startsWith('http://')) return pathname;

      return 'https://' + pathname;
    }
  };

  const scrollCardToTop = (el?: HTMLDivElement | null, behavior?: ScrollBehavior) => {
    return listContainerRef.current?.scrollTo({
      top: el?.offsetTop,
      behavior: behavior ?? 'smooth',
    });
  };

  useEffect(() => {
    if (isEmpty(jobPostingList) || !isIntersecting) return;

    getInfiniteJobPostings.fetchNextPage();
  }, [isIntersecting, jobPostingList]);

  useEffect(() => {
    if (isEmpty(cards)) return;

    const isJobPostingFetched = !!cards.find((it) => it.id === jobPostingId);
    if (!isJobPostingFetched) {
      getInfiniteJobPostings.fetchNextPage();
    }
  }, [cards, jobPostingId]);

  useEffect(() => {
    if (!isInitialLoad) return;

    const idx = cards.findIndex((info) => info.id === jobPostingId);
    const card = nth(listRef.current, idx);
    if (idx === -1 || !card) return;

    scrollCardToTop(card);
    setIsInitialLoad(false);
  }, [cards, isInitialLoad, jobPostingId]);

  const handleGoBack = () => {
    return go({
      pathname: recruitPathname,
      searchParams: [...(jobGroupId ? [{ key: jobGroupParamKey, value: jobGroupId }] : [])],
    });
  };

  const outerSiteOpen = () => window.open(get(corpSiteUrls, corpNameKey), 'blank');

  return (
    <JobContentNotFoundGuard>
      <BrowserView className='mx-auto max-w-desktop justify-between pb-96 pt-32'>
        <header className='sticky top-0 z-90 flex min-h-104 items-start justify-between bg-gs-white pt-32'>
          <TypoButton variant='leading' onClick={handleGoBack} className='-ml-16 flex items-center'>
            戻る
          </TypoButton>

          <div className='relative flex w-full max-w-792 items-center justify-between transition-all duration-300'>
            <div
              className={getClsByDevice({
                desktop: 'space-y-8',
                mobile: 'space-y-20',
              })}
            >
              <h5 className='max-w-588 break-all font-800 text-h5'>{jobPostingName}</h5>

              <DetailCategories />
            </div>

            <div className='flex shrink-0 items-center gap-x-16'>
              <ShareTooltip link={window.location.origin + window.location.pathname} title={jobPostingName} />

              <Button
                variant='fill'
                onClick={handleApplyButton}
                className='min-w-0 px-34 py-16'
                disabled={!isAbleToApply}
                size='large'
              >
                <span className='font-400 text-b1'>応募する</span>
              </Button>
            </div>
          </div>
        </header>

        <div className='sticky top-105 z-100 h-40 w-299 space-y-32 bg-gs-white pb-17 font-300 text-b2 transition-all'>
          <div>
            <strong className='font-700 text-primary'>{cardTotalLength}</strong>
            <span className='ml-8'>件の募集職種</span>
          </div>
        </div>

        <div className='flex justify-between'>
          <div className={tw('sticky top-145 max-h-[60rem]')}>
            <div
              ref={listContainerRef}
              className='h-full w-299 space-y-16 overflow-auto overflow-x-hidden scrollbar scrollbar-thumb-gs-200 scrollbar-thumb-rounded-10 scrollbar-w-7'
            >
              <NoDataGuard condition={getInfiniteJobPostings.isFetching || !isEmpty(cards)} Placeholder=''>
                {cards.map((info, idx) => {
                  const isSelected = info.id === jobPostingId;

                  return (
                    <Block
                      id={info.id}
                      info={info}
                      key={info.id}
                      isSelected={isSelected}
                      ref={(el) => (listRef.current[idx] = el)}
                      handleClickCard={() => scrollCardToTop(nth(listRef.current, idx))}
                    />
                  );
                })}
              </NoDataGuard>

              <div ref={targetRef} className='h-10 w-full' />
            </div>
          </div>

          <RecruitContents
            handleGoBack={handleGoBack}
            className='w-full max-w-792'
            info={contentItem?.jobPostingContentsItems}
            detailWrapperRef={detailWrapperRef}
          >
            <TypoButton variant='trailing' onClick={outerSiteOpen}>
              {corpName} コーポレートサイト
            </TypoButton>
            {showWelfareBenefits && (
              <TypoButton variant='trailing' onClick={goToBenefits}>
                NHNの福利厚生
              </TypoButton>
            )}
            <TypoButton variant='trailing'>
              <Link to={route.guide}>採用までの流れ</Link>
            </TypoButton>
          </RecruitContents>
        </div>
      </BrowserView>

      <MobileView>
        <header className='px-24'>
          <div className='mb-8 flex items-center justify-between'>
            <span className='font-600 text-b2 text-gs-700'>{corporationName}</span>
            <div className='flex items-center'>
              <ShareTooltip
                link={window.location.origin + window.location.pathname}
                className='mr-15'
                title={jobPostingName}
              />
            </div>
          </div>
          <h5 className='mb-16 break-all font-800 text-h3-m'>{contentItem?.name}</h5>
          <DetailCategories />
        </header>
        <motion.div
          ref={setApplyButtonRef}
          variants={{
            initial: {
              width: 'calc(100% - 48px)',
            },
            fullWidth: {
              width: '100%',
            },
          }}
          initial='initial'
          className='sticky -top-0 mx-auto mt-12 pb-24'
          animate={isTouchTop ? 'fullWidth' : 'initial'}
          transition={{ duration: 0.2 }}
        >
          <Button
            variant='fill'
            size='medium'
            onClick={handleApplyButton}
            className={tw('w-full border-none', isTouchTop ? 'rounded-0' : 'rounded-4')}
          >
            応募する
          </Button>
        </motion.div>

        <RecruitContents info={contentItem?.jobPostingContentsItems} handleGoBack={handleGoBack}>
          <TypoButton variant='trailing' onClick={outerSiteOpen} className='keep-all'>
            {corporationName} <Br mobile />
            コーポレートサイト
          </TypoButton>
          {showWelfareBenefits && (
            <TypoButton variant='trailing' onClick={goToBenefits}>
              NHNの福利厚生
            </TypoButton>
          )}
          <TypoButton variant='trailing'>
            <Link to={route.guide}>採用までの流れ</Link>
          </TypoButton>
        </RecruitContents>
      </MobileView>
    </JobContentNotFoundGuard>
  );
}

export default DetailPage;

function identity<T>(arg: T) {
  return arg;
}
