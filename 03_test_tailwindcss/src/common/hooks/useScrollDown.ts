import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';

const useScrollDown = () => {
  const { scrollY } = useScroll();
  const [isScrollDown, setIsScrollDown] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrollDown(latest > 20);
  });

  return isScrollDown;
};

export default useScrollDown;
