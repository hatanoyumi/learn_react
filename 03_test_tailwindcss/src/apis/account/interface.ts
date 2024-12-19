import type { APIResponse, BooleanYN } from '../utils';

export type SignInReq = {
  email: string;
  password: string;
};

export type SignInRes = APIResponse<{
  name: string;
}>;

export type SignOutRes = APIResponse<null>;

export const NationCode = {
  KR: 'KR',
  OTHERS: 'OTHERS',
} as const;
export type NationCodeType = (typeof NationCode)[keyof typeof NationCode];

export type SignUpReq = {
  name: string;
  email: string;
  cellNo: string | null;
  birthYmd: string;
  password: string;
  nationCd: NationCodeType; // 내외국인 구분 코드
  usePiAgreeYn: BooleanYN;
  identityVerificationId: string; // 회원가입인증 ID
  countryCallingCd: string; // 전화번호 국가 코드
};

export type SignUpRes = APIResponse<{
  id: string; // Applicant ID
  name: string;
}>;

export type SendVerificationEmailReq = {
  email: string;
};

export type SendVerificationEmailRes = APIResponse<{
  id: string; // Identity Verification ID 추후 회원가입 시 필요
}>;

export type VerifyEmailReq = {
  id: string; // Identity Verification ID
  code: string; // 6자리 인증번호
};

export type VerifyEmailRes = APIResponse<null>;

export type FindEmailReq = {
  name: string;
  birthYmd: string; // YYYYMMDD
  cellNo: string;
  countryCallingCd: string; // 전화번호 국가 코드
};

export type FindEmailRes = APIResponse<{ email: string }>;

export type FindPasswordReq = {
  email: string;
  name: string;
};

export type FindPasswordRes = APIResponse<null>;

export type ResetPasswordReq = {
  token: string;
  password: string;
};

export type ResetPasswordRes = APIResponse<null>;

export type RenewAccessToken = APIResponse<{
  accessToken: string;
}>;
