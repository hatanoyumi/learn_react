import { apiClient } from '../axios';
import { apiPrefix, getURIByPrefix } from '../urls';

import type {
  ApplicantsJobPostingRes,
  ChangePasswordReq,
  ChangePasswordRes,
  DeleteMeReq,
  GetMeReq,
  MeReq,
  MeRes,
  PrivacyCheckReq,
  PrivacyCheckRes,
} from './interface';

const getApplicantsURL = getURIByPrefix(apiPrefix.applicants);

export const changePassword = async (body: ChangePasswordReq) => {
  const res = await apiClient.post<ChangePasswordRes>(getApplicantsURL('/change-password'), body);
  return res.data;
};

export const me = async (params?: GetMeReq) => {
  const res = await apiClient.get<MeRes>(getApplicantsURL(), {
    params,
  });
  return res.data;
};

export const updateMe = async (body: MeReq) => {
  const res = await apiClient.patch<MeRes>(getApplicantsURL(), body);
  return res.data;
};

export const applicantsJobPostings = async () => {
  const res = await apiClient.get<ApplicantsJobPostingRes>(getApplicantsURL('/job-postings'));
  return res.data;
};

export const deleteMe = async (body: DeleteMeReq) => {
  const res = await apiClient.delete(getApplicantsURL(), { data: body });
  return res.data;
};

export const privacyCheck = async (body: PrivacyCheckReq) => {
  const res = await apiClient.post<PrivacyCheckRes>(getApplicantsURL('/privacy'), body);
  return res.data;
};
