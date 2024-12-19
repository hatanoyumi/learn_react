import useSimpleErrorPopup, { SimpleErrorKey } from '@src/common/hooks/useSimpleErrorPopup';
import type { QueryKey, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';
import { isNil } from 'lodash';

import { ApplicantsResultCode } from '../errorCode';
import type { ServerError } from '../utils';
import { booleanToYN, refreshAccessTokenWrapper, ynToBoolean } from '../utils';

import { applicantsJobPostings, changePassword, deleteMe, me, privacyCheck, updateMe } from './apis';
import type {
  ApplicantsJobPostingRes,
  ChangePasswordReq,
  GetMeReq,
  MeReq,
  MeRes,
  PrivacyCheckReq,
  PrivacyCheckRes,
} from './interface';

export const useMeQueryKey = 'me';
export const useApplicantsJobPostingsKey = 'applicant-job-postings';

export const useChangePassword = () => {
  const { open } = useSimpleErrorPopup({ errorKey: SimpleErrorKey.OOPS });

  return useMutation({
    mutationFn: refreshAccessTokenWrapper((body: ChangePasswordReq) => changePassword(body)),
    onError: open,
  });
};

export const useMe = (
  opt?: Partial<GetMeReq> & Omit<UseQueryOptions<MeRes, ServerError, MeRes, QueryKey>, 'initialData'>
) => {
  const params = isNil(opt?.includePrivacyYn) ? undefined : { includePrivacyYn: booleanToYN(opt?.includePrivacyYn) };

  return useQuery<MeRes, ServerError>({
    queryFn: refreshAccessTokenWrapper(() => me(params)),
    queryKey: [useMeQueryKey, opt?.includePrivacyYn],
    retry: false,
    retryOnMount: false,
    refetchInterval: 30 * 60 * 1000, // 자주 변하지 않는 데이터는 30분마다 refetch 하도록 한다
    ...opt,
  });
};

export const useUpdateMe = (opt?: UseMutationOptions<MeRes, ServerError, MeReq, unknown>) => {
  const { open } = useSimpleErrorPopup({ errorKey: SimpleErrorKey.OOPS });

  return useMutation<MeRes, ServerError, MeReq>({
    mutationFn: refreshAccessTokenWrapper((body: MeReq) => updateMe(body)),
    onError: open,
    ...opt,
  });
};

export const useApplicantsJobPostings = (
  opt?: Omit<UseQueryOptions<ApplicantsJobPostingRes, ServerError, ApplicantsJobPostingRes, QueryKey>, 'initialData'>
) => {
  return useQuery({
    queryKey: [useApplicantsJobPostingsKey],
    queryFn: refreshAccessTokenWrapper(() => applicantsJobPostings()),
    select: (response: ApplicantsJobPostingRes) => {
      return {
        ...response,
        result: response.result?.map((value) => {
          return {
            ...value,
            finalSubmitYn: ynToBoolean(value.finalSubmitYn),
            finishYn: ynToBoolean(value.finishYn),
          };
        }),
      };
    },
    notifyOnChangeProps: ['data'],
    ...opt,
  });
};

export const useDeleteMe = () => {
  const { open } = useSimpleErrorPopup({ errorKey: SimpleErrorKey.OOPS });

  return useMutation<null, ServerError, string>({
    mutationFn: refreshAccessTokenWrapper((password: string) => deleteMe({ password })),
    onError: (e) => {
      if (e.response?.data.header.resultCode !== ApplicantsResultCode.WRONG_PASSWORD) {
        open();
      }
    },
  });
};

export const usePrivacyCheck = () => {
  return useMutation<PrivacyCheckRes, ServerError, PrivacyCheckReq>({
    mutationFn: refreshAccessTokenWrapper((body: PrivacyCheckReq) => privacyCheck(body)),
  });
};
