import type { APIResponse } from '../utils';

export const DisplayStepButtonCd = {
  write: 'write', // '작성하기'
  applicationCompleted: 'application-completed', // 지원 완료 (지원서)
  submit: 'submit', // '제출하기'
  submitComplete: 'submit-complete', // '제출완료' (과제)
  informationCheck: 'information-check', // '안내확인'
  delayNotice: 'delay-notice', // '지연안내'
  resultCheck: 'result-check', // '결과확인'
  stepEndNotice: 'step-end-notice', // '전형종료안내'
  employmentInformationInput: 'employment-information-input', // '입사정보입력'
  employmentInformationInputComplete: 'employment-information-input-complete', // 입사정보입력 제출완료
  welcome: 'welcome', // 'Welcome'
} as const;

type DisplayStepButtonCdKeys = keyof typeof DisplayStepButtonCd;
export type DisplayStepButtonCdType = Partial<(typeof DisplayStepButtonCd)[DisplayStepButtonCdKeys]>;

export const StepButtonTextMap = {
  [DisplayStepButtonCd.write]: '작성하기',
  [DisplayStepButtonCd.submit]: '제출하기',
  [DisplayStepButtonCd.applicationCompleted]: '지원완료',
  [DisplayStepButtonCd.submitComplete]: '제출완료',
  [DisplayStepButtonCd.informationCheck]: '안내확인',
  [DisplayStepButtonCd.delayNotice]: '지연안내',
  [DisplayStepButtonCd.resultCheck]: '결과확인',
  [DisplayStepButtonCd.stepEndNotice]: '전형종료안내',
  [DisplayStepButtonCd.employmentInformationInput]: '입사정보입력',
  [DisplayStepButtonCd.employmentInformationInputComplete]: '제출완료',
  [DisplayStepButtonCd.welcome]: 'Welcome',
} as const;

export type JoiningsReq = {
  applicationId: string | undefined;
  empNmEngFirst: string;
  empNmEngLast: string;
  ctzNo: string;
  cellModel: string;
  cellMaker: string;
  cellCarrier: string;
  cellOs: string;
  tmoneyCardNo: string;
  inEmail: string;
  photoFileGroupId: string | undefined;
  paycoId: string;
  assets: Asset[];
  photoFileGroup?: { fileGroupId: string; fileId: string; fileName: string; size: number | null };
};

export type Joining = {
  neonClassId: string;
  neonProductNm: string;
  neonProductInfoSeq: string;
  manufacturing: string;
};

export type Asset = {
  neonClassId: string;
  neonProductNm: string;
  neonProductInfoSeq: string;
  manufacturing: string;
};

export type AssetsRes = APIResponse<Asset[]>;

export type JoiningsRes = APIResponse<Joining[]>;
