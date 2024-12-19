import type { Corporation } from '@src/apis/recruit';
import { useGetCorporations } from '@src/apis/recruit';
import { get } from 'lodash';

import { CORPORATION_CODES } from '../constants';

import useCorpParam from './useCorpParam';

const useCurrentCorporation = (): Corporation | undefined => {
  const corp = useCorpParam();
  const getCorporations = useGetCorporations();

  const corporationCd = get(CORPORATION_CODES, corp ?? '');
  const corporation = getCorporations.data?.result.find((it) => it.cd === corporationCd);

  return corporation;
};

export default useCurrentCorporation;
