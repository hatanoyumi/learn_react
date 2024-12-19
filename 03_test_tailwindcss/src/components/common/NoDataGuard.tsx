import { memo } from 'react';
import type { ReactNode } from 'react';

const NoDataGuard = ({ children, condition, Placeholder }: NoDataGuardProps) => {
  return <>{condition ? children : Placeholder}</>;
};

export default memo(NoDataGuard);

type NoDataGuardProps = {
  condition: boolean;
  Placeholder: ReactNode;
  children: ReactNode;
};
