import CorpImage from '@src/components/common/CorpImage';
import BannerLogo from '@src/pages/Recruit/components/BannerLogo';
import { RecruitBannerObjects } from '@src/pages/Recruit/data/banners';

import { CorpDescObject, CorpNameObject, Corps, CorpsImageObject, CorpSiteUrls } from '../common/constants';

export const getCorpData = () => {
  return {
    CorpImage,
    Logo: BannerLogo,
    corps: Corps,
    ImgObject: CorpsImageObject,
    corpSiteUrls: CorpSiteUrls,
    corpNameObject: CorpNameObject,
    corpDescObject: CorpDescObject,
    recruitBannersObject: RecruitBannerObjects,
  };
};
