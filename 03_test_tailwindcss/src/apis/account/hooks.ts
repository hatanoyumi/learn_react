import useSimpleErrorPopup, { SimpleErrorKey } from '@src/common/hooks/useSimpleErrorPopup';
import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useMeQueryKey } from '../applicants';
import type { ServerError } from '../utils';

import {
  findEmail,
  findPassword,
  renewAccessToken,
  resetPassword,
  sendVerificationEmail,
  signIn,
  signOut,
  signUp,
  verifyEmail,
} from './apis';
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
  SignUpReq,
  SignUpRes,
  VerifyEmailReq,
} from './interface';

export const useSignIn = (opt?: UseMutationOptions<SignInRes, ServerError, SignInReq, unknown>) => {
  const client = useQueryClient();
  const { open } = useSimpleErrorPopup({ errorKey: SimpleErrorKey.OOPS });

  return useMutation({
    mutationFn: (body: SignInReq) => signIn(body),
    onError: () => open(),
    onSuccess: () => {
      client.invalidateQueries([useMeQueryKey]);
    },
    ...opt,
  });
};

export const useSignOut = () => {
  const client = useQueryClient();
  const { open } = useSimpleErrorPopup({ errorKey: SimpleErrorKey.OOPS });

  return useMutation({
    mutationFn: () => signOut(),
    onError: () => open(),
    onSuccess: () => {
      client.resetQueries({ queryKey: [useMeQueryKey] });
    },
  });
};

export const useSignUp = (opt?: UseMutationOptions<SignUpRes, ServerError, SignUpReq>) => {
  const client = useQueryClient();
  const { open } = useSimpleErrorPopup({ errorKey: SimpleErrorKey.OOPS });

  return useMutation<SignUpRes, ServerError, SignUpReq>({
    mutationFn: (body: SignUpReq) => signUp(body),
    onError: () => open(),
    onSuccess: () => {
      client.invalidateQueries([useMeQueryKey]);
    },
    ...opt,
  });
};

export const useSendVerificationEmail = () => {
  return useMutation<SendVerificationEmailRes, ServerError, SendVerificationEmailReq>({
    mutationFn: (body: SendVerificationEmailReq) => sendVerificationEmail(body),
  });
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (body: VerifyEmailReq) => verifyEmail(body),
  });
};

export const useFindEmail = (opt?: UseMutationOptions<FindEmailRes, ServerError, FindEmailReq, unknown>) => {
  const { open } = useSimpleErrorPopup({ errorKey: SimpleErrorKey.OOPS });

  return useMutation<FindEmailRes, ServerError, FindEmailReq>({
    mutationFn: (body: FindEmailReq) => findEmail(body),
    onError: () => open(),
    ...opt,
  });
};

export const useFindPassword = (opt?: UseMutationOptions<FindPasswordRes, ServerError, FindPasswordReq, unknown>) => {
  const { open } = useSimpleErrorPopup({ errorKey: SimpleErrorKey.OOPS });

  return useMutation({
    mutationFn: (body: FindPasswordReq) => findPassword(body),
    onError: () => open(),
    ...opt,
  });
};

export const useResetPassword = (
  opt?: UseMutationOptions<ResetPasswordRes, ServerError, ResetPasswordReq, unknown>
) => {
  const { open } = useSimpleErrorPopup({ errorKey: SimpleErrorKey.OOPS });

  return useMutation({
    mutationFn: (body: ResetPasswordReq) => resetPassword(body),
    onError: () => open(),
    ...opt,
  });
};

export const useRenewAccessToken = () => {
  return useMutation<RenewAccessToken, ServerError>({
    mutationFn: () => renewAccessToken(),
    retry: false,
  });
};
