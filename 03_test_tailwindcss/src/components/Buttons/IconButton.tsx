import { ReactComponent as ChevronLeft } from '@icons/systems/chevron/left.svg';
import { getClsByDevice, tw } from '@src/utils';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

const IconButton = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { size, Icon, iconClassName, className, variant, focused, ...rest } = props;

  return (
    <button
      ref={ref}
      className={tw(
        'duration-350 transition-all focus-visible:outline-none',
        shapeStyle(props),
        colorStyle(props),
        className
      )}
      {...rest}
    >
      {Icon ?? <ChevronLeft className={tw(iconStyle(props), iconClassName)} />}
    </button>
  );
});

export default IconButton;
IconButton.displayName = 'IconButton';

const colorStyle = ({ variant, focused }: Props) => {
  switch (variant) {
    case 'light':
      return 'bg-transparent hover:bg-gs-100 group-hover:bg-gs-100 active:bg-gs-200 group-active:bg-gs-200 text-gs-black disabled:bg-transparent group-disabled:bg-transparent';
    case 'dark':
      return 'bg-gs-white/4 hover:bg-gs-white/8 group-hover:bg-gs-white/8 active:bg-gs-white/16 group-active:bg-gs-white/16 text-gs-white disabled:text-gs-white/24 group-disabled:text-gs-white/24 disabled:bg-transparent group-disabled:bg-transparent';
    case 'black':
      return tw(
        'bg-black hover:bg-gs-900 group-hover:bg-gs-900 active:bg-gs-800 group-active:bg-gs-800 focus:bg-gs-black focus-within:bg-gs-black text-gs-white disabled:bg-gs-200 group-disabled:bg-gs-200',
        focused && 'bg-gs-black'
      );
    case 'gray':
      return 'bg-gs-150 text-gs-1000 hover:bg-gs-200';
    case 'white':
      return tw(
        'bg-gs-white text-black hover:bg-gs-200 group-hover:bg-gs-200 active:bg-gs-150 group-active:bg-gs-150 disabled:bg-gs-white/8 disabled:text-gs-300 group-disabled:text-gs-300',
        focused && 'bg-gs-white'
      );
  }
};

const shapeStyle = ({ size = 'default' }: Props) => {
  const styles = 'rounded-100 flex items-center justify-center';

  switch (size) {
    case 'default':
      return getClsByDevice({
        common: styles,
        desktop: 'size-40',
        mobile: 'size-40',
      });
    case 'large':
      return tw(styles, 'size-48 p-8');
    case 'xlarge':
      return tw(styles, 'size-64 p-16');
  }
};

const iconStyle = ({ size }: Props) => {
  switch (size) {
    case 'default':
      return 'size-24';
    case 'large':
      return 'size-32';
    case 'xlarge':
      return 'size-32';
  }
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: 'light' | 'dark' | 'black' | 'white' | 'gray';
  /**
   * @default 'default';
   */
  size: 'default' | 'large' | 'xlarge';
  /**
   * @default ChevronLeft
   */
  Icon?: ReactNode;
  iconClassName?: string;
  focused?: boolean;
};
