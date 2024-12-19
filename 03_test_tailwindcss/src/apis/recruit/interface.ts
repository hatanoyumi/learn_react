import type { Application, ContentsTypeEnum, TitleTypeEnum } from '../application';
import type { Code } from '../code';
import type { APIResponse, BooleanYN } from '../utils';

export type CorporationJobPostingCount = {
  id: string;
  name: string;
  orderNo: number;
  useYn: BooleanYN;
  count: number;
};

export type CorporationJobPostingCountRes = APIResponse<{
  corporationCountingDataList: CorporationJobPostingCount[];
}>;

export type JobGroupsReq = {
  corporationId?: string;
};

export type JobGroup = {
  id: string;
  name: string;
  count: number;
  orderNo?: number;
  useYn?: BooleanYN;
  hashtag?: string;
};

export type JobGroupRes = APIResponse<JobGroup[]>;

export type JobSeriesReq = {
  jobGroupId?: string | null;
  corporationId?: string | null;
};

export type JobSeries = {
  id: string;
  name: string;
  jobGroup: Omit<JobGroup, 'count'>;
  orderNo?: number;
  useYn?: BooleanYN;
  hashtag?: string;
};

export type JobSeriesRes = APIResponse<JobSeries[]>;

export type CorporationsRes = APIResponse<Corporation[]>;

export type JobPostingsReq = {
  intensiveRecruiting: boolean | BooleanYN | null;
  keyword: string;
  jobSeriesId: string[];
  jobGroupId: string[];
  corporationId: string[];
  careerTypeCds: string[];
  employeeTypeCds: string[];
};

export type JobContentsItem = {
  contents?: string[];
  contentsTypeEnum: ContentsTypeEnum;
  footer: string;
  id: string;
  jobPostingId: string;
  orderNo: number;
  title: string;
  titleTypeEnum: TitleTypeEnum;
};

export type Corporation = {
  id: string;
  name: string;
  orderNo: number;
  useYn: BooleanYN;
  hashtag: string | null;
  assetUseYn: BooleanYN | null;
  cellNoUseYn: BooleanYN | null;
  paycoidUseYn: BooleanYN | null;
  emailDomain: string | null;
  logoStorageFilePath: string | null;
  cd: string;
  regionCd: string;
  corporationPageUseYn: BooleanYN;
};

export type JobPosting = {
  id: string;
  corporation: Corporation;
  name: string;
  finishYn: BooleanYN;
  postingYn: BooleanYN;
  postingStaDatetime: string | null;
  postingEndDatetime: string | null;
  careerType: Code;
  employeeType: Code;
  applicationUseYn: BooleanYN | boolean | null;
  hashtag?: string;
  intensiveRecruitingOrderNo: number | null;
  bookmarkId?: string;
  application: Application | null;
  jobSeries: JobSeries[];
  jobPostingContentsItems?: JobContentsItem[];
  introduction: string | null;
  outerApplicationUrl: string | null;
};

export type SelfIntroPool = {
  id: string;
  sysCompanyCd: Code | null;
  name: string | null;
  maxLength: number | null;
  orderNo: number | null;
};

export type JobPostingSelfIntros = {
  selfIntroPool: SelfIntroPool | null;
  requiredYn: BooleanYN | null;
  maxLength: number | null;
  guideJson: string[] | null;
  orderNo: number | null;
};

export type JobPostingSelfIntrosReq = {
  jobPostingId?: string;
  jobId?: string;
};

export type JobPostingSelfIntrosRes = APIResponse<JobPostingSelfIntros[]>;

export type JobPostingsRes = APIResponse<JobPosting[], true>;
export type JobPostingRes = APIResponse<JobPosting>;

export type MappedJob = {
  jobGroupId: string;
  jobGroupName: string;
  jobSeriesId: string;
  jobSeriesName: string;
  jobId: string;
  jobName: string;
  orderNo: number;
};
export type MappedJobsRes = APIResponse<MappedJob[]>;

export const EtcItem = {
  SCHOLARSHIP_GRADE_INPUT_YN: 'SCHOLARSHIP_GRADE_INPUT_YN',
} as const;
export type EtcItemEnum = keyof typeof EtcItem;

export type ApplicationItem = {
  id: string;
  jobPostingId: string;
  resumeItemEnum: ResumeItemEnum;
  useYn: BooleanYN;
  requiredYn: BooleanYN;
  orderNo: number;
  etc: {
    etcItemEnum: EtcItemEnum;
    etcItemValue: BooleanYN;
  }[];
};
export type ApplicationItemRes = APIResponse<ApplicationItem[]>;

export const ResumeItem = {
  SCHOLARSHIP: 'SCHOLARSHIP',
  MILITARY: 'MILITARY',
  PATRIOTnDISABILITY: 'PATRIOTnDISABILITY',
  CAREER: 'CAREER',
  PORTFOLIO: 'PORTFOLIO',
  SKILL: 'SKILL',
  LICENSE: 'LICENSE',
  LANGUAGE: 'LANGUAGE',
  PRIZE: 'PRIZE',
  VOLUNTEER: 'VOLUNTEER',
  SELFINTRO: 'SELFINTRO',
} as const;

export type ResumeItemEnum = keyof typeof ResumeItem;

export type BookmarkType = {
  id: string;
  applicantId: string;
  jobPosting: JobPosting;
};

export type BookmarkRes = APIResponse<BookmarkType[]>;

export type UpdateBookmarkRes = APIResponse<{ id: string }>;

export type BookmarkReq = {
  jobPostingId: string;
};

export type LastPageScrollYType = {
  y: number;
};
