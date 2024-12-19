import { tw } from '@src/utils';
import type { ButtonHTMLAttributes } from 'react';

const MenuButton = (props: Props) => {
  const { children, focused, ...rest } = props;

  return (
    <button className={tw(textStyle(props), shapeStyle(props), colorStyle(props))} {...rest}>
      {children}
    </button>
  );
};

export default MenuButton;

const colorStyle = ({ variant }: Props) => {
  if (variant === 'dark') {
    return 'bg-transparent hover:bg-white/8 active:bg-white/16 disabled:bg-transparent';
  }
  return 'bg-transparent hover:bg-gs-100 active:bg-gs-200 disabled:bg-transparent';
};
const shapeStyle = ({}: Props) => {
  return 'py-9 px-16 rounded-100 w-fit';
};
const textStyle = ({ variant, focused }: Props) => {
  const style = tw('font-300 text-b2 font-700', focused && 'text-primary-500');
  if (variant === 'dark') {
    return tw('text-white disabled:text-white/16', style);
  }
  return tw('text-gs-1000 disabled:text-gs-300', style);
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: 'light' | 'dark';
  focused?: boolean;
};
