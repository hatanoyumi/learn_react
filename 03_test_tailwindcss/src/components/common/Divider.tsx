import clsx from 'clsx';
type Props = {
  className?: string;
};
const Divider = ({ className }: Props) => {
  return <div className={clsx('inline-block h-10 w-1 bg-gs-300', className)} />;
};

export default Divider;
