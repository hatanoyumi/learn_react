import clsx from 'clsx';

import type { ConsentProps } from '../style';
import { content, highlight, title } from '../style';

const PersonalInformation = ({ className }: ConsentProps) => {
  return (
    <div className={clsx('text-gs-black', className)}>
      <p className={content}>NHN은 NHN Careers 회원가입을 위해 아래와 같은 개인정보를 수집합니다.</p>

      <br />

      <p className={title}>1. 수집·이용 목적</p>
      <p className={content}>
        지원자 관리, 채용 전형 진행, 고지사항 전달, 각종 문의 대응, 지원자와의 원활한 의사소통 경로 확보
      </p>

      <br />

      <p className={title}>2. 수집·이용 항목</p>
      <p className={content}>이름, 생년월일, 휴대폰번호, 이메일주소, 내외국인 정보, 국내/해외 거주여부, 비밀번호</p>

      <br />

      <p className={highlight.title}>3. 보유 및 이용 기간</p>
      <p className={highlight.content}>회원 탈퇴 시까지</p>

      <br />

      <p className={content}>동의를 거부하실 수 있으나, 동의를 거부하실 경우 회원가입이 제한될 수 있습니다.</p>
    </div>
  );
};

export default PersonalInformation;
