import useSimpleErrorPopup, { SimpleErrorKey } from '@src/common/hooks/useSimpleErrorPopup';
import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';
import { isEmpty, isNil } from 'lodash';

import type { ServerError } from '../utils';
import { refreshAccessTokenWrapper } from '../utils';

import { getApplicableAssets, getJoinings, updateJoinings } from './apis';
import type { JoiningsReq, JoiningsRes } from './interface';

export const useJoining = (applicationId: string) => {
  return useQuery({
    queryFn: refreshAccessTokenWrapper(() => {
      return getJoinings(applicationId);
    }),
    queryKey: ['joinings', applicationId],
  });
};

export const useUpdateJoining = (opt?: UseMutationOptions<JoiningsRes, ServerError, JoiningsReq>) => {
  const { open } = useSimpleErrorPopup({ errorKey: SimpleErrorKey.OOPS });
  return useMutation({
    mutationFn: refreshAccessTokenWrapper((body: JoiningsReq) => updateJoinings(body)),
    onError: open,
    ...opt,
  });
};

export const useApplicableAssets = ({
  applicationId,
  classTypeCd,
}: {
  applicationId: string;
  classTypeCd?: string;
}) => {
  return useQuery({
    queryFn: refreshAccessTokenWrapper(() => {
      return getApplicableAssets({ applicationId, classTypeCd });
    }),
    queryKey: ['applicable-assets', applicationId, classTypeCd],
    enabled: !isNil(classTypeCd) && !isEmpty(classTypeCd) && !isNil(applicationId) && !isEmpty(applicationId),
    retry: false,
  });
};
