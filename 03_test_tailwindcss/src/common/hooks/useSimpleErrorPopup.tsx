import Br from '@src/components/common/Br';
import { getDefaultStore } from 'jotai';
import { get } from 'lodash';
import type { ReactNode } from 'react';
import { useCallback } from 'react';

import { errorMessagesAtom } from '../store/atom';

const useSimpleErrorPopup = ({ Message, errorKey, Body, onClose }: SimpleErrorProps) => {
  const store = getDefaultStore();

  const addError = useCallback(() => {
    store.set(errorMessagesAtom, (prev) => {
      if (prev.map((it) => it.errorKey).includes(errorKey)) {
        return prev;
      }

      return [
        ...prev,
        {
          Message: Message ? Message : get(SimpleErrorMessageMap, errorKey),
          errorKey,
          Body: Body ? Body : get(SimpleErrorBodyMap, errorKey),
          onClose,
        },
      ];
    });
  }, [store]);

  return {
    open: addError,
  };
};

export default useSimpleErrorPopup;

/**
 * @description 새로운 에러 형식이 필요할 때마다 추가해서 사용 (에러 팝업 무한 루프 방지용 키)
 */
export const SimpleErrorKey = {
  INVALID_FILE: 'INVALID_FILE',
  NO_DEFAULT_RESUME: 'NO_DEFAULT_RESUME',
  OOPS: 'OOPS',
  ACCOUNT_NOT_FOUND: 'ACCOUNT_NOT_FOUND',
  ACCOUNT_LOCKED: 'ACCOUNT_LOCKED',
  WRONG_AUTH: 'WRONG_AUTH',
  ACCOUNT_IN_USE: 'ACCOUNT_IN_USE',
  PHONE_IN_USE: 'PHONE_IN_USE',
  EMAIL_IN_USE: 'EMAIL_IN_USE',
  INVALID_AGE: 'INVALID_AGE',
  INDELIBLE_RESUME: 'INDELIBLE_RESUME',
  WRONG_PASSWORD: 'WRONG_PASSWORD',
  EXPIRED_APPLICATION: 'EXPIRED_APPLICATION',
  INVALID_END_DATE: 'INVALID_END_DATE',
  INVALID_EXPECTED_GRADUATE_AT: 'INVALID_EXPECTED_GRADUATE_AT',
  INVALID_UPLOAD_PROFILE: 'INVALID_UPLOAD_PROFILE',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
} as const;

/**
 * @description 기본 에러 메시지
 */
const SimpleErrorMessageMap = {
  [SimpleErrorKey.OOPS]: 'Oooops !',
  [SimpleErrorKey.ACCOUNT_NOT_FOUND]: '일치하는 계정 정보가 없습니다.',
  [SimpleErrorKey.ACCOUNT_LOCKED]: (
    <span className=' '>
      5회 이상 비밀번호가 일치하지 않아
      <br />
      계정이 잠겼습니다.
    </span>
  ),
  [SimpleErrorKey.WRONG_AUTH]: (
    <span className=' '>
      이메일 또는 비밀번호가
      <Br mobile /> 올바르지 않습니다.
      <br />
      다시 확인해 주세요.
    </span>
  ),
  [SimpleErrorKey.ACCOUNT_IN_USE]: '이미 가입된 계정입니다.',
  [SimpleErrorKey.PHONE_IN_USE]: '이미 사용 중인 휴대폰 번호입니다.',
  [SimpleErrorKey.EMAIL_IN_USE]: '이미 사용 중인 이메일 주소입니다.',
  [SimpleErrorKey.INVALID_AGE]: '14세 미만으로 회원가입이 어렵습니다.',
  [SimpleErrorKey.INDELIBLE_RESUME]: '마이페이지에서 지원서를 삭제할 수 없습니다.',
  [SimpleErrorKey.WRONG_PASSWORD]: '비밀번호가 올바르지 않습니다.',
  [SimpleErrorKey.EXPIRED_APPLICATION]: '접수 기간이 마감되었습니다.',
  [SimpleErrorKey.INVALID_END_DATE]: '종료일은 시작일보다 늦어야 합니다.',
  [SimpleErrorKey.INVALID_EXPECTED_GRADUATE_AT]: '졸업 예정일은 현재 날짜보다 같거나 늦어야 합니다.',
  [SimpleErrorKey.INVALID_UPLOAD_PROFILE]: '첨부된 파일을 먼저 삭제해 주세요!',
  [SimpleErrorKey.RESOURCE_NOT_FOUND]: '자산정보조회를 위한 직군 코드가 없습니다.',
};
/**
 * @description 에러 메시지 하단에 노출되는 문구
 */
const SimpleErrorBodyMap = {
  [SimpleErrorKey.OOPS]: '예상치 못한 오류 처리중입니다ㅠㅠ',
  [SimpleErrorKey.INDELIBLE_RESUME]: '1:1 문의를 통해 삭제 요청 부탁드립니다.',
  [SimpleErrorKey.EXPIRED_APPLICATION]: '더 이상 지원서를 제출할 수 없습니다.',
  [SimpleErrorKey.INVALID_UPLOAD_PROFILE]: (
    <span>
      기존 첨부된 파일이 있는 상태에서는
      <br />
      새로운 이미지를 첨부할 수 없습니다.
    </span>
  ),
  [SimpleErrorKey.RESOURCE_NOT_FOUND]: (
    <span>
      채용 담당자가 채용발령정보를 등록 해야합니다.
      <br />
      부탁드립니다.
    </span>
  ),
  [SimpleErrorKey.ACCOUNT_LOCKED]: '비밀번호 찾기를 통해 잠금을 해제해 주세요.',
};

export type SimpleErrorProps = {
  Message?: ReactNode;
  errorKey: keyof typeof SimpleErrorKey;
  Body?: ReactNode;
  onClose?: () => void | Promise<void>;
};

export type SimpleErrorKeyType = keyof typeof SimpleErrorKey;
