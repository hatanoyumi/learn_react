import { values } from 'lodash';
import { useLocation } from 'react-router-dom';

import { route } from '@src/common/constants';

const useIsMain = () => {
  const location = useLocation();
  return ([...values(route.corps), route.home] as string[]).includes(location.pathname);
};

export default useIsMain;
