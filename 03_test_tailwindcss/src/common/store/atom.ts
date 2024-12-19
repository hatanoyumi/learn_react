import { atom } from 'jotai';

import { Corps } from '../constants';
import type { SimpleErrorProps } from '../hooks/useSimpleErrorPopup';

export const mobileNavTitleAtom = atom<string | null>(null);
export const openLoadingAtom = atom(false);
export const loadingMessageAtom = atom('');
export const errorMessagesAtom = atom<SimpleErrorProps[]>([]);
export const isScrollDownAtom = atom({
  [Corps.JAPAN]: false,
  [Corps.PLAYART]: false,
  [Corps.TECHORUS]: false,
  [Corps.COMICO]: false,
  [Corps.STUDIO_COMICO]: false,
  [Corps.FUKUOKA]: false,
  [Corps.CLOUD]: false,
  home: false,
});
export const isHomeScrollDownAtom = atom(false);
export const isJapanScrollDownAtom = atom(false);
export const isPlayartScrollDownAtom = atom(false);
export const isTechorusScrollDownAtom = atom(false);
export const isComicoScrollDownAtom = atom(false);
export const isStudioComicoScrollDownAtom = atom(false);
