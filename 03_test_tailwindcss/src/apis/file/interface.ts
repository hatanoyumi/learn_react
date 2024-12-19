import type { APIResponse } from '../utils';

export type UploadFileReq = {
  fileGroupId?: string;
  file?: FormData;
};

export type UploadFileRes = APIResponse<{
  fileGroupId: string;
  fileId: string;
}>;

export type FileUploadPolicyReq = {
  param: PolicyEnum;
};

export type FileUploadPolicyRes = APIResponse<{
  maxSize: number; // MB
  extensions: string; // jpg, png, ...확장자 목록 혹은 all(*)
}>;

export type DeleteFileReq = {
  fileGroupId: string;
  fileId: string;
};

export type Files = {
  id: string | null;
  name: string;
  size: number | null; // MB
};

export type CustomUploadedFile = {
  id?: string | null;
  files: Files[] | null | undefined;
};

export const FilePolicy = {
  voc: 'voc',
  portfolio: 'portfolio',
  careerDetail: 'career-detail',
  applicationMessage: 'application-message',
  applicationTreatmentMessage: 'application-treatment-message',
  joiningPhoto: 'joining-photo',
  interview: 'interview',
} as const;

export type PolicyEnum = (typeof FilePolicy)[keyof typeof FilePolicy];
