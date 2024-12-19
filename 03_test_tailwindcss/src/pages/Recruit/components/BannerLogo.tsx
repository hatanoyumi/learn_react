import { ReactComponent as Cloud } from '@icons/logos/cloud/default.svg';
import { ReactComponent as CloudWhite } from '@icons/logos/cloud/white.svg';
import { ReactComponent as Comico } from '@icons/logos/comico/default.svg';
import { ReactComponent as ComicoWhite } from '@icons/logos/comico/white.svg';
import { ReactComponent as Fukuoka } from '@icons/logos/fukuoka/default.svg';
import { ReactComponent as FukuokaWhite } from '@icons/logos/fukuoka/white.svg';
import { ReactComponent as NHNJapan } from '@icons/logos/japan/default.svg';
import { ReactComponent as NHNJapanWhite } from '@icons/logos/japan/white.svg';
import { ReactComponent as PlayArt } from '@icons/logos/playart/default.svg';
import { ReactComponent as PlayArtWhite } from '@icons/logos/playart/white.svg';
import { ReactComponent as StudioComico } from '@icons/logos/studio_comico/default.svg';
import { ReactComponent as StudioComicoWhite } from '@icons/logos/studio_comico/white.svg';
import { ReactComponent as Techorus } from '@icons/logos/techorus/default.svg';
import { ReactComponent as TechorusWhite } from '@icons/logos/techorus/white.svg';
import type { CorpsType } from '@src/common/constants';
import { memo } from 'react';
import type { HTMLAttributes } from 'react';

const BannerLogo = ({ variant = 'default', corp, ...rest }: LogoProps) => {
  switch (corp) {
    case 'JAPAN':
      return variant === 'default' ? <NHNJapan {...rest} /> : <NHNJapanWhite {...rest} />;
    case 'PLAYART':
      return variant === 'default' ? <PlayArt className='h-36 w-125' {...rest} /> : <PlayArtWhite {...rest} />;
    case 'TECHORUS':
      return variant === 'default' ? <Techorus {...rest} /> : <TechorusWhite {...rest} />;
    case 'COMICO':
      return variant === 'default' ? <Comico {...rest} /> : <ComicoWhite {...rest} />;
    case 'STUDIO_COMICO':
      return variant === 'default' ? <StudioComico {...rest} /> : <StudioComicoWhite {...rest} />;
    case 'FUKUOKA':
      return variant === 'default' ? <Fukuoka {...rest} /> : <FukuokaWhite {...rest} />;
    case 'CLOUD':
      return variant === 'default' ? <Cloud {...rest} /> : <CloudWhite {...rest} />;
  }
};

export default memo(BannerLogo);

type LogoProps = HTMLAttributes<HTMLOrSVGElement> & { variant?: 'default' | 'white'; corp: CorpsType };
