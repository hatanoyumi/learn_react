import type { HTMLAttributes } from 'react';
import { memo } from 'react';

import type { CorpsType } from '../../common/constants';
import { CorpsImageObject } from '../../common/constants';
const CorpImage = ({ corp, className, ...rest }: HTMLAttributes<HTMLImageElement> & { corp: CorpsType }) => {
  return <img className={className} alt={corp} src={CorpsImageObject[corp]} {...rest} />;
};

export default memo(CorpImage);
