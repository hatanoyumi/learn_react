import { useCallback, useEffect, useRef, useState } from 'react';

const useElTouchTopObserver = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isTouchTop, setIsTouchTop] = useState(false);

  const setRef = useCallback((node: HTMLDivElement) => {
    ref.current = node;
  }, []);

  const observer = useRef(
    new IntersectionObserver(
      ([entry]) => {
        requestAnimationFrame(() => setIsTouchTop(entry.isIntersecting));
      },
      {
        rootMargin: '0px 0px -99.8% 0px',
      }
    )
  );
  useEffect(() => {
    const currentRef = ref.current;
    if (currentRef) {
      observer.current.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.current.unobserve(currentRef);
      }
    };
  }, []);

  return { setRef, isTouchTop };
};

export default useElTouchTopObserver;
