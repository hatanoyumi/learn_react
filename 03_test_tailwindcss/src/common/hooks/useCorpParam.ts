import { first, isEmpty } from 'lodash';
import { useLocation } from 'react-router-dom';

import type { CorpsType } from '../constants';
import { Corps } from '../constants';

const useCorpParam = (): CorpsType | null => {
  const location = useLocation();
  const corp = first(
    location.pathname
      .split('/')
      .map((it) => {
        switch (it) {
          case 'japan':
            return Corps.JAPAN;
          case 'playart':
            return Corps.PLAYART;
          case 'techorus':
            return Corps.TECHORUS;
          case 'comico':
            return Corps.COMICO;
          case 'studio-comico':
            return Corps.STUDIO_COMICO;
          case 'fukuoka':
            return Corps.FUKUOKA;
          case 'cloud':
            return Corps.CLOUD;
        }
      })
      .filter((it) => !isEmpty(it))
  ) as CorpsType | undefined;

  return corp ?? null;
};

export default useCorpParam;
