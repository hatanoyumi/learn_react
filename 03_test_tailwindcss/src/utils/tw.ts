import { keys } from 'lodash';
import { extendTailwindMerge } from 'tailwind-merge';

export const getPxToRem = (limit: number) => {
  return Array.from({ length: limit }, (_, idx) => idx * 4).reduce((spacing, pixel) => {
    spacing[pixel] = `${(pixel / 16).toFixed(3)}rem`;
    return spacing;
  }, {} as Record<number, string>);
};

export const tw = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            ...keys(getPxToRem(25)),
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            't1',
            't2',
            't3',
            'b1',
            'b2',
            'b3',
            'b4',
            'h1-m',
            'h2-m',
            'h3-m',
            'h4-m',
            'h5-m',
            't1-m',
            't2-m',
            't3-m',
            'b1-m',
            'b2-m',
            'b3-m',
            'b4-m',
          ],
        },
      ],
      'font-weight': [{ font: Array.from({ length: 9 }, (_, idx) => String((idx + 1) * 100)) }],
      rounded: [{ rounded: [...keys(getPxToRem(25))] }],
    },
  },
});
