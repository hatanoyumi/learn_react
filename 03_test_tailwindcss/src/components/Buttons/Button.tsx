import { tw } from '@src/utils';
import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ForwardedRef } from 'react';

const Button = forwardRef((props: Props, ref: ForwardedRef<HTMLButtonElement>) => {
  const { children, variant, size, className, ...rest } = props;
  return (
    <button
      ref={ref}
      className={tw('transition-color duration-350', textStyle(props), colorStyle(props), shapeStyle(props), className)}
      {...rest}
    >
      {children}
    </button>
  );
});

const textStyle = ({ variant, size }: Props) => {
  const styles = [];

  switch (variant) {
    case 'fill':
      styles.push('text-white');
      break;
    case 'border':
      styles.push('text-gs-800 disabled:text-gs-300');
      break;
    case 'black':
      styles.push('text-white');
      break;
    case 'gray':
      styles.push('text-gs-800', size === 'small' ? 'disabled:text-gs-300' : 'disabled:text-white');
      break;
  }

  if (size === 'small') {
    styles.push('font-300 text-b2');
  } else {
    styles.push('font-400 text-b1 font-700');
  }

  return styles.join(' ');
};
const colorStyle = ({ variant, size }: Props) => {
  const styles = ['border border-1'];
  switch (variant) {
    case 'fill':
      styles.push('bg-primary-500', 'hover:bg-primary-400', 'active:bg-primary-300', 'disabled:bg-gs-300');
      break;
    case 'border':
      styles.push(
        'bg-white',
        'border-gs-400',
        'hover:bg-gs-100',
        'active:bg-gs-150',
        'disabled:bg-white disabled:border-gs-200'
      );
      break;
    case 'black':
      styles.push('bg-gs-1000', 'hover:bg-gs-900', 'active:bg-gs-700', 'disabled:bg-gs-300');
      break;
    case 'gray':
      styles.push(
        'bg-gs-150',
        'hover:bg-gs-200',
        'active:bg-gs-300',
        size === 'small' ? 'disabled:bg-gs-100' : 'disabled:bg-gs-200'
      );
      break;
  }
  return styles.join(' ');
};
const shapeStyle = ({ size = 'large' }: Props) => {
  const styles = ['w-fit h-fit rounded-4'];
  if (size === 'large') {
    styles.push('min-w-184 min-h-58 px-53');
  }
  if (size === 'medium') {
    styles.push('min-w-120 min-h-48 px-21');
  }
  if (size === 'small') {
    styles.push('min-w-80 min-h-36 px-12');
  }

  return styles.join(' ');
};

export default Button;
Button.displayName = 'Button';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: 'fill' | 'border' | 'black' | 'gray';
  /**
   * @default 'large'
   */
  size: 'large' | 'medium' | 'small';
};
