import { tw } from '@src/utils';
import type { ButtonHTMLAttributes } from 'react';

const PrimaryButton = (props: Props) => {
  const { variant, children, ...rest } = props;

  return (
    <button
      className={tw('transition-color duration-350', shapeStyle(props), textStyle(props), colorStyle(props))}
      {...rest}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;

const shapeStyle = ({ variant: size }: Props) => {
  const styles = 'rounded-100 w-fit h-fit';
  if (size === 'min') {
    return tw(styles, 'py-12 px-20');
  }
  return tw(styles, 'py-14 px-28 ');
};
const textStyle = ({ variant: size }: Props) => {
  if (size === 'min') {
    return 'text-b3 font-600 text-gs-800 disabled:text-white';
  }
  return 'text-t3 font-700 text-white';
};
const colorStyle = ({ variant: size }: Props) => {
  if (size === 'min') {
    return 'bg-gs-150 hover:bg-gs-200 active:bg-gs-300 disabled:bg-gs-150';
  }
  return 'bg-gs-1100 hover:bg-gs-900 active:bg-gs-700 disabled:bg-gs-300';
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  /**
   * @default 'default';
   */
  variant: 'default' | 'min';
};
