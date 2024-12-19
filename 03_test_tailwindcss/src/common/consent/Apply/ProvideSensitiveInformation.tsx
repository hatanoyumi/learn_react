import clsx from 'clsx';

import type { ConsentProps } from '../style';
import { content, highlight } from '../style';

const ProvideSensitiveInformation = ({
  className,
  corporationName = 'NHN 계열법인',
}: ConsentProps & { corporationName?: string }) => {
  return (
    <div className={clsx('text-gs-black', className)}>
      <p className={content}>NHN은 지원자의 동의를 받아 지원 법인에 민감정보를 제공합니다.</p>

      <br />

      <p className={highlight.title}>1. 제공받는 자</p>
      <p className={highlight.content}>{corporationName}</p>

      <br />

      <p className={highlight.title}>2. 제공받는 자의 개인정보 이용 목적</p>
      <p className={highlight.content}>장애인고용촉진 및 직업재활법에 따른 채용 우대자 관리</p>

      <br />

      <p className={highlight.title}>3. 제공하는 개인정보 항목</p>
      <p className={highlight.content}>장애사항</p>

      <br />

      <p className={highlight.title}>4. 제공받는 자의 개인정보 보유 및 이용 기간</p>
      <p className={highlight.content}>
        - 지원자의 개인정보는 회사의 인재풀에 저장되어 상시채용을 위해 5년동안 보관됩니다.
      </p>
      <p className={highlight.content}>
        - 지원자가 개인정보의 삭제를 원하는 경우 지체 없이 해당 개인정보를 삭제합니다.
      </p>

      <br />

      <p className={content}>동의를 거부하실 수 있으며 동의를 거부하실 경우 불이익은 없습니다.</p>
    </div>
  );
};

export default ProvideSensitiveInformation;
