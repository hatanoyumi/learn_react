import useSimpleErrorPopup, { SimpleErrorKey } from '@src/common/hooks/useSimpleErrorPopup';
import { useMutation, useQuery } from '@tanstack/react-query';

import { lazyUseQueryOption, refreshAccessTokenWrapper } from '../utils';

import {
  deleteFile,
  getFileUploadPolicies,
  uploadApplicationMessages,
  uploadApplicationTreatmentMessages,
  uploadCareerDetail,
  uploadJoiningPhotos,
  uploadPortfolios,
  uploadVocs,
} from './apis';
import type { DeleteFileReq, FileUploadPolicyReq, UploadFileReq } from './interface';

export const useUploadCareerDetail = () => {
  const { open } = useSimpleErrorPopup({ errorKey: SimpleErrorKey.OOPS });

  return useMutation({
    mutationFn: refreshAccessTokenWrapper((body: UploadFileReq) => uploadCareerDetail(body)),
    onError: open,
  });
};

export const useUploadVocs = () => {
  const { open } = useSimpleErrorPopup({ errorKey: SimpleErrorKey.OOPS });

  return useMutation({
    mutationFn: refreshAccessTokenWrapper((body: FormData) => uploadVocs(body)),
    onError: open,
  });
};

export const useUploadPortfolios = () => {
  const { open } = useSimpleErrorPopup({ errorKey: SimpleErrorKey.OOPS });

  return useMutation({
    mutationFn: refreshAccessTokenWrapper((body: FormData) => uploadPortfolios(body)),
    onError: open,
  });
};

export const useUploadJoiningPhotos = () => {
  const { open } = useSimpleErrorPopup({ errorKey: SimpleErrorKey.OOPS });

  return useMutation({
    mutationFn: refreshAccessTokenWrapper((body: FormData) => uploadJoiningPhotos(body)),
    onError: open,
  });
};

export const useGetFileUploadPolicies = (data: FileUploadPolicyReq) => {
  return useQuery({
    queryKey: ['getFileUploadPolicies', data.param, data],
    queryFn: refreshAccessTokenWrapper(() => getFileUploadPolicies(data)),
    ...lazyUseQueryOption(),
  });
};

export const useUploadApplicationMessages = () => {
  const { open } = useSimpleErrorPopup({ errorKey: SimpleErrorKey.OOPS });

  return useMutation({
    mutationFn: refreshAccessTokenWrapper((body: FormData) => uploadApplicationMessages(body)),
    onError: open,
  });
};

export const useUploadApplicationTreatmentMessages = () => {
  const { open } = useSimpleErrorPopup({ errorKey: SimpleErrorKey.OOPS });

  return useMutation({
    mutationFn: refreshAccessTokenWrapper((body: FormData) => uploadApplicationTreatmentMessages(body)),
    onError: open,
  });
};

export const useDeleteFile = () => {
  const { open } = useSimpleErrorPopup({ errorKey: SimpleErrorKey.OOPS });

  return useMutation({
    mutationFn: refreshAccessTokenWrapper((data: DeleteFileReq) => deleteFile(data)),
    onError: open,
  });
};
