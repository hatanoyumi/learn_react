import { apiClient } from '../axios';
import { apiPrefix, getURIByPrefix } from '../urls';

import type {
  DeleteFileReq,
  FileUploadPolicyReq,
  FileUploadPolicyRes,
  UploadFileReq,
  UploadFileRes,
} from './interface';

const getFileGroupURL = getURIByPrefix(apiPrefix.files.groups);

export const uploadCareerDetail = async (data: UploadFileReq) => {
  const res = await apiClient.post<UploadFileRes>(apiPrefix.files.upload.careerDetail, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const uploadVocs = async (data: FormData) => {
  const res = await apiClient.post<UploadFileRes>(apiPrefix.files.upload.voc, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const uploadPortfolios = async (data: FormData) => {
  const res = await apiClient.post<UploadFileRes>(apiPrefix.files.upload.portfolio, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const uploadJoiningPhotos = async (data: FormData) => {
  const res = await apiClient.post<UploadFileRes>(apiPrefix.files.upload.joiningPhotos, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const getFileUploadPolicies = async (data: FileUploadPolicyReq) => {
  const res = await apiClient.get<FileUploadPolicyRes>(apiPrefix.files.policies, {
    params: {
      policyEnum: data.param,
    },
  });
  return res.data;
};

export const uploadApplicationMessages = async (data: FormData) => {
  const res = await apiClient.post<UploadFileRes>(apiPrefix.files.upload.applicationMessages, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const uploadApplicationTreatmentMessages = async (data: FormData) => {
  const res = await apiClient.post<UploadFileRes>(apiPrefix.files.upload.applicationTreatmentMessages, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const deleteFile = async (data: DeleteFileReq) => {
  const res = await apiClient.delete(getFileGroupURL(`/${data.fileGroupId}/files/${data.fileId}`));
  return res.data;
};
