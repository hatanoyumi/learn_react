import type { NationCodeType } from '../account';
import type { DisplayStepButtonCdType } from '../joining';
import type { APIResponse, BooleanYN } from '../utils';

export type GetMeReq = {
  includePrivacyYn: boolean | BooleanYN | null;
};

export type ChangePasswordReq = {
  currentPassword: string;
  renewPassword: string;
  verifyPassword: string;
};

export type ChangePasswordRes = APIResponse<null>;

export type MeReq = {
  name: string;
  cellNo: string;
  birthYmd: string;
  countryCallingCd: string; // 전화번호 국가 코드
  nationCd: NationCodeType;
};

export type DeleteMeReq = {
  password: string;
};

export type MeRes = APIResponse<{
  id: string;
  basicResumeId: string;
  name: string;
  email: string;
  cellNo: string;
  birthYmd: string;
  countryCallingCd: string; // 전화번호 국가 코드
  nationCd: NationCodeType;
}>;

export type ApplicantsJobPosting = {
  corporationName: string;
  jobPostingName: string;
  jobPostingId: string;
  applicationId: string;
  resumeId: string;
  displayStepName: string | null;
  displayStepButtonCd: DisplayStepButtonCdType | null;
  displayStepButtonName: string | null;
  finalSubmitYn: BooleanYN | boolean;
  finishYn: BooleanYN | boolean;
  finalSubmitDatetime: Date;
  jobEndDatetime: Date;
  messageId: string | null;
  messageReadDatetime: null;
  messageResponseDatetime: Date | null;
  assetUseYn: string;
};

export type ApplicantsJobPostingRes = APIResponse<ApplicantsJobPosting[] | undefined>;

export type PrivacyCheckReq = {
  password: string;
};

export type PrivacyInfo = {
  id: string /*지원자ID*/;
  name: string /*이름*/;
  email: string /*이메일*/;
  cellNo: string /*전화번호*/;
  birthYmd: string /* 생년월일 */;
  basicResumeId: string /*기본 지원서id*/;
  countryCallingCd: string; // 전화번호 국가 코드
  nationCd: NationCodeType; // 내외국인 구분
};

export type PrivacyCheckRes = APIResponse<PrivacyInfo>;
