import { isNaN, isNil } from 'lodash';
import { useParams, useSearchParams } from 'react-router-dom';

const DEFAULT_ID = '0';

const useParamsId = (key: string) => {
  const idKey = key;
  const params = useParams();
  const [searchParams] = useSearchParams();

  const idFromParams = () => {
    if (!isNaN(Number(params[idKey])) && Number(params[idKey]) !== 0) {
      return params[idKey];
    }

    return null;
  };

  const idFromSearchParams = () => {
    const paramsId = searchParams.get(idKey) as string;
    if (!isNaN(Number(paramsId)) && Number(paramsId) !== 0) {
      return paramsId;
    }
    if (!isNil(paramsId)) {
      return paramsId;
    }
    return null;
  };

  const paramsId = idFromParams() ?? idFromSearchParams() ?? DEFAULT_ID;
  return {
    paramsId,
    idKey,
  };
};

export default useParamsId;
