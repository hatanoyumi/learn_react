import { ReactComponent as ArrowUpRight } from '@icons/systems/arrow/up_right.svg';
import type { ButtonHTMLAttributes } from 'react';

const MinimalButton = (props: Props) => {
  const { children, ...rest } = props;

  return (
    <button
      className='transition-color duration-350 flex h-fit w-fit gap-x-8 p-8 font-300 text-b3 text-gs-600 hover:text-gs-900 active:text-gs-black disabled:text-gs-600'
      {...rest}
    >
      {children}
      <ArrowUpRight className='size-16 text-gs-black' />
    </button>
  );
};

export default MinimalButton;

type Props = ButtonHTMLAttributes<HTMLButtonElement>;
