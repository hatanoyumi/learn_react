import type { APIResponse, BooleanYN } from '../utils';

export const CodeKind = {
  careerType: 'career-type',
  employeeType: 'employee-type',
  employeeTypeJP: 'employee-type-JP-jp',
  faqCategory: 'faq-category',
  faqCategoryJP: 'faq-category-jp',
  scholarType: 'scholar-type',
  location: 'location',
  admissionType: 'admission-type',
  graduationType: 'graduation-type',
  militaryService: 'military-service',
  disability: 'disability',
  disabilityStatus: 'disability-type',
  disabilityHeavy: 'disability-heavy',
  skillUsagePeriod: 'skill-usage-period',
  skillCapability: 'skill-capability',
  language: 'language',
  languageTest: 'language-test',
  corporation: 'corporation',
  applicationPath: 'application-path',
  license: 'license',
  vocType: 'voc-type',
  school: 'school',
} as const;
export type CodeKindEnum = (typeof CodeKind)[keyof typeof CodeKind];

export type Code = {
  cd: string;
  cdKind: CodeKindEnum;
  name: string;
  orderNo: number;
  useYn: BooleanYN;
};

export type CodeReq = {
  cdKind: CodeKindEnum;
  useYn?: boolean | BooleanYN | null;
};

export type CodeRes = APIResponse<Code[]>;
