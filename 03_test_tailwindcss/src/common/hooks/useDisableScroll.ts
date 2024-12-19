import { useEffect } from 'react';

const useDisableScroll = (isPopupOpen: boolean) => {
  useEffect(() => {
    const disableScroll = (event: TouchEvent) => {
      event.preventDefault();
    };

    if (isPopupOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('touchmove', disableScroll, { passive: false });
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('touchmove', disableScroll);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('touchmove', disableScroll);
    };
  }, [isPopupOpen]);
};

export default useDisableScroll;
