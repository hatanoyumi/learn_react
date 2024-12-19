import { Corps } from '@src/common/constants';
import { tw } from '@src/utils';
import { useAtomValue } from 'jotai';
import { gt, isNil, lt, uniqueId } from 'lodash';
import type { ReactElement } from 'react';
import { memo, useEffect, useRef } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import SwiperCore, { Autoplay } from 'swiper';
import type { SwiperRef } from 'swiper/react';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { RecruitBannerType } from '../data/banners';
import { postingParamsAtom } from '../store/atom';

SwiperCore.use([Autoplay]);

const Banner = ({ data }: Props) => {
  const swiper = useRef<SwiperRef>(null);
  const postingParam = useAtomValue(postingParamsAtom);

  useEffect(() => {
    if (lt(data.length, 1)) return;
    const jobGroupIds = postingParam.jobGroupId;
    const selectedJobGroupIndex = data.findIndex((it) => jobGroupIds?.includes(it.jobGroupId as string));

    setTimeout(() => swiper.current?.swiper.slideToLoop(lt(selectedJobGroupIndex, 0) ? 0 : selectedJobGroupIndex), 0);
  }, [data, postingParam.jobGroupId]);

  return (
    <>
      <BrowserView renderWithFragment>
        <Swiper
          ref={swiper}
          tag='div'
          loop={gt(data.length, 1)}
          speed={800}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={false}
          draggable={false}
          noSwiping
          allowTouchMove={false}
          className='h-300 w-full overflow-y-hidden'
        >
          {data.map(({ Background, Logo, Link, Object3D, jobGroupId }) => {
            return (
              <SwiperSlide key={jobGroupId ?? uniqueId()} className='relative cursor-default'>
                <div className='absolute inset-0 h-full w-full'>{Background}</div>
                {!isNil(Object3D) && <div className='absolute inset-0 z-10 mx-auto w-fit'>{Object3D}</div>}
                <div className='relative mx-auto h-full max-w-desktop overflow-y-hidden'>
                  {!isNil(Logo) && <div className='absolute inset-y-0 left-0 z-10 my-auto h-fit'>{Logo}</div>}
                  {!isNil(Link) && <div className='absolute inset-y-0 right-0 z-10 my-auto h-fit'>{Link}</div>}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </BrowserView>

      <MobileView renderWithFragment>
        <Swiper
          ref={swiper}
          tag='div'
          loop={gt(data.length, 1)}
          speed={800}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={false}
          draggable={false}
          noSwiping
          allowTouchMove={false}
          className='h-160 w-full overflow-y-hidden'
        >
          {data.map(({ Background, Logo, Object3D, jobGroupId }) => {
            const {
              props: { alt: title },
            } = Background as ReactElement;
            const isFukuoka = title === Corps.FUKUOKA;
            const isCloud = title === Corps.CLOUD;
            const LogoPosition = isFukuoka || isCloud ? 'left-19' : 'left-27';

            return (
              <SwiperSlide key={jobGroupId ?? uniqueId()} className={'relative cursor-default overflow-hidden'}>
                <div className='absolute inset-0 h-full w-full'>{Background}</div>
                <div className='relative mx-auto size-full max-w-mobile'>
                  {!isNil(Logo) && (
                    <div className={tw('absolute inset-y-0 z-10 my-auto h-fit', LogoPosition)}>{Logo}</div>
                  )}
                  {!isNil(Object3D) && (
                    <div className={tw('absolute inset-0 right-0 z-10 ml-auto w-fit')}>{Object3D}</div>
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </MobileView>
    </>
  );
};

export default memo(Banner);

type Props = {
  data: RecruitBannerType[];
};
