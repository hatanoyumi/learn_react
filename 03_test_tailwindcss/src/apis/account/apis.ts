import { apiClient } from '../axios';
import { apiPrefix, getURIByPrefix } from '../urls';

import type {
  FindEmailReq,
  FindEmailRes,
  FindPasswordReq,
  FindPasswordRes,
  RenewAccessToken,
  ResetPasswordReq,
  ResetPasswordRes,
  SendVerificationEmailReq,
  SendVerificationEmailRes,
  SignInReq,
  SignInRes,
  SignOutRes,
  SignUpReq,
  SignUpRes,
  VerifyEmailReq,
  VerifyEmailRes,
} from './interface';

const getAccountURL = getURIByPrefix(apiPrefix.accounts);
const getVerificationURL = getURIByPrefix(apiPrefix.identityVerifications);

export const signIn = async (body: SignInReq) => {
  const res = await apiClient.post<SignInRes>(getAccountURL('/sign-in'), body);
  return res.data;
};

export const signOut = async () => {
  const res = await apiClient.post<SignOutRes>(getAccountURL('/sign-out'));
  return res.data;
};

export const signUp = async (body: SignUpReq) => {
  const res = await apiClient.post<SignUpRes>(getAccountURL(), body);
  return res.data;
};

export const sendVerificationEmail = async (body: SendVerificationEmailReq) => {
  const res = await apiClient.post<SendVerificationEmailRes>(getVerificationURL('/send-email'), body);
  return res.data;
};

export const verifyEmail = async (body: VerifyEmailReq) => {
  const res = await apiClient.patch<VerifyEmailRes>(getVerificationURL('/verify'), body);
  return res.data;
};

export const findEmail = async (body: FindEmailReq) => {
  const res = await apiClient.post<FindEmailRes>(getAccountURL('/find'), body);
  return res.data;
};

export const findPassword = async (body: FindPasswordReq) => {
  const res = await apiClient.post<FindPasswordRes>(getAccountURL('/find-password'), body);
  return res.data;
};

export const resetPassword = async (params: ResetPasswordReq) => {
  const res = await apiClient.patch<ResetPasswordRes>(getAccountURL('/reset-password'), null, {
    params,
  });
  return res.data;
};

export const renewAccessToken = async () => {
  const res = await apiClient.post<RenewAccessToken>(getAccountURL('/renew'));
  return res.data;
};
