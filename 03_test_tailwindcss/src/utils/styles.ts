import type { ClassValue } from 'clsx';
import { isDesktop, isMobile } from 'react-device-detect';

import { tw } from './tw';

export const withClsx = (...defaultClassValues: string[]) => {
  return (additionalClassValues?: string) => {
    if (!!additionalClassValues) {
      return Array.isArray(additionalClassValues)
        ? tw(...defaultClassValues, ...additionalClassValues)
        : tw(...defaultClassValues, additionalClassValues);
    }

    return tw(...defaultClassValues);
  };
};

export const getClsByDevice = (opt: GetClsByDeviceParam) => {
  if (typeof opt === 'string' || Array.isArray(opt)) return tw(opt);

  const { mobile, desktop, common } = opt;
  return tw(common, isMobile ? mobile : '', isDesktop ? desktop : '');
};

export type WithClsxParam = ClassValue | ClassValue[] | string;
type GetClsByDeviceParam = { mobile?: string; desktop?: string; common?: string } | string | string[];
