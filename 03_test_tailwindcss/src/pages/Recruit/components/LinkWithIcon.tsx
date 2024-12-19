import { ReactComponent as ArrowMiniRight } from '@icons/systems/arrow_mini/right.svg';
import { bgBlackCircleInIconAndCenter } from '@src/common/consent/style';
import { Link } from 'react-router-dom';

interface ILinkWithIcon {
  href: string;
  prefix: string;
  postfix: string;
  icon?: boolean;
}
const LinkWithIcon = ({ href, prefix, postfix, icon }: ILinkWithIcon) => {
  return (
    <Link to={href} className='flex items-center gap-x-16 font-300 font-700 text-t3'>
      <span>{prefix}</span> <span>{postfix}</span>
      <div className={bgBlackCircleInIconAndCenter({ size: 40 })}>{icon && <ArrowMiniRight fill='white' />}</div>
    </Link>
  );
};

export default LinkWithIcon;
