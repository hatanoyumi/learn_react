import type { APIResponse, BooleanYN } from '../utils';

export type CreateResumeReq = {
  usePiAgreeYn: boolean | BooleanYN | null /* 개인정보 사용 동의*/;
  registerPoolPiAgreeYn: boolean | BooleanYN | null /* 인재풀 등록 동의 */;
};

export type CreateResumeRes = APIResponse<{
  id: string; // resumeId
}>;

export type ApplicationResumeReq = {
  resumeId: string;
};

export type BasicResumeUpdate = {
  updateYn: boolean | BooleanYN | null /* 기본 지원서로 사용 여부 */;
  usePiAgreeYn: boolean | BooleanYN | null /* 개인정보 수집 이용 동의 */;
  registerPoolPiAgreeYn: boolean | BooleanYN | null /* 개인정보 제 3자 제공 동의 */;
  useSiAgreeYn: boolean | BooleanYN | null /* 민감정보 수집 이용 동의 */;
  registerPoolSiAgreeYn: boolean | BooleanYN | null /* 민감정보 제3자 제공 동의 */;
  // siAgreeYnUpdated: boolean | BooleanYN | null /* */;
};

export type Resume = {
  id: string | null;

  usePiAgreeYn: boolean | BooleanYN | null /* 개인정보수집및이용동의여부 */;
  providePiAgreeYn: boolean | BooleanYN | null /* 개인정보제3자제공동의여부 */;
  registerPoolPiAgreeYn: boolean | BooleanYN | null /* 개인정보인재풀등록동의여부 */;
  copiedBasicResumeYn: boolean | BooleanYN | null /* 기본 지원서 볼러오기 여부 */;

  noCareerYn: boolean | BooleanYN | null /* 경력없음 여부 */;
  scholarships: Scholarship[] | null /*학력*/;
  military: Military | null /*병역*/;
  patriot: Patriot | null /*보훈*/;
  disability: Disability | null /*장애*/;
  careers: Career[] | null /*경력*/;
  portfolios: Portfolio[] | null /*포트폴리오*/;
  skills: Skill[] | null /*스킬*/;
  licenses: License[] | null /*자격*/;
  languages: Language[] | null /*어학*/;
  prizes: Prize[] | null /*수상*/;
  volunteerWorks: VolunteerWork[] | null /*봉사*/;
  selfIntros: SelfIntroduction[] | null /*자기소개서*/;

  basicResumeUpdate: BasicResumeUpdate /* 기본 지원서 사용 저장 */;
};

export type Application = {
  id: string;
  applicantId: string;
  jobPostingId: string;
  jobId: string;
  applicationPathCd: Code;
  applicationPathDetail: string;
  resume: Resume;
  resumeId: string;
  finalSubmitYn: BooleanYN | null;
  finalSubmitDatetime: string;
  displayStepName: string;
  displayStepButtonCd: Code;
};

export type ApplicationForResume = {
  id: string;
  jobPosting: { id: string; name: string };
  job: { id: string; name: string };
  jobSeries: { id: string; name: string };
  jobGroup: { id: string; name: string };
  finalSubmitYn?: BooleanYN | boolean | null;
};

export type ApplicationResumeRes = APIResponse<ApplicationResume>;

export type ApplicationResume = Resume & {
  application: ApplicationForResume | null;
};

export type AutosaveResumeRes = APIResponse<ApplicationResume>;

export type CheckAutoSaveRes = APIResponse<{
  autosaveYn: boolean | BooleanYN | null;
  modifiedAt: string;
}>;

type Code = {
  cd: string;
  cdKind: string;
  name: string;
  orderNo: number;
  useYn: boolean | BooleanYN | null;
};

export type Scholarship = {
  id: string | null;
  scholarType: Code | null; // code학력구분
  schoolCd: string | null; // ex) A001
  schoolName: string | null;
  location: Code | null; // code | null;
  admissionYmd: string | null; // yyyymmdd;
  graduationYmd: string | null; // yyyymmdd;
  admissionType: Code | null; // code 입학구분 코드
  graduationType: Code | null; // code 졸업구분 코드
  majorName: string | null;
  minorName: string | null;
  grade?: number | null;
  totalGrade?: number | null;
  researchContents: string | null;
  nightYn?: boolean | BooleanYN | null;
};

export type Military = {
  id: string | null;
  militaryService: Code; // code;
  serviceStaYmd: string | null; // yyyymmdd;
  serviceEndYmd: string | null; // yyyymmdd;
  exemptionReason: string | null;
};

export type Patriot = {
  id: string | null;
  patriotYn: boolean | BooleanYN | null;
  patriotNo: string | null;
};

export type Disability = {
  id: string | null;
  disabilityType: Code | null;
  disabilityNo: string | null;
  disability: Code | null; // code;
  heavy: Code | null; // code;
  useSiAgreeYn: boolean | BooleanYN | null;
  provideSiAgreeYn: boolean | BooleanYN | null /* 민감정보인재풀제3자제공동의여부 */;
  registerPoolSiAgreeYn: boolean | BooleanYN | null;
};

export type Career = {
  id: string | null;
  enterYmd: string | null; // yyyymmdd;
  retireYmd: string | null; // yyyymmdd;
  corporationCd: string | null; // 회사 코드;
  corporationName: string | null;
  departmentName: string | null;
  employeeType: Code; // code;
  careerDetails: CareerDetail[] | null;
};

export type CareerDetail = {
  id: string | null;
  projectName: string | null;
  staYmd: string | null; // yyyymmdd;
  endYmd: string | null; // yyyymmdd;
  projectDetail: string | null;
  fileGroup: FileGroup | null;
};

export type FileGroup = {
  id: string | null;
  files: CustomFile[] | null;
};

export type CustomFile = {
  id: string | null;
  contentType: string | null;
  name: string;
  size: number | null; // MB
};

export type Portfolio = {
  id: string | null;
  url?: string | null;
  fileGroup?: FileGroup | null;
};

export type Skill = {
  id: string | null;
  skillName: string | null;
  usagePeriod: Code | null; // code;
  capability: Code | null; // code;
  skillDetail: string | null;
};

export type License = {
  id: string | null;
  licenseCd: string | null; // 라이센스 코드;
  licenseName: string | null;
  grade: string | null; // 등급 / 점수
  acquireYmd: string | null; // yyyymmdd;
  issuer: string | null;
};

export type Language = {
  id: string | null;
  language: Code | null; // code;
  testCd: string | null;
  testName: string | null;
  grade: string | null;
  testYmd: string | null; // yyyymmdd;
  organization: string | null;
};

export type Prize = {
  id: string | null;
  competitionName: string | null;
  prizeName: string | null;
  prizeYmd: string | null; // yyyymmdd;
  organization: string | null;
  competitionDetail: string | null;
};

export type VolunteerWork = {
  id: string | null;
  organization: string | null;
  staYmd: string | null; // yyyymmdd;
  endYmd: string | null; // yyyymmdd;
  workPeriod: string | null;
  workDetail: string | null;
};

export type SelfIntroduction = {
  id: string | null;
  contents: string | null /*자기소개서 내용*/;
  selfIntroPool: SelfIntroPool | null /*자기소개서 풀*/;
  orderNo?: number | null /*자기소개서 내 순서*/;
};

export type SelfIntroPool = {
  id: string | null;
  sysCompanyCd?: string | null /*시스템 내 법인 코드 ex) NE*/;
  name?: string | null /*자기소개 질문 문항*/;
  maxLength?: number | null /*자기소개 최대 글자수*/;
  orderNo?: number | null /*자기소개 질문 문항 순서*/;
};

export type ApplicationSaveReq = ApplicationAutoSaveReq & {
  finalSubmitYn: boolean | BooleanYN | null /*최종제출여부*/;
};

export type ApplicationAutoSaveReq = {
  application: Partial<ApplicationForResume> | null;
  scholarships: PartialID<Scholarship>[] | null /*학력*/;
  military: PartialID<Military> | null /*병역*/;
  patriot: PartialID<Patriot> | null /*보훈*/;
  disability: PartialID<Disability> | null /*장애*/;
  careers: PartialID<PartialCareer>[] | null /*경력*/;
  portfolios: PartialID<Portfolio>[] | null /*포트폴리오*/;
  skills: PartialID<Skill>[] | null /*스킬*/;
  licenses: PartialID<License>[] | null /*자격*/;
  languages: PartialID<Language>[] | null /*어학*/;
  prizes: PartialID<Prize>[] | null /*수상*/;
  volunteerWorks: PartialID<VolunteerWork>[] | null /*봉사*/;
  selfIntros: PartialID<SelfIntroduction>[] | null /*자기소개서*/;
  noCareerYn: BooleanYN | null;
  copiedBasicResumeYn: BooleanYN | null;
  usePiAgreeYn: boolean | BooleanYN | null /* 개인정보수집및이용동의여부 */;
  providePiAgreeYn: boolean | BooleanYN | null /* 개인정보제3자제공동의여부 */;
  registerPoolPiAgreeYn: boolean | BooleanYN | null /* 개인정보인재풀등록동의여부 */;

  basicResumeUpdate: BasicResumeUpdate /* 기본 지원서 사용 저장 */;
};

export type ApplicationSaveRes = null;

// 아직 한번도 저장하지 않은 데이터의 경우, ID 가 없을 수 있음
export type PartialID<T> = Omit<T, 'id'> & { id: string | undefined | null };

export type PartialCareerDetail = PartialID<CareerDetail>;
export type PartialCareer = Omit<PartialID<Career>, 'careerDetails'> &
  Partial<{ careerDetails: PartialID<PartialCareerDetail>[] | null }>;

export type CreateNewApplyReq = {
  jobPostingId: string;
  jobId: string;
  applicationPathCd: string; // 지원경로 코드로 변환?
  applicationPathDetail: string | null;
  usePiAgreeYn: boolean | BooleanYN | null;
  providePiAgreeYn: boolean | BooleanYN | null;
  registerPoolPiAgreeYn: boolean | BooleanYN | null;
};

export type CreateNewApplyRes = APIResponse<{
  id: string; // 입사지원서 ID
  resumeId: string; // 이력서 ID
}>;

export const TitleType = {
  H2: 'H2', // 대제목
  H3: 'H3',
  TABLE_HEADER: 'TABLE_HEADER', // 테이블 헤더
  NONE: 'NONE', // 없음
} as const;
export type TitleTypeEnum = keyof typeof TitleType | null;

export const ContentsType = {
  SINGLE: 'SINGLE', // ["..."]
  LIST: 'LIST', // ["...", "...", "...", ...]
  NONE: 'NONE', // 없음
} as const;
export type ContentsTypeEnum = keyof typeof ContentsType | null;

export type ContentsType = {
  titleTypeEnum: TitleTypeEnum;
  title: string;
  contentsTypeEnum: ContentsTypeEnum;
  contents: string[];
  footer: string | null;
  orderNo: string;
  fileGroup: FileGroup | null;
};

export const MyPageMessageType = {
  NONE: 'NONE', // 일반
  REQUEST_TREATMENT_DOC: 'REQUEST_TREATMENT_DOC', // 처우자료 제출요청
  SUGGEST_TREATMENT: 'SUGGEST_TREATMENT', // 처우제안
} as const;
export type MyPageMessageTypeEnum = keyof typeof MyPageMessageType | null;

export const ResponseType = {
  NONE: 'NONE', // 회신 불필요
  ATTACH: 'ATTACH', // 첨부파일 회신
  TEXT: 'TEXT', // text 회신
  ATTACH_TEXT: 'ATTACH_TEXT', // 첨부파일 + text 회신
} as const;
export type ResponseTypeEnum = keyof typeof ResponseType | null;

export type Messages = {
  id: string;
  applicationId: string;
  noticeDatetime: Date;
  responseTypeEnum: ResponseTypeEnum;
  mypageMessageTypeEnum: MyPageMessageTypeEnum;
  contentsItem: ContentsType[];
  response: {
    id: string;
    contents: string;
    responseDatetime: Date;
    finalSubmitYn: BooleanYN | boolean;
    fileGroup: FileGroup | null;
    treatmentResponse: string;
    treatmentResponseFileGroupId: string | null;
    treatmentResponseFileGroup: FileGroup | null;
  };
};

export type MessagesRes = APIResponse<Messages>;

export type CreateMessage = {
  applicationMessageId: string;
  fileGroupId: string;
  contents: string;
  finalSubmitYn: boolean | BooleanYN | null;
  treatmentResponse: string;
  treatmentResponseFileGroupId: string;
  applicationId?: string;
};
