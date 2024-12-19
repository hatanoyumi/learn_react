import { isEmpty, isNil } from 'lodash';
import { useNavigate } from 'react-router-dom';

const useNavigateWithSearch = () => {
  const navigate = useNavigate();

  const go = ({ searchParams, pathname }: GoWithSearch) => {
    if (isNil(searchParams) || isEmpty(searchParams)) {
      return navigate({ pathname });
    }

    const params = new URLSearchParams();
    searchParams.forEach(({ key, value }) => !isEmpty(key) && !isEmpty(value) && params.append(key, String(value)));

    return navigate({
      pathname,
      search: params.toString(),
    });
  };

  return go;
};

export default useNavigateWithSearch;

type GoWithSearch = {
  pathname: string;
  searchParams?: { key: string; value: string | number }[];
};
