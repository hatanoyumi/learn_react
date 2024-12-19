import { getClsByDevice } from '@src/utils';

const Br = ({ mobile = false, desktop = false }: Props) => {
  return (
    <br
      className={getClsByDevice({
        desktop: desktop ? '' : 'hidden',
        mobile: mobile ? '' : 'hidden',
      })}
    />
  );
};

export default Br;

type Props = {
  mobile?: boolean;
  desktop?: boolean;
};
