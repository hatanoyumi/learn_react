import { isEqual, isNil } from 'lodash';
import type { RefObject } from 'react';
import { useCallback, useLayoutEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { HEADER_HEIGHT } from '../constants';

const useScrollToSearchParams = (props?: { ref: RefObject<HTMLDivElement> }) => {
  const ref = props?.ref;
  const [params, setParams] = useSearchParams();
  const office = 'office';
  const interviews = 'interviews';
  const benefits = 'benefits';
  const hr = 'hr';
  const key = 'location';

  const setKey = (value: MainLocationParams) => {
    setParams({ [key]: value });
  };

  const getElement = useCallback(
    (id: string) => {
      if (!isEqual(ref?.current?.id, id)) return;

      return ref?.current as HTMLDivElement;
    },
    [ref]
  );

  const getParam = useCallback(() => {
    const param = params.get(key);

    if (isEqual(param, office)) return office;
    if (isEqual(param, interviews)) return interviews;
    if (isEqual(param, benefits)) return benefits;
    if (isEqual(param, hr)) return hr;

    return null;
  }, [params]);

  useLayoutEffect(() => {
    const param = getParam();
    if (isNil(param)) return;
    const element = getElement(param);
    if (isNil(element)) return;
    updateScrollRestoration('manual');

    const top = element.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;

    const id = setTimeout(() => window.scrollTo({ top }), 100);

    return () => {
      updateScrollRestoration('auto');

      clearTimeout(id);
    };
  }, [getElement, getParam]);

  return {
    key,
    setKey,
    values: {
      office,
      interviews,
      benefits,
      hr,
    },
    getParam,
  };
};

export default useScrollToSearchParams;

type MainLocationParams = 'office' | 'interviews' | 'benefits' | 'hr';

const updateScrollRestoration = (value: 'manual' | 'auto') => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = value;
  }
};
