import { isMobile } from 'react-device-detect';

export const getAdaptiveImage = (src: string, active = true) => {
  if (src.includes('.mp4')) {
    return isMobile && active ? src.replace('.mp4', '_mobile.mp4') : src;
  }

  return isMobile && active ? src.replace('.png', '_mobile.png') : src;
};
