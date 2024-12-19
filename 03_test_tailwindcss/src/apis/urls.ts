export const apiPrefix = {
  notices: '/v1/notices',
  links: '/v1/links',
  job: {
    jobSeries: '/v1/job-series',
    groupsSummary: '/v1/job-groups/summary',
    posting: '/v1/job-postings',
  },
  faqs: '/v1/faqs',
  corporations: '/v1/corporations',
  corporationJobPostingCount: '/v1/corporations/summary',
  codes: '/v1/codes',

  healthCheck: '/monitor/l7check',

  // 이하 사용 안 함
  signUp: '/api/applicant/sign-up/v1',
  accounts: '/v1/accounts',
  identityVerifications: '/v1/identity-verifications',
  resumes: '/v1/resumes',
  autosave: '/v1/resume-autosaves',
  applications: '/v1/applications',
  applicants: '/v1/applicants/me',
  files: {
    policies: '/v1/file-upload-policies',
    upload: {
      voc: '/v1/vocs/file-upload',
      portfolio: '/v1/portfolios/file-upload',
      careerDetail: '/v1/career-details/file-upload',
      joiningPhotos: '/v1/joining-photos/file-upload',
      applicationMessages: '/v1/application-messages/file-upload',
      applicationTreatmentMessages: '/v1/application-treatment-messages/file-upload',
    },
    groups: '/v1/file-groups',
  },
  bookmarks: '/v1/bookmarks',
  vocs: '/v1/vocs',
  joinings: '/v1/joinings',
  privacyPolicy: '/v1/privacy-policies/last',
  messagePreview: '/v1/message-preparing-mypages',
} as const;

export const getNasUrl = (url?: string) => `/nstatic/${url}`;

export const getURIByPrefix =
  (prefix: string) =>
  (postFix = '') =>
    `${prefix}${postFix}`;
