import { withClsx } from '@src/utils';
import type { ReactNode } from 'react';

const Title = ({ children, className }: { children?: ReactNode; className?: string }) => (
  <h2 className={getTitleStyle(className)}>{children}</h2>
);

export default Title;

const getTitleStyle = withClsx('text-body1 font-semibold text-gs-black');
