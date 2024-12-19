import { useAtom } from 'jotai';
import { isNil } from 'lodash';
import { useEffect } from 'react';

import { Corps } from '../constants';
import {
  isComicoScrollDownAtom,
  isHomeScrollDownAtom,
  isJapanScrollDownAtom,
  isPlayartScrollDownAtom,
  isStudioComicoScrollDownAtom,
  isTechorusScrollDownAtom,
} from '../store/atom';

import useCorpParam from './useCorpParam';
import useIsMain from './useIsMain';

const useScrollAtom = () => {
  const [isHomeScrollDown, setIsHomeScrollDown] = useAtom(isHomeScrollDownAtom);
  const [isJapanScrollDown, setIsJapanScrollDown] = useAtom(isJapanScrollDownAtom);
  const [isPlayartScrollDown, setIsPlayartScrollDown] = useAtom(isPlayartScrollDownAtom);
  const [isTechorusScrollDown, setIsTechorusScrollDown] = useAtom(isTechorusScrollDownAtom);
  const [isComicoScrollDown, setIsComicoScrollDown] = useAtom(isComicoScrollDownAtom);
  const [isStudioComicoScrollDown, setIsStudioComicoScrollDown] = useAtom(isStudioComicoScrollDownAtom);
  const corpParam = useCorpParam();
  const isMain = useIsMain();

  useEffect(() => {
    const handleScroll = () => {
      const bool = window.scrollY > 20;

      switch (corpParam) {
        case Corps.JAPAN:
          setIsJapanScrollDown(bool);
          break;
        case Corps.PLAYART:
          setIsPlayartScrollDown(bool);
          break;
        case Corps.TECHORUS:
          setIsTechorusScrollDown(bool);
          break;
        case Corps.COMICO:
          setIsComicoScrollDown(bool);
          break;
        case Corps.STUDIO_COMICO:
          setIsStudioComicoScrollDown(bool);
          break;
        default:
          if (!isMain) break;
          setIsHomeScrollDown(bool);
          break;
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [
    corpParam,
    isMain,
    setIsComicoScrollDown,
    setIsHomeScrollDown,
    setIsJapanScrollDown,
    setIsPlayartScrollDown,
    setIsStudioComicoScrollDown,
    setIsTechorusScrollDown,
  ]);

  const getScrollDown = () => {
    switch (corpParam) {
      case Corps.JAPAN:
        return isJapanScrollDown;
      case Corps.PLAYART:
        return isPlayartScrollDown;
      case Corps.TECHORUS:
        return isTechorusScrollDown;
      case Corps.COMICO:
        return isComicoScrollDown;
      case Corps.STUDIO_COMICO:
        return isStudioComicoScrollDown;
      default:
        return isHomeScrollDown;
    }
  };

  return isNil(corpParam) ? isHomeScrollDown : getScrollDown();
};

export default useScrollAtom;
