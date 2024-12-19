import { apiClient } from '../axios';
import { apiPrefix, getURIByPrefix } from '../urls';

import type {
  ApplicationAutoSaveReq,
  ApplicationResumeReq,
  ApplicationResumeRes,
  ApplicationSaveReq,
  ApplicationSaveRes,
  AutosaveResumeRes,
  CheckAutoSaveRes,
  CreateMessage,
  CreateNewApplyReq,
  CreateNewApplyRes,
  CreateResumeReq,
  CreateResumeRes,
  MessagesRes,
} from './interface';

const getApplicationsURL = getURIByPrefix(apiPrefix.applications);
const getResumesURL = getURIByPrefix(apiPrefix.resumes);
const getAutosaveApplicationURL = getURIByPrefix(apiPrefix.autosave);

export const createApplicationResume = async (body: CreateResumeReq) => {
  const res = await apiClient.post<CreateResumeRes>(getResumesURL(), body);
  return res.data;
};

export const getApplicationResume = async (data: ApplicationResumeReq) => {
  const res = await apiClient.get<ApplicationResumeRes>(getResumesURL(`/${data.resumeId}`));
  return res.data;
};

export const saveApplicationResume = async (resumeId: string, body: ApplicationSaveReq) => {
  const res = await apiClient.put<ApplicationSaveRes>(getResumesURL(`/${resumeId}`), body);
  return res.data;
};

export const autosaveApplicationResume = async (resumeId: string, body: ApplicationAutoSaveReq) => {
  const res = await apiClient.put<ApplicationSaveRes>(getAutosaveApplicationURL(`/${resumeId}`), body);
  return res.data;
};

export const createNewApply = async (body: CreateNewApplyReq) => {
  const res = await apiClient.post<CreateNewApplyRes>(getApplicationsURL(), body);
  return res.data;
};

export const checkAutosave = async (resumeId: string) => {
  const res = await apiClient.get<CheckAutoSaveRes>(getResumesURL(`/${resumeId}/check-autosave`));
  return res.data;
};

export const getAutosave = async (resumeId: string) => {
  const res = await apiClient.get<AutosaveResumeRes>(getAutosaveApplicationURL(`/${resumeId}`));
  return res.data;
};

export const deleteApplicationResume = async (resumeId: string) => {
  const res = await apiClient.delete(getResumesURL(`/${resumeId}`));
  return res.data;
};

export const getApplicationMessages = async (applicationId: string | null) => {
  const res = await apiClient.get<MessagesRes>(getApplicationsURL(`/${applicationId}/messages/last`));
  return res.data;
};

export const copyBasicResume = async (resumeId: string) => {
  const res = await apiClient.put(getResumesURL(`/${resumeId}/copy-of-basic-resume`));
  return res.data;
};

export const createMessages = async (body: CreateMessage, applicationId: string) => {
  const res = await apiClient.post<MessagesRes>(
    getApplicationsURL(`/${applicationId}/messages/${body.applicationMessageId}`),
    body
  );
  return res.data;
};
