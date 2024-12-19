import { ReactComponent as ArrowUp } from '@icons/systems/arrow/up.svg';
import { getClsByDevice } from '@src/utils';
import { isMobile } from 'react-device-detect';

import IconButton from '../Buttons/IconButton';

const GoToTop = () => {
  const goToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <IconButton
      onClick={goToTop}
      className='fixed bottom-0 right-0 z-30'
      variant='light'
      size={isMobile ? 'default' : 'xlarge'}
      Icon={<ArrowUp className={getClsByDevice({ desktop: 'size-32', mobile: 'size-24' })} />}
    />
  );
};

export default GoToTop;
