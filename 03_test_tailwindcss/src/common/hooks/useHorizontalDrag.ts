import { isNil, throttle } from 'lodash';
import type { MouseEvent, MutableRefObject } from 'react';
import { useState } from 'react';

const useHorizontalDrag = (containerRef: MutableRefObject<HTMLDivElement | null>) => {
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState(0);

  const imgWrapper = containerRef.current;

  const onDragStart = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDrag(true);
    !isNil(imgWrapper) && setStartX(e.pageX + imgWrapper.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isDrag || isNil(imgWrapper)) return;

    const { scrollWidth, clientWidth, scrollLeft } = imgWrapper;
    imgWrapper.scrollLeft = startX - e.pageX;

    if (scrollLeft === 0) {
      setStartX(e.pageX);
    } else if (scrollWidth <= clientWidth + scrollLeft) {
      setStartX(e.pageX + scrollLeft);
    }
  };

  const delay = 5;
  const onThrottleDragMove = throttle(onDragMove, delay);

  return {
    onMouseDown: onDragStart,
    onMouseMove: onThrottleDragMove,
    onMouseUp: onDragEnd,
    onMouseLeave: onDragEnd,
  };
};

export default useHorizontalDrag;
