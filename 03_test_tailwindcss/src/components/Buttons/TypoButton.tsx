import { ReactComponent as ArrowLeft } from '@icons/systems/arrow/left.svg';
import { ReactComponent as ArrowRight } from '@icons/systems/arrow/right.svg';
import { tw } from '@src/utils';
import { get } from 'lodash';
import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { isMobile } from 'react-device-detect';

const TypoButton = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { children, variant, focused: _focused = false, className, ...rest } = props;

  return (
    <button
      ref={ref}
      className={tw(
        'transition-color duration-350 text-left',
        textStyle(props),
        shapeStyle(props),
        get(colorStyle, variant),
        className
      )}
      {...rest}
    >
      {variant === 'leading' && <ArrowLeft className='size-24 text-gs-black' />}
      {children}
      {variant === 'trailing' && <ArrowRight className='size-24 text-gs-black' />}
    </button>
  );
});

export default TypoButton;
TypoButton.displayName = 'TypoButton';

const textStyle = ({ focused, variant }: Props) => {
  const textStyle: Record<Props['variant'], string> = {
    leading: tw('font-700 text-gs-1000 disabled:text-gs-300', isMobile ? 'font-700 text-t2-m' : 'font-700 text-t3'),
    trailing: tw('font-700 text-gs-1000 disabled:text-gs-300', isMobile ? 'font-700 text-t3-m' : 'font-700 text-t3'),
    dark: tw(
      'font-700 text-gs-700 hover:text-gs-500 active:text-gs-200 disabled:text-gs-900',
      isMobile ? 'font-700 text-t1-m' : 'font-700 text-t1'
    ),
    1: tw(
      'font-700 text-gs-500 hover:text-gs-black active:text-gs-black disabled:text-gs-300',
      focused && 'text-primary-500 hover:text-primary-500',
      isMobile ? 'font-700 text-t3-m' : 'font-700 text-t3'
    ),
    2: tw(
      'font-700 text-gs-500 hover:text-gs-700 active:text-gs-900 disabled:text-gs-300',
      focused && 'text-gs-black hover:text-gs-black',
      isMobile ? 'font-700 text-t3-m' : 'font-700 text-t3'
    ),
    min: tw(
      'font-600 text-gs-500 hover:text-gs-700 active:text-gs-900 disabled:text-gs-300',
      focused && 'text-gs-black hover:text-gs-black',
      isMobile ? 'font-600 text-t3-m' : 'font-600 text-t3'
    ),
  };

  return get(textStyle, variant);
};
const shapeStyle = ({ focused, variant, disabled }: Props) => {
  const shapeStyle: Record<Props['variant'], string> = {
    leading: 'py-12 px-16 flex gap-x-12 items-center rounded-12 w-fit',
    trailing: 'py-12 px-12 flex gap-x-12 items-center rounded-12 w-fit',
    dark: 'py-8 w-fit',
    1: tw(
      'py-8 w-fit border-b-2 border-solid border-transparent',
      !disabled && focused && 'border-primary-500 active:border-gs-black'
    ),
    2: 'py-8 w-fit',
    min: 'py-8 w-fit',
  };

  return get(shapeStyle, variant);
};
const colorStyle: Record<Props['variant'], string> = {
  leading: 'hover:bg-gs-150 bg-transparent active:bg-gs-200 disabled:bg-transparent',
  trailing: 'hover:bg-gs-150 bg-transparent active:bg-gs-200 disabled:bg-transparent',
  dark: '',
  1: '',
  2: '',
  min: '',
};

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant: 'leading' | 'trailing' | 'dark' | '1' | '2' | 'min';
  /**
   * @default false
   */
  focused?: boolean;
};
