import { curry } from 'lodash';
import tailwindScrollbar from 'tailwind-scrollbar';
import tailwindScrollBarHide from 'tailwind-scrollbar-hide';
import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

const multiplesOfOne = Array.from({ length: 1801 }, (_, idx) => idx - 800);
const multiplesOfFour = Array.from({ length: 100 }, (_, idx) => idx * 4);

const pxToRem = (px: number) => `${(px / 16).toFixed(3)}rem`;
const pxToRemRange = (range: number[]) => {
  return range.reduce((spacing, pixel) => {
    spacing[pixel] = pxToRem(pixel);
    return spacing;
  }, {} as Record<string, string>);
};

const getPxToRemLimit = curry((range: number[], limit: number) => {
  if (limit) return pxToRemRange(range.slice(0, limit));
  return pxToRemRange(range);
});

const spacing = pxToRemRange(multiplesOfOne);
const colors = {
  primary: {
    DEFAULT: '#FF2222',
    100: '#FFE2D2',
    200: '#FFBDA6',
    300: '#FF917A',
    400: '#FF6759',
    500: '#FF2222',
    600: '#DB1829',
    700: '#B7112D',
  },
  primaryLight: '#EF6767',
  primaryBg: '#FEF3F3',
  grayScale: {
    white: '#FFFFFF',
    gray1100: '#212126',
    gray1000: '#36363D',
    gray900: '#57575B',
    gray800: '#62626A',
    gray700: '#797981',
    gray600: '#919197',
    gray500: '#AAAAAE',
    gray400: '#C3C3C5',
    gray300: '#DBDBDB',
    gray200: '#E9E9E9',
    gray150: '#F1F1F1',
    gray100: '#F8F8F8',
    black: '#111213',
  },
  gs: {
    white: '#FFFFFF',
    1100: '#212126',
    1000: '#36363D',
    900: '#57575B',
    800: '#62626A',
    700: '#797981',
    600: '#919197',
    500: '#AAAAAE',
    400: '#C3C3C5',
    300: '#DBDBDB',
    200: '#E9E9E9',
    150: '#F1F1F1',
    100: '#F8F8F8',
    black: '#111213',
  },
  background: '#F7F8F8',
  border: '#E7E7E7',
  border200: '#E9E9E9',
  footerLine: '#EEEEEE',
  underline: '#CDCDCD',

  textBoxBg: '#F9F9F9',

  searchBtn: '#111213',
  selectedCategory: '#F8F8F8',

  galleryDim: 'rgba(17, 18, 19, 0.96)',

  mainFrom: 'rgba(0,0,0,0.41)',
  mainTo: 'rgba(0,0,0,0.55)',

  maskFrom: 'rgba(255,255,255,1)',
  maskTo: 'rgba(2,0,36,0)',

  BG: '#E6E4E3',
  BK: '#212121',
  GL: '#999999',
  RED: '#FF3820',
  BLUE: '#0085FF',
  theme: {
    JPN1: '#FF846C',

    PA1: '#FF2B9D',
    PA2: '#B540FF',
    PA3: '#119BFF',
    PA4: '#FFA800',
    PA5: '#FF3D00',
    PA6: '#29CB06',
    PA7: '#00A9B4',
    PA8: '#6A7CFF',

    TC1: '#191919',
    TC2: '#0026AB',
    TC3: '#4879FF',
    TC4: '#4CB4FF',

    CM1: '#FF0009',

    SC: '#FFB300',

    FUK1: '#388EE1',
    FUK2: '#FFCDBC',

    BACK: '#E4E5DD',
  },
  WH: '#FFFFFF',
};

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  theme: {
    extend: {
      borderRadius: { ...getPxToRemLimit(multiplesOfOne.slice(800), 101) },
      borderWidth: { ...getPxToRemLimit(multiplesOfOne.slice(800), 11) },
      colors,
      spacing: { ...spacing, 'header-desktop': pxToRem(88), 'header-mobile': pxToRem(64) },
      opacity: multiplesOfFour.slice(0, 25).reduce((opacity, value) => {
        opacity[value] = `${value * 0.01}`;
        return opacity;
      }, {} as Record<string, string>),
      maxHeight: spacing,
      width: { ...spacing, desktop: pxToRem(1200), mobile: pxToRem(875) },
      maxWidth: { ...spacing, desktop: pxToRem(1200), mobile: pxToRem(875) },
      minHeight: spacing,
      minWidth: { ...spacing, desktop: pxToRem(1200), mobile: pxToRem(875) },
      divideWidth: { ...getPxToRemLimit(multiplesOfOne, 10) },
      transitionProperty: {
        height: 'height',
      },
      fontFamily: {
        sansKO: ['Pretendard', ...fontFamily.sans],
        sansEN: ['Poppins', ...fontFamily.sans],
        sansJP: ['HiraginoSans', ...fontFamily.sans],

        100: ['Hiragino Kaku Gothic W1 JIS2004', ...fontFamily.sans],
        200: ['Hiragino Kaku Gothic W2 JIS2004', ...fontFamily.sans],
        300: ['Hiragino Kaku Gothic W3 JIS2004', ...fontFamily.sans],
        400: ['Hiragino Kaku Gothic W4 JIS2004', ...fontFamily.sans],
        500: ['Hiragino Kaku Gothic W5 JIS2004', ...fontFamily.sans],
        600: ['Hiragino Kaku Gothic W6 JIS2004', ...fontFamily.sans],
        700: ['Hiragino Kaku Gothic W7 JIS2004', ...fontFamily.sans],
        800: ['Hiragino Kaku Gothic W8 JIS2004', ...fontFamily.sans],
        900: ['Hiragino Kaku Gothic W9 JIS2004', ...fontFamily.sans],
      },
      fontSize: {
        ...getPxToRemLimit(multiplesOfFour, 25),

        h1: [
          pxToRem(60),
          {
            fontWeight: '800',
            lineHeight: '116%',
            letterSpacing: '0%',
          },
        ],
        h2: [
          pxToRem(44),
          {
            fontWeight: '800',
            lineHeight: '128%',
            letterSpacing: '0%',
          },
        ],
        h3: [
          pxToRem(42),
          {
            fontWeight: '800',
            lineHeight: '140%',
            letterSpacing: '0%',
          },
        ],
        h4: [
          pxToRem(38),
          {
            fontWeight: '800',
            lineHeight: '132%',
          },
        ],
        h5: [
          pxToRem(32),
          {
            fontWeight: '800',
            lineHeight: '140%',
            letterSpacing: '0%',
          },
        ],

        t1: [
          pxToRem(26),
          {
            fontWeight: '700',
            lineHeight: '140%',
            letterSpacing: '0%',
          },
        ],
        t2: [
          pxToRem(22),
          {
            fontWeight: '700',
            lineHeight: '136%',
          },
        ],
        t3: [
          pxToRem(18),
          {
            fontWeight: '300',
            lineHeight: '142%',
          },
        ],

        b1: [
          pxToRem(16),
          {
            fontWeight: '400',
            lineHeight: '150%',
          },
        ],
        b2: [
          pxToRem(14),
          {
            fontWeight: '300',
            lineHeight: '160%',
          },
        ],
        b3: [
          pxToRem(13),
          {
            fontWeight: '300',
            lineHeight: '156%',
            letterSpacing: '2%',
          },
        ],
        b4: [
          pxToRem(12),
          {
            fontWeight: '300',
            lineHeight: '152%',
            letterSpacing: '2%',
          },
        ],

        // MOBILE
        'h1-m': [
          pxToRem(36),
          {
            fontWeight: '800',
            lineHeight: '128%',
            letterSpacing: '0%',
          },
        ],
        'h2-m': [
          pxToRem(28),
          {
            fontWeight: '800',
            lineHeight: '128%',
            letterSpacing: '0%',
          },
        ],
        'h3-m': [
          pxToRem(24),
          {
            fontWeight: '800',
            lineHeight: '140%',
            letterSpacing: '0%',
          },
        ],
        'h4-m': [
          pxToRem(22),
          {
            fontWeight: '800',
            lineHeight: '144%',
          },
        ],
        'h5-m': [
          pxToRem(20),
          {
            fontWeight: '800',
            lineHeight: '140%',
            letterSpacing: '0%',
          },
        ],

        't1-m': [
          pxToRem(18),
          {
            fontWeight: '700',
            lineHeight: '146%',
          },
        ],
        't2-m': [
          pxToRem(18),
          {
            fontWeight: '700',
            lineHeight: '156%',
          },
        ],
        't3-m': [
          pxToRem(16),
          {
            fontWeight: '300',
            lineHeight: '148%',
          },
        ],

        'b1-m': [
          pxToRem(15),
          {
            fontWeight: '400',
            lineHeight: '156%',
          },
        ],
      },
      fontWeight: {
        100: '100',
        200: '200',
        300: '300',
        400: '400',
        500: '500',
        600: '600',
        700: '700',
        800: '800',
        900: '900',
      },
      screens: {
        desktop: '1920px',
        mobile: '375px',
      },
      boxShadow: {
        card: '0px 4px 16px 0px rgba(0, 0, 0, 0.05)',
        'site-menu': '0px 2px 8px rgba(0, 0, 0, 0.1)',
        'share-box': '0px 4px 50px rgba(0, 0, 0, 0.08)',
        'position-card': ' 0px 8px 40px 0px rgba(0, 0, 0, 0.07)',
        'mobile-card': '0px 4.260000228881836px 18.257143020629883px 0px rgba(0, 0, 0, 0.10);',
      },
      dropShadow: {
        card: '0px 4px 50px rgba(0, 0, 0, 0.07)',
        'mobile-card': '0px 4.26px 18.2571px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        main: 'linear-gradient(to_top,rgba(0,0,0,0.41),rgba(0,0,0,0.55))',
      },
      zIndex: {
        90: '90',
        100: '100',
      },
      transitionDuration: {
        700: '700ms',
        800: '800ms',
      },
      keyframes: {
        elasticus: {
          '0%': {
            transformOrigin: '0 0',
            transform: 'scaleY(0)',
          },
          '50%': {
            transformOrigin: '0 0',
            transform: 'scaleY(1)',
          },
          '50.1%': {
            transformOrigin: '0 100%',
            transform: 'scaleY(1)',
          },
          to: {
            transformOrigin: '0 100%',
            transform: 'scaleY(0)',
          },
        },
      },
      animation: {
        elasticus: 'elasticus 1.2s infinite',
      },
    },
  },

  plugins: [
    tailwindScrollbar({ nocompatible: true }),
    plugin(({ addVariant }) => {
      addVariant('children-a', '& > * > a');
      addVariant('firstChild', '&:first-child');
      addVariant('firstOfType', '[&>*:first-of-type]');
    }),
    plugin(({ addUtilities }) =>
      addUtilities({
        '.overflow-anywhere': { 'overflow-wrap': 'anywhere' },
        '.scale-plus': { transform: 'scale(1.0161290323)' },
        '.scale-normal': { transform: 'scale(1)' },
        '.transform-scale': { transition: 'transform .3s cubic-bezier(0,0,0.5,1)' },
      })
    ),
    tailwindScrollBarHide,
  ],
  variants: {
    scrollbar: ['rounded'],
  },
};
