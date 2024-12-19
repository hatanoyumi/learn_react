import { pageLimit } from '@src/common/constants';
import useSimpleErrorPopup, { SimpleErrorKey } from '@src/common/hooks/useSimpleErrorPopup';
import { filterNonEmptyValues, maxPageNumber } from '@src/utils';
import type { QueryKey, UseInfiniteQueryOptions, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { isEmpty, isNil, isString } from 'lodash';

import type { BooleanYN, ServerError } from '../utils';
import { booleanToYN, lazyUseQueryOption, refreshAccessTokenWrapper } from '../utils';

import {
  deleteBookmark,
  getApplicationItems,
  getCorporationJobPostingCount,
  getCorporations,
  getJobContentsItem,
  getJobGroups,
  getJobPostings,
  getJobPostingSelfIntros,
  getJobPostingsRecommend,
  getJobSeries,
  getMappedJobs,
  updateBookmark,
} from './apis';
import type {
  ApplicationItemRes,
  BookmarkReq,
  JobGroupsReq,
  JobPostingRes,
  JobPostingSelfIntrosReq,
  JobPostingSelfIntrosRes,
  JobPostingsReq,
  JobPostingsRes,
  JobSeriesReq,
  UpdateBookmarkRes,
} from './interface';

export const useGetCorporationJobPostingCount = () => {
  return useQuery({
    queryKey: ['getCorporationJobPostingCount'],
    queryFn: () => getCorporationJobPostingCount(),
  });
};

export const useGetCorporations = () => {
  return useQuery({
    queryKey: ['getCorporations'],
    queryFn: () => getCorporations(),
  });
};

/**
 * @description corporationId 가 없을 경우 전체 법인 조회
 */
export const useGetJobGroups = (params?: JobGroupsReq) => {
  return useQuery({
    queryKey: ['getJobGroups', , params],
    queryFn: () => getJobGroups(params),
  });
};

export const useGetJobSeries = (params?: JobSeriesReq) => {
  return useQuery({
    queryKey: ['getJobSeries', params],
    queryFn: () => getJobSeries(params),
  });
};

export const useJobPostingsQueryKey = 'getInfiniteJobPostings';
export const useGetInfiniteJobPostings = (
  params: JobPostingsReq,
  option?: UseInfiniteQueryOptions<
    JobPostingsRes,
    ServerError,
    JobPostingsRes,
    JobPostingsRes,
    (string | JobPostingsReq | boolean | BooleanYN | null)[]
  >
) => {
  return useInfiniteQuery({
    ...option,
    queryKey: [useJobPostingsQueryKey, params, params.intensiveRecruiting],
    queryFn: ({ pageParam = 0 }) =>
      getJobPostings({
        ...filterNonEmptyValues(params),
        ...(params.intensiveRecruiting ? { intensiveRecruiting: booleanToYN(params.intensiveRecruiting) } : {}),
        page: pageParam,
        size: pageLimit,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.paging.page >= maxPageNumber(Number(lastPage.paging.totalSize))) return;
      return lastPage.paging.page + 1;
    },
    retry: false,
    keepPreviousData: true,
  });
};

export const useJobPostingsRecommendQueryKey = 'getJobPostingsRecommend';
export const useJobPostingsRecommend = (jobPostingId: string, options?: Record<string, unknown>) => {
  return useInfiniteQuery({
    queryKey: [useJobPostingsRecommendQueryKey, jobPostingId],
    queryFn: ({ pageParam = 0 }) => getJobPostingsRecommend({ jobPostingId, page: pageParam, size: pageLimit }),
    getNextPageParam: (lastPage) => {
      if (lastPage.paging.page >= maxPageNumber(Number(lastPage.paging.totalSize))) return undefined;
      return lastPage.paging.page + 1;
    },
    ...options,
  });
};

export const useJobContentsItemQueryKey = 'getJobContentsItem';
export const useJobContentsItem = (
  jobPostingId?: string,
  options?: UseQueryOptions<JobPostingRes, ServerError, JobPostingRes, QueryKey>
) => {
  return useQuery<JobPostingRes, ServerError>({
    queryKey: [useJobContentsItemQueryKey, jobPostingId],
    queryFn: () => getJobContentsItem(jobPostingId),
    enabled: !!jobPostingId,
    ...options,
  });
};

export const useMappedJobs = (jobPostingId: string) => {
  return useQuery({
    queryKey: ['mapped-jobs', jobPostingId],
    queryFn: () => getMappedJobs(jobPostingId),
    ...lazyUseQueryOption(),
  });
};

export const useJobPostingSelfIntros = ({
  jobPostingId,
  jobId,
  ...rest
}: JobPostingSelfIntrosReq &
  Omit<
    UseQueryOptions<JobPostingSelfIntrosRes, unknown, JobPostingSelfIntrosRes, (string | undefined)[]>,
    'initialData'
  >) => {
  return useQuery({
    queryKey: ['job-posting-self-intros', jobPostingId, jobId],
    queryFn: () => getJobPostingSelfIntros({ jobPostingId, jobId: jobId }),
    enabled: [jobPostingId, jobId].every((it) => !isNil(it) && !isEmpty(it)),
    ...rest,
  });
};

export const useApplicationItems = (
  jobPostingId?: string,
  opt?: Omit<UseQueryOptions<ApplicationItemRes, unknown, ApplicationItemRes, (string | undefined)[]>, 'initialData'>
) => {
  return useQuery({
    queryKey: ['application-items', jobPostingId],
    queryFn: () => getApplicationItems(jobPostingId),
    enabled: !isNil(jobPostingId) && !isEmpty(jobPostingId) && isString(jobPostingId),
    ...lazyUseQueryOption(opt),
  });
};

export const useUpdateBookmark = (opt?: UseMutationOptions<UpdateBookmarkRes, ServerError, BookmarkReq>) => {
  const { open } = useSimpleErrorPopup({ errorKey: SimpleErrorKey.OOPS });

  return useMutation<UpdateBookmarkRes, ServerError, BookmarkReq>({
    mutationFn: refreshAccessTokenWrapper((body: BookmarkReq) => updateBookmark(body)),
    onError: open,
    ...opt,
  });
};

export const useDeleteBookmark = (opt?: UseMutationOptions<UpdateBookmarkRes, ServerError, string>) => {
  const { open } = useSimpleErrorPopup({ errorKey: SimpleErrorKey.OOPS });

  return useMutation<UpdateBookmarkRes, ServerError, string>({
    mutationFn: refreshAccessTokenWrapper((bookmarkId: string) => deleteBookmark(bookmarkId)),
    onError: open,
    ...opt,
  });
};
