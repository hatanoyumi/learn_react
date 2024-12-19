import clsx from 'clsx';

import type { ConsentProps } from '../style';
import { content, highlight, title } from '../style';

const PersonalInformation = ({ className }: ConsentProps) => {
  return (
    <div className={clsx('text-gs-black', className)}>
      <p className={content}>NHN은 지원서 작성 및 채용 전형 진행을 위해 아래와 같은 개인정보를 수집합니다.</p>

      <br />

      <p className={title}>1. 수집·이용 목적</p>
      <p className={content}>
        지원서 저장 및 수정, 인재풀 활용, 적합한 채용 공고 추천, 채용 전형 진행, 자격요건의 확인, 합격여부 확인,
        지원자와의 원활한 의사소통 경로 확보
      </p>

      <br />

      <p className={title}>2. 수집·이용 항목</p>
      <p className={content}>
        성명, 이메일주소, 생년월일, 휴대폰번호, 학력사항, 병역사항, 보훈대상여부, 경력사항, 스킬, 자격사항, 어학사항,
        수상내역, 봉사활동내역, 면접결과, 코딩테스트 결과, 인성검사 결과, 과거지원이력, 기타 첨부자료(과제/포트폴리오
        등)
      </p>

      <br />

      <p className={highlight.title}>3. 보유 및 이용 기간</p>
      <p className={highlight.content}>
        - 지원자의 개인정보는 회사의 인재풀에 저장되어 상시채용을 위해 5년동안 보관됩니다. (단, 임시 저장 된 상태의
        지원서는 7일간 보관 후 삭제됩니다.)
      </p>
      <p className={highlight.content}>
        - 지원자가 개인정보의 삭제를 원하는 경우 지체 없이 해당 개인정보를 삭제합니다.
      </p>

      <br />

      <p className={content}>
        동의를 거부하실 수 있으나, 동의를 거부하실 경우 지원서 작성 및 채용 전형 진행이 제한될 수 있습니다.
      </p>
    </div>
  );
};

export default PersonalInformation;
