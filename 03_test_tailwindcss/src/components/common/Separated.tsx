import type { PropsWithChildren, ReactNode } from 'react';
import { Children, Fragment, isValidElement } from 'react';

interface Props extends PropsWithChildren {
  with: ReactNode;
}

export function Separated({ children, with: separator }: Props) {
  const childrenArray = Children.toArray(children).filter(isValidElement);
  const childrenLength = childrenArray.length;

  return (
    <>
      {childrenArray.map((child, i) => (
        <Fragment key={i}>
          {child}
          {i + 1 !== childrenLength ? separator : null}
        </Fragment>
      ))}
    </>
  );
}
