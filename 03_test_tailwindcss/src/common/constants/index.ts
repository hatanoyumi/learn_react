import { curry } from 'lodash';
import { isMobile } from 'react-device-detect';
import type { VITE_STAGE } from 'types/stage';

export const Corps = {
  PLAYART: 'PLAYART',
  TECHORUS: 'TECHORUS',
  COMICO: 'COMICO',
  STUDIO_COMICO: 'STUDIO_COMICO',
  JAPAN: 'JAPAN',
  FUKUOKA: 'FUKUOKA',
  CLOUD: 'CLOUD',
} as const;
export type CorpsType = (typeof Corps)[keyof typeof Corps];

export const CorpSiteUrls = {
  [Corps.JAPAN]: 'https://www.nhn-japan.com/',
  [Corps.PLAYART]: 'https://www.nhn-playart.com/',
  [Corps.TECHORUS]: 'https://nhn-techorus.com/',
  [Corps.COMICO]: 'https://www.nhn-comico.com/',
  [Corps.STUDIO_COMICO]: 'https://www.nhn-studio-comico.com/',
  [Corps.FUKUOKA]: 'https://www.nhn-fukuoka.com/',
  [Corps.CLOUD]: 'https://www.nhncloud.com/jp',
} as const;

export const TechorusBlogUrl = 'https://techblog.nhn-techorus.com/';

export const CURRENT_DEVICE = isMobile ? 'MOBILE' : 'DESKTOP';
export const getRecruitDetailRoute = curry((corp: CorpsType | null, jobPostingId: string | null) => {
  switch (corp) {
    case Corps.JAPAN:
      return route.recruit.detail.japan(jobPostingId);
    case Corps.PLAYART:
      return route.recruit.detail.playart(jobPostingId);
    case Corps.TECHORUS:
      return route.recruit.detail.techorus(jobPostingId);
    case Corps.COMICO:
      return route.recruit.detail.comico(jobPostingId);
    case Corps.STUDIO_COMICO:
      return route.recruit.detail.studioComico(jobPostingId);
    case Corps.FUKUOKA:
      return route.recruit.detail.fukuoka(jobPostingId);
    case Corps.CLOUD:
      return route.recruit.detail.cloud(jobPostingId);
    default:
      return route.recruit.detail.main(jobPostingId);
  }
});

export const route = {
  home: '/',

  corps: {
    japan: '/japan',
    playart: '/playart',
    techorus: '/techorus',
    comico: '/comico',
    studioComico: '/studio-comico',
    fukuoka: '/fukuoka',
    cloud: '/cloud',
  },

  faq: '/faq',
  notice: '/notice',
  guide: '/guide',
  info: '/info',

  recruit: {
    list: {
      main: '/recruits',
      japan: '/recruits/japan',
      playart: '/recruits/playart',
      techorus: '/recruits/techorus',
      comico: '/recruits/comico',
      studioComico: '/recruits/studio-comico',
      fukuoka: '/recruits/fukuoka',
      cloud: '/recruits/cloud',
    },

    detail: {
      main: (jobPostingId: string | null = ':jobPostingId') => `/recruits/${jobPostingId}`,
      japan: (jobPostingId: string | null = ':jobPostingId') => `/recruits/japan/${jobPostingId}`,
      playart: (jobPostingId: string | null = ':jobPostingId') => `/recruits/playart/${jobPostingId}`,
      techorus: (jobPostingId: string | null = ':jobPostingId') => `/recruits/techorus/${jobPostingId}`,
      comico: (jobPostingId: string | null = ':jobPostingId') => `/recruits/comico/${jobPostingId}`,
      studioComico: (jobPostingId: string | null = ':jobPostingId') => `/recruits/studio-comico/${jobPostingId}`,
      fukuoka: (jobPostingId: string | null = ':jobPostingId') => `/recruits/fukuoka/${jobPostingId}`,
      cloud: (jobPostingId: string | null = ':jobPostingId') => `/recruits/cloud/${jobPostingId}`,
    },
  },

  notFound: '/oops',

  previewWithId: (jobPostingId: string | number | null = ':jobPostingId') => `/preview/${jobPostingId}`,

  healthCheck: '/monitor/l7check',
} as const;

export const recruitPathnamePerCorp = {
  [Corps.JAPAN]: route.recruit.list.japan,
  [Corps.PLAYART]: route.recruit.list.playart,
  [Corps.TECHORUS]: route.recruit.list.techorus,
  [Corps.COMICO]: route.recruit.list.comico,
  [Corps.STUDIO_COMICO]: route.recruit.list.studioComico,
  [Corps.CLOUD]: route.recruit.list.cloud,
  [Corps.FUKUOKA]: route.recruit.list.fukuoka,
} as const;

export const FAQ_ALL_CODE = 'FAQ_ALL';

export const CORPORATION_CODES = {
  [Corps.JAPAN]: 'JP01',
  [Corps.PLAYART]: 'JP02',
  [Corps.TECHORUS]: 'JP03',
  [Corps.COMICO]: 'JP04',
  [Corps.STUDIO_COMICO]: 'JP05',
  [Corps.CLOUD]: 'JP06',
  [Corps.FUKUOKA]: 'JP07',
} as const;

export const JOB_GROUP_CODES = {
  tech: '10000001',
  business: '10000002',
  design: '10000003',
  corporate: '10000004',
} as const;

export const JobGroupsPerCorp = {
  [Corps.JAPAN]: [JOB_GROUP_CODES.tech, JOB_GROUP_CODES.design, JOB_GROUP_CODES.corporate],
  [Corps.PLAYART]: [JOB_GROUP_CODES.tech, JOB_GROUP_CODES.business, JOB_GROUP_CODES.design],
  [Corps.TECHORUS]: [JOB_GROUP_CODES.tech, JOB_GROUP_CODES.business, JOB_GROUP_CODES.corporate],
  [Corps.COMICO]: [JOB_GROUP_CODES.tech, JOB_GROUP_CODES.business, JOB_GROUP_CODES.design],
  [Corps.STUDIO_COMICO]: [JOB_GROUP_CODES.business],
  [Corps.CLOUD]: [JOB_GROUP_CODES.tech, JOB_GROUP_CODES.business],
  [Corps.FUKUOKA]: [JOB_GROUP_CODES.tech, JOB_GROUP_CODES.business, JOB_GROUP_CODES.corporate],
} satisfies Record<CorpsType, string[]>;

export const HEADER_HEIGHT = isMobile ? 64 : 88;

export const getStage = (): VITE_STAGE | string => import.meta.env.VITE_STAGE ?? '';

export const COUNTRY_DATA = [];

export const pageLimit = 30;

export const TokyoOfficeGoogleMap = 'https://maps.app.goo.gl/CrNvHmL8oEFPjZEf8';
export const FukuokaOfficeGoogleMap = 'https://maps.app.goo.gl/juPn7fFvzxatVpSi6';

export const CorpsImageObject = {
  [Corps.JAPAN]: '/images/objects/corps/japan.png',
  [Corps.PLAYART]: '/images/objects/corps/playart.png',
  [Corps.TECHORUS]: '/images/objects/corps/techorus.png',
  [Corps.COMICO]: '/images/objects/corps/comico.png',
  [Corps.STUDIO_COMICO]: '/images/objects/corps/studio_comico.png',
  [Corps.FUKUOKA]: '/images/objects/corps/fukuoka.png',
  [Corps.CLOUD]: '/images/objects/corps/cloud.png',
} as const;

export const CorpNameObject = {
  [Corps.JAPAN]: 'NHN JAPAN',
  [Corps.PLAYART]: 'NHN PlayArt',
  [Corps.TECHORUS]: 'NHN Techorus',
  [Corps.COMICO]: 'NHN comico',
  [Corps.STUDIO_COMICO]: 'NHN Studio comico',
  [Corps.FUKUOKA]: 'NHN Fukuoka',
  [Corps.CLOUD]: 'NHN Cloud Japan',
};

export const CorpDescObject = {
  [Corps.JAPAN]: '当社グループ各社の事業戦略支援・管理を行っています。',
  [Corps.PLAYART]:
    ' 「LINE：ディズニー   ツムツム」や「妖怪ウォッチ ぷにぷに」など人気のスマートフォン向けゲームの開発・運営をしています。',
  [Corps.TECHORUS]: 'NHNグループにおけるBtoBビジネスの中核企業としてITインフラ・ソリューション事業を展開しています。',
  [Corps.COMICO]:
    'エンターテイメントプラットフォーム「comico」を運営し、多彩なオリジナルマンガと外部IP作品を掲載しています。',
  [Corps.STUDIO_COMICO]:
    'comicoのWEBTOON制作ノウハウを引き継ぎ、作家1人制作から分業制作まで対応するWEBTOONスタジオです。',
  [Corps.FUKUOKA]:
    '「デジタルマンガ運営支援」 「ゲーム・ノベル翻訳」「QA・カスタマーサポート」等、スマートフォンアプリやゲーム、Webサービスなどの運営事業を中心に展開しています。',
  [Corps.CLOUD]:
    'データセンター設備からSoftwareに至るまで、Full   Stackの独自運営技術力により、低コスト/高効率のクラウドサービスを提供しています。',
};

export const PAINT_LOAD_TIME = 40;
