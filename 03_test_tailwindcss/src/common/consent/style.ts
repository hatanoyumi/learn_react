export const title = 'text-16 font-700 leading-normal';
export const content = 'text-16 leading-normal font-400 tracking-tight';
export const highlight = {
  title: 'text-20 font-bold leading-normal',
  content: 'text-20 leading-normal font-bold tracking-tight',
};
export const flexCenter = 'flex items-center justify-center';

export type ConsentProps = {
  className?: string;
};

export const bgBlackCircleInIconAndCenter = ({ size }: { size: number }) => {
  return `inset-y-0 right-0 flex size-${size} items-center  justify-center rounded-40 bg-gs-black`;
};
