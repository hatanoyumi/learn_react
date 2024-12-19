import useSimpleErrorPopup, { SimpleErrorKey } from '@src/common/hooks/useSimpleErrorPopup';
import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';
import { isEmpty, isNil, isString } from 'lodash';

import { ResumeResultCode } from '../errorCode';
import type { ServerError } from '../utils';
import { booleanToYN, lazyUseQueryOption, refreshAccessTokenWrapper, ynToBoolean } from '../utils';

import {
  autosaveApplicationResume,
  checkAutosave,
  copyBasicResume,
  createApplicationResume,
  createMessages,
  createNewApply,
  deleteApplicationResume,
  getApplicationMessages,
  getApplicationResume,
  getAutosave,
  saveApplicationResume,
} from './apis';
import type {
  ApplicationAutoSaveReq,
  ApplicationResumeReq,
  ApplicationResumeRes,
  ApplicationSaveReq,
  AutosaveResumeRes,
  CheckAutoSaveRes,
  CreateMessage,
  CreateNewApplyReq,
  CreateResumeReq,
  MessagesRes,
} from './interface';
import { returnIfNilOrEmpty } from './utils';

export const useCreateApplicationResume = () => {
  const { open } = useSimpleErrorPopup({ errorKey: SimpleErrorKey.OOPS });

  return useMutation({
    mutationFn: refreshAccessTokenWrapper((body: CreateResumeReq) => {
      const clone = {
        usePiAgreeYn: booleanToYN(body.usePiAgreeYn),
        registerPoolPiAgreeYn: booleanToYN(body.registerPoolPiAgreeYn),
      } satisfies CreateResumeReq;
      return createApplicationResume(clone);
    }),
    onError: open,
  });
};

export const useApplicationResume = (
  data: ApplicationResumeReq,
  opt?: Omit<
    UseQueryOptions<
      ApplicationResumeRes,
      ServerError,
      ApplicationResumeRes,
      (string | ApplicationResumeReq | number)[]
    >,
    'initialData'
  >
) => {
  return useQuery({
    queryKey: ['applicationResume', data, data?.resumeId, ...(opt?.queryKey ?? [])],
    queryFn: refreshAccessTokenWrapper(() => getApplicationResume(data)),
    select: (response) => {
      return {
        ...response,
        result: {
          ...response.result,
          application: response.result.application
            ? {
                ...response.result.application,
                finalSubmitYn: ynToBoolean(response.result.application.finalSubmitYn),
              }
            : null,
          patriot: {
            id: response.result.patriot?.id ?? null,
            patriotYn: response.result.patriot?.patriotYn ? ynToBoolean(response.result.patriot.patriotYn) : null,
            patriotNo: response.result.patriot?.patriotNo ?? null,
          },
          disability: {
            id: response.result.disability?.id ?? null,
            disabilityType: response.result.disability?.disabilityType ?? null,
            disabilityNo: response.result.disability?.disabilityNo ?? null,
            disability: response.result.disability?.disability ?? null,
            heavy: response.result.disability?.heavy ?? null,
            useSiAgreeYn: response.result.disability?.useSiAgreeYn
              ? ynToBoolean(response.result.disability?.useSiAgreeYn)
              : null,
            provideSiAgreeYn: response.result.disability?.provideSiAgreeYn
              ? ynToBoolean(response.result.disability?.provideSiAgreeYn)
              : null,
            registerPoolSiAgreeYn: response.result.disability?.registerPoolSiAgreeYn
              ? ynToBoolean(response.result.disability?.registerPoolSiAgreeYn)
              : null,
          },
        },
      } satisfies ApplicationResumeRes;
    },
    retry: 0,
    enabled: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    ...opt,
  });
};

export const useSaveApplicationResume = (resumeId: string) => {
  const { open: openOops } = useSimpleErrorPopup({ errorKey: SimpleErrorKey.OOPS });
  const { open: openExpiredApplication } = useSimpleErrorPopup({ errorKey: SimpleErrorKey.EXPIRED_APPLICATION });

  return useMutation<null, ServerError, Omit<ApplicationSaveReq, 'application'>>({
    mutationFn: refreshAccessTokenWrapper((body: ApplicationSaveReq) => {
      const clone = {
        ...body,
        patriot: body.patriot
          ? {
              id: body.patriot?.id ?? null,
              patriotYn: body.patriot?.patriotYn ? booleanToYN(body.patriot?.patriotYn) : null,
              patriotNo: body.patriot?.patriotNo ?? null,
            }
          : null,
        disability: body.disability
          ? {
              id: body.disability?.id ?? null,
              disabilityType: body.disability.disabilityType ?? null,
              disabilityNo: body.disability?.disabilityNo ?? null,
              disability: body.disability?.disability ?? null,
              heavy: body.disability?.heavy ?? null,
              useSiAgreeYn: booleanToYN(body.disability?.useSiAgreeYn) ?? null,
              provideSiAgreeYn: booleanToYN(body.disability?.provideSiAgreeYn) ?? null,
              registerPoolSiAgreeYn: booleanToYN(body.disability?.registerPoolSiAgreeYn) ?? null,
            }
          : null,
        finalSubmitYn: booleanToYN(body.finalSubmitYn),
        noCareerYn: booleanToYN(body.noCareerYn),
        copiedBasicResumeYn: booleanToYN(body.copiedBasicResumeYn),
        usePiAgreeYn: booleanToYN(body.usePiAgreeYn),
        providePiAgreeYn: booleanToYN(body.providePiAgreeYn),
        registerPoolPiAgreeYn: booleanToYN(body.registerPoolPiAgreeYn),
      } satisfies ApplicationSaveReq;
      return saveApplicationResume(resumeId, clone);
    }),
    mutationKey: ['saveApplicationResume', resumeId],
    onError: (e) => {
      if (e.response?.data.header.resultCode === ResumeResultCode.EXPIRED_APPLICATION) {
        return openExpiredApplication();
      }

      openOops();
    },
  });
};

export const useAutosaveApplicationResume = (resumeId: string) => {
  return useMutation({
    mutationFn: refreshAccessTokenWrapper((body: ApplicationAutoSaveReq) => {
      const clone = {
        ...body,
        application: {
          ...(body.application
            ? { ...body.application, finalSubmitYn: booleanToYN(body.application.finalSubmitYn) }
            : null),
        },
        patriot: body.patriot
          ? {
              id: body.patriot?.id ?? null,
              patriotYn: body.patriot?.patriotYn ? booleanToYN(body.patriot?.patriotYn) : null,
              patriotNo: body.patriot?.patriotNo ?? null,
            }
          : null,
        disability: body.disability
          ? {
              id: body.disability?.id ?? null,
              disabilityType: body.disability.disabilityType ?? null,
              disabilityNo: body.disability?.disabilityNo ?? null,
              disability: body.disability?.disability ?? null,
              heavy: body.disability?.heavy ?? null,
              useSiAgreeYn: body.disability?.useSiAgreeYn ?? null,
              provideSiAgreeYn: body.disability?.provideSiAgreeYn ?? null,
              registerPoolSiAgreeYn: body.disability?.registerPoolSiAgreeYn ?? null,
            }
          : null,
        noCareerYn: booleanToYN(body.noCareerYn),
        copiedBasicResumeYn: booleanToYN(body.copiedBasicResumeYn),
        usePiAgreeYn: booleanToYN(body.usePiAgreeYn),
        providePiAgreeYn: booleanToYN(body.providePiAgreeYn),
        registerPoolPiAgreeYn: booleanToYN(body.registerPoolPiAgreeYn),
      } satisfies ApplicationAutoSaveReq;
      return autosaveApplicationResume(resumeId, clone);
    }),
    mutationKey: ['autosaveApplicationResume', resumeId],
  });
};

export const useCreateNewApply = () => {
  const { open } = useSimpleErrorPopup({ errorKey: SimpleErrorKey.OOPS });

  return useMutation({
    mutationFn: refreshAccessTokenWrapper((body: CreateNewApplyReq) => {
      return createNewApply({
        ...body,
        applicationPathDetail: returnIfNilOrEmpty(body.applicationPathDetail),
        usePiAgreeYn: booleanToYN(body.usePiAgreeYn),
        providePiAgreeYn: booleanToYN(body.providePiAgreeYn),
        registerPoolPiAgreeYn: booleanToYN(body.registerPoolPiAgreeYn),
      });
    }),
    onError: open,
  });
};

export const getUseCheckAutosaveQueryKey = (resumeId?: string) => ['checkAutosave', resumeId];
export const useCheckAutosave = (resumeId: string, opt?: Record<string, unknown>) => {
  return useQuery({
    queryKey: [...getUseCheckAutosaveQueryKey(resumeId)],
    queryFn: refreshAccessTokenWrapper(() => checkAutosave(resumeId)),
    select: (response: CheckAutoSaveRes) => {
      return {
        ...response,
        result: { ...response.result, autosaveYn: ynToBoolean(response.result.autosaveYn) },
      } satisfies CheckAutoSaveRes;
    },
    ...opt,
  });
};

export const useGetAutosaveQueryKey = 'getAutosave';
export const useGetAutosave = (resumeId: string) => {
  return useQuery({
    queryKey: [useGetAutosaveQueryKey, resumeId],
    enabled: !isNil(resumeId) && !isEmpty(resumeId) && isString(resumeId),
    queryFn: refreshAccessTokenWrapper(() => getAutosave(resumeId)),
    select: (response: AutosaveResumeRes) => {
      return {
        ...response,
        result: {
          ...response.result,
          patriot: {
            id: response.result.patriot?.id ?? null,
            patriotYn: response.result.patriot?.patriotYn ? ynToBoolean(response.result.patriot.patriotYn) : null,
            patriotNo: response.result.patriot?.patriotNo ?? null,
          },
          disability: {
            id: response.result.disability?.id ?? null,
            disabilityType: response.result.disability?.disabilityType ?? null,
            disabilityNo: response.result.disability?.disabilityNo ?? null,
            disability: response.result.disability?.disability ?? null,
            heavy: response.result.disability?.heavy ?? null,
            useSiAgreeYn: response.result.disability?.useSiAgreeYn
              ? ynToBoolean(response.result.disability?.useSiAgreeYn)
              : null,
            provideSiAgreeYn: response.result.disability?.provideSiAgreeYn
              ? ynToBoolean(response.result.disability?.provideSiAgreeYn)
              : null,
            registerPoolSiAgreeYn: response.result.disability?.registerPoolSiAgreeYn
              ? ynToBoolean(response.result.disability?.registerPoolSiAgreeYn)
              : null,
          },
        },
      } satisfies AutosaveResumeRes;
    },
    retry: false,
    ...lazyUseQueryOption(),
  });
};

export const useDeleteResume = (opt?: UseMutationOptions<void, ServerError, string, unknown>) => {
  return useMutation<void, ServerError, string>({
    mutationFn: refreshAccessTokenWrapper((resumeId: string) => deleteApplicationResume(resumeId)),
    ...opt,
  });
};

export const useApplicationMessage = (applicationId: string | null) => {
  return useQuery({
    queryKey: ['getApplicationMessages', applicationId],
    queryFn: refreshAccessTokenWrapper(() => getApplicationMessages(applicationId)),
    enabled: isString(applicationId) && !isEmpty(applicationId),
    select: (response: MessagesRes) => {
      return {
        ...response,
        result: {
          ...response.result,
          response: {
            ...response.result.response,
            finalSubmitYn: ynToBoolean(response.result.response?.finalSubmitYn),
          },
        },
      } as MessagesRes;
    },
  });
};

export const useCopyBasicResume = () => {
  const { open } = useSimpleErrorPopup({ errorKey: SimpleErrorKey.OOPS });

  return useMutation<unknown, ServerError, string>({
    mutationFn: refreshAccessTokenWrapper((resumeId: string) => copyBasicResume(resumeId)),
    onError: open,
  });
};

export const useCreateMessage = () => {
  return useMutation({
    mutationFn: refreshAccessTokenWrapper((body: CreateMessage) => {
      return createMessages(
        {
          applicationMessageId: body.applicationMessageId,
          fileGroupId: body.fileGroupId,
          contents: body.contents,
          finalSubmitYn: booleanToYN(body.finalSubmitYn),
          treatmentResponse: body.treatmentResponse,
          treatmentResponseFileGroupId: body.treatmentResponseFileGroupId,
        },
        body.applicationId as string
      );
    }),
  });
};
