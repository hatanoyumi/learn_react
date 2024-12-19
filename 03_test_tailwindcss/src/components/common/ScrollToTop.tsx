import { PAINT_LOAD_TIME, route } from '@src/common/constants';
import useScrollToSearchParams from '@src/common/hooks/useScrollToSearchParams';
import { goToTop } from '@src/utils';
import { useAtomValue } from 'jotai';
import { gt, isEmpty, isNil } from 'lodash';
import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { lastPageScrollY } from '../../pages/Recruit/store/atom';

const ScrollToTop = () => {
  const lastPageScroll = useAtomValue(lastPageScrollY);
  const { pathname } = useLocation();
  const { getParam } = useScrollToSearchParams();
  const hasScrollToSearchParams = !isNil(getParam()) && !isEmpty(getParam());

  useLayoutEffect(() => {
    const isRecruitList = Object.values(route.recruit.list).find((url) => url === pathname);
    const scrollToLastElement = gt(lastPageScroll.y, 0) && isRecruitList && !hasScrollToSearchParams;

    if (hasScrollToSearchParams) return;
    if (scrollToLastElement) {
      const id = setTimeout(() => {
        window.scrollTo({ left: 0, top: lastPageScroll.y });
      }, PAINT_LOAD_TIME);

      return () => clearTimeout(id);
    }

    goToTop();
  }, [pathname, lastPageScroll.y, hasScrollToSearchParams]);

  return null;
};

export default ScrollToTop;
