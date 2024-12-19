import { tw } from '@src/utils';
import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';

const SwipeButton = ({ variant, ...rest }: Props) => {
  return (
    <button
      className={tw(
        'transition-color duration-350',
        'h-fit w-fit px-4 py-10 text-gs-1100 disabled:text-gs-400',
        variant === 'prev' && 'rotate-180'
      )}
      {...rest}
    >
      <Arrow className='size-32' />
    </button>
  );
};

export default SwipeButton;

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: 'prev' | 'next';
};

const Arrow = (props: HTMLAttributes<SVGSVGElement>) => (
  <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M24.6915 17.4517H1.12012V14.4517H24.6494L19.6924 9.02287L21.9078 7L30.0728 15.942L21.9172 25.0425L19.683 23.0404L24.6915 17.4517Z'
      fill='currentcolor'
    />
  </svg>
);
