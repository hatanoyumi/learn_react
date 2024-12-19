import { cubicBezier, useInView } from 'framer-motion';
import type { RefObject } from 'react';

export function useFadeInAnimation<T extends RefObject<Element>>(ref: T, opt?: { delay?: number; amount?: number }) {
  const isInView = useInView(ref, {
    once: true,
    amount: opt?.amount ?? 0.5,
  });
  const ease = cubicBezier(0.26, 0.67, 0.48, 0.91);

  return {
    variants: {
      fadeOut: {
        opacity: 0.5,
        transform: 'translateY(20px)',
        transition: { ease },
      },
      fadeIn: {
        opacity: 1,
        transform: 'translateY(0px)',
        transition: {
          opacity: {
            delay: opt?.delay ?? 0,
            ease,
            duration: 0.3,
          },
          transform: {
            delay: opt?.delay ?? 0,
            ease,
            duration: 0.3,
          },
        },
        transitionEnd: { transform: 'none' },
      },
    },
    animate: isInView ? 'fadeIn' : 'fadeOut',
    exit: 'fadeIn',
  };
}
