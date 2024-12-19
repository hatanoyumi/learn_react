import { filterNonEmptyValues } from '@src/utils';
import { omit } from 'lodash';

import { apiClient } from '../axios';
import { apiPrefix, getURIByPrefix } from '../urls';
import type { Pageable } from '../utils';

import type {
  ApplicationItemRes,
  BookmarkReq,
  BookmarkRes,
  CorporationJobPostingCountRes,
  CorporationsRes,
  JobGroupRes,
  JobGroupsReq,
  JobPostingRes,
  JobPostingSelfIntrosReq,
  JobPostingSelfIntrosRes,
  JobPostingsReq,
  JobPostingsRes,
  JobSeriesReq,
  JobSeriesRes,
  MappedJobsRes,
  UpdateBookmarkRes,
} from './interface';

const getJobPostingURL = getURIByPrefix(apiPrefix.job.posting);

// 법인별 공고 집계
export const getCorporationJobPostingCount = async () => {
  const res = await apiClient.get<CorporationJobPostingCountRes>(apiPrefix.corporationJobPostingCount, {
    params: {
      type: 'count-of-job-posting',
    },
  });
  return res.data;
};

// 부문별 공고 집계
export const getJobGroups = async (params?: JobGroupsReq) => {
  const res = await apiClient.get<JobGroupRes>(apiPrefix.job.groupsSummary, {
    params: {
      type: 'count-of-job-posting',
      ...filterNonEmptyValues({ corporationId: params?.corporationId }),
    },
  });
  return res.data;
};

// 직렬 목록
export const getJobSeries = async (params?: JobSeriesReq) => {
  const res = await apiClient.get<JobSeriesRes>(apiPrefix.job.jobSeries, {
    params: filterNonEmptyValues({ jobGroupId: params?.jobGroupId, corporationId: params?.corporationId }),
  });
  return res.data;
};

// 채용 공고
export const getJobPostings = async (params: (JobPostingsReq & Pageable) | undefined) => {
  const res = await apiClient.get<JobPostingsRes>(getJobPostingURL(), {
    params: filterNonEmptyValues({
      ...omit(params, 'intensiveRecruiting'),
      'intensive-recruiting': params?.intensiveRecruiting,
    }),
  });
  return res.data;
};

// 채용 공고 - 추천
export const getJobPostingsRecommend = async (params: ({ jobPostingId: string } & Pageable) | undefined) => {
  const res = await apiClient.get<JobPostingsRes>(getJobPostingURL('/recommend'), {
    params,
  });
  return res.data;
};

// 채용 공고 - 자기소개서 문항
export const getJobPostingSelfIntros = async (params: JobPostingSelfIntrosReq) => {
  const res = await apiClient.get<JobPostingSelfIntrosRes>(getJobPostingURL(`/${params.jobPostingId}/selfintros`), {
    params: { jobId: params.jobId },
  });
  return res.data;
};

// 회사 조회
export const getCorporations = async () => {
  const res = await apiClient.get<CorporationsRes>(apiPrefix.corporations);
  return res.data;
};

export const getJobContentsItem = async (jobPostingId?: string) => {
  const res = await apiClient.get<JobPostingRes>(`${apiPrefix.job.posting}/${jobPostingId}`);
  return res.data;
};

export const getMappedJobs = async (jobPostingId: string) => {
  const res = await apiClient.get<MappedJobsRes>(getJobPostingURL(`/${jobPostingId}/mapped-jobs`));
  return res.data;
};

export const getApplicationItems = async (jobPostingId?: string) => {
  const res = await apiClient.get<ApplicationItemRes>(getJobPostingURL(`/${jobPostingId}/application-items`));
  return res.data;
};

// 북마크
export const getBookmarks = async () => {
  const res = await apiClient.get<BookmarkRes>(apiPrefix.bookmarks);
  return res.data;
};

// 북마크 등록
export const updateBookmark = async (body: BookmarkReq) => {
  const res = await apiClient.post<UpdateBookmarkRes>(apiPrefix.bookmarks, body);
  return res.data;
};

// 북마크 삭제
export const deleteBookmark = async (bookmarkId: string) => {
  const res = await apiClient.delete<UpdateBookmarkRes>(`${apiPrefix.bookmarks}/${bookmarkId}`);
  return res.data;
};
