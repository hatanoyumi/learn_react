import { useCallback, useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';

const SCROLL_THRESHOLD = 1;
const THROTTLE_DELAY = 1000;

const useHorizontalScroll = ({ ref, onRight, onLeft }: UseHorizontalScrollProps) => {
  const lastScrollTime = useRef<number>(0);

  const handleScroll = useCallback(
    (event: WheelEvent) => {
      if (ref.current && ref.current.contains(event.target as Node)) {
        const delta = event.deltaX;
        if (Math.abs(delta) < SCROLL_THRESHOLD) return; // 임계값보다 작은 경우 무시
        event.preventDefault();

        const currentTime = Date.now();
        if (currentTime - lastScrollTime.current < THROTTLE_DELAY) return; // 쓰로틀링 시간 내에 발생한 이벤트 무시

        if (delta > 0) onRight();
        if (delta < 0) onLeft();
        lastScrollTime.current = currentTime;
      }
    },
    [onRight, onLeft, ref]
  );

  useEffect(() => {
    if (isMobile) return;

    const options = { passive: false };
    window.addEventListener('wheel', handleScroll, options);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [handleScroll]);

  return null;
};

export default useHorizontalScroll;

type UseHorizontalScrollProps = {
  ref: React.RefObject<HTMLElement>;
  onRight: () => void;
  onLeft: () => void;
};
