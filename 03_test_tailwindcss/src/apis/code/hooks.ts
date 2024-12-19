import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { getCodes } from './apis';
import type { CodeReq, CodeRes } from './interface';

export const useGetCodes = (
  data: CodeReq,
  opt?: Omit<UseQueryOptions<CodeRes, unknown, CodeRes, (string | CodeReq)[]>, 'initialData'>
) => {
  return useQuery({
    queryKey: ['getCodes', data?.cdKind, data],
    queryFn: () => getCodes(data),
    ...opt,
  });
};
