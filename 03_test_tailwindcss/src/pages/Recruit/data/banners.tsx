import { ReactComponent as ArrowMiniRight } from '@icons/systems/arrow_mini/right.svg';
import type { CorpsType } from '@src/common/constants';
import { Corps, CorpSiteUrls, JOB_GROUP_CODES, TechorusBlogUrl } from '@src/common/constants';
import IconButton from '@src/components/Buttons/IconButton';
import { getClsByDevice, tw } from '@src/utils';
import { get } from 'lodash';
import type { ReactNode } from 'react';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';

import BannerLogo from '../components/BannerLogo';

const logoTitleSpaceY = getClsByDevice({ desktop: 'space-y-24', mobile: 'space-y-16' });

const CustomLink = ({
  children,
  href,
  className,
  iconClassName,
  iconVariant = isMobile ? 'black' : 'white',
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  iconClassName?: string;
  iconVariant?: 'black' | 'white';
}) => {
  return (
    <Link
      to={href ?? ''}
      target='_blank'
      className={getClsByDevice({ common: 'group flex items-center gap-x-8', desktop: 'gap-x-16' })}
    >
      <div
        className={tw(
          getClsByDevice({
            common: 'shrink-0 font-700 text-t3 text-gs-white',
            desktop: '',
            mobile: 'font-600 text-b3 text-gs-1000',
          }),
          className
        )}
      >
        {children}
      </div>

      <IconButton
        className={tw(getClsByDevice({ desktop: 'size-40', mobile: 'size-28' }), iconClassName)}
        variant={iconVariant}
        Icon={
          <ArrowMiniRight
            className={getClsByDevice({
              common: tw(iconVariant === 'black' ? 'fill-white' : 'fill-black', 'size-24 shrink-0'),
            })}
          />
        }
        size='default'
      />
    </Link>
  );
};

export const RecruitBannerObjects: Record<CorpsType, RecruitBannerType[]> = {
  [Corps.JAPAN]: [
    {
      Background: (
        <img src='/images/recruits/japan/banner_1.png' alt={Corps.JAPAN} className='size-full object-cover' />
      ),
      Logo: (
        <BannerLogo corp={Corps.JAPAN} className={getClsByDevice({ desktop: 'h-80 w-200', mobile: 'h-40 w-100' })} />
      ),
      Object3D: (
        <img
          src='/images/objects/corps/japan.png'
          alt={Corps.JAPAN}
          className={getClsByDevice({
            common: 'object-contain',
            desktop: '-mt-30 size-360',
            mobile: '-mt-16 size-192',
          })}
        />
      ),
      Link: (
        <CustomLink href={get(CorpSiteUrls, Corps.JAPAN)} iconVariant='black' className='text-black'>
          NHN JAPAN コーポレートサイト
        </CustomLink>
      ),
    },
    {
      Background: <div className='size-full bg-gs-200' />,
      Logo: (
        <div className={logoTitleSpaceY}>
          <BannerLogo corp={Corps.JAPAN} className={getClsByDevice({ desktop: 'h-80 w-150', mobile: 'h-24 w-60' })} />
          <p
            className={getClsByDevice({
              common: 'text-gs-black',
              desktop: 'font-800 text-h4',
              mobile: 'font-800 text-h4-m',
            })}
          >
            エンジニア職
            <br />
            採用特集
          </p>
        </div>
      ),
      Object3D: (
        <img
          src='/images/objects/occupations/japan/tech_1.png'
          alt={Corps.JAPAN}
          className={getClsByDevice({
            common: 'object-contain',
            desktop: 'size-360',
            mobile: 'h-192 translate-y-0',
          })}
        />
      ),
      Link: (
        <CustomLink href={get(CorpSiteUrls, Corps.JAPAN)} className='text-gs-black' iconVariant='black'>
          NHN JAPAN コーポレートサイト
        </CustomLink>
      ),
      jobGroupId: JOB_GROUP_CODES.tech,
    },
    {
      Background: <div className='size-full bg-gs-200' />,
      Logo: (
        <div className={logoTitleSpaceY}>
          <BannerLogo corp={Corps.JAPAN} className={getClsByDevice({ desktop: 'h-80 w-150', mobile: 'h-24 w-60' })} />
          <p
            className={getClsByDevice({
              common: 'text-gs-black',
              desktop: 'font-800 text-h4',
              mobile: 'font-800 text-h4-m',
            })}
          >
            デザイン職
            <br />
            求人一覧
          </p>
        </div>
      ),
      Object3D: (
        <img
          src='/images/objects/occupations/japan/design_1.png'
          alt={Corps.JAPAN}
          className={getClsByDevice({
            common: 'object-contain',
            desktop: 'size-360',
            mobile: 'h-192 translate-y-0',
          })}
        />
      ),
      Link: (
        <CustomLink className='text-gs-black' iconVariant='black' href={get(CorpSiteUrls, Corps.JAPAN)}>
          NHN JAPAN コーポレートサイト
        </CustomLink>
      ),
      jobGroupId: JOB_GROUP_CODES.design,
    },
    {
      Background: <div className='size-full bg-gs-200' />,
      Logo: (
        <div className={logoTitleSpaceY}>
          <BannerLogo corp={Corps.JAPAN} className={getClsByDevice({ desktop: 'h-80 w-150', mobile: 'h-24 w-60' })} />
          <p
            className={getClsByDevice({
              common: 'text-gs-black',
              desktop: 'font-800 text-h4',
              mobile: 'font-800 text-h4-m',
            })}
          >
            コーポレート職
            <br />
            求人一覧
          </p>
        </div>
      ),
      Object3D: (
        <img
          src='/images/objects/occupations/japan/corp_1.png'
          alt={Corps.JAPAN}
          className={getClsByDevice({
            common: 'object-contain',
            desktop: 'size-360',
            mobile: 'h-192',
          })}
        />
      ),
      Link: (
        <CustomLink className='text-gs-black' iconVariant='black' href={get(CorpSiteUrls, Corps.JAPAN)}>
          NHN JAPAN コーポレートサイト
        </CustomLink>
      ),
      jobGroupId: JOB_GROUP_CODES.corporate,
    },
  ],
  [Corps.PLAYART]: [
    {
      Background: (
        <img
          src='/images/recruits/playart/banner_1.png'
          alt={Corps.PLAYART}
          className={getClsByDevice({ common: 'size-full object-cover', mobile: 'scale-[1.86]' })}
        />
      ),
      Logo: (
        <BannerLogo corp={Corps.PLAYART} className={getClsByDevice({ desktop: 'h-80 w-279', mobile: 'h-40 w-140' })} />
      ),
      Object3D: (
        <img
          src='/images/recruits/playart/object_1.png'
          alt={Corps.PLAYART}
          className={getClsByDevice({
            common: 'object-contain',
            desktop: 'size-full scale-[1.3]',
            mobile: 'size-192 translate-y-[-9%]',
          })}
        />
      ),
      Link: (
        <CustomLink href={get(CorpSiteUrls, Corps.PLAYART)} iconVariant='black' className='text-gs-black'>
          NHN PlayArt コーポレートサイト
        </CustomLink>
      ),
    },
    {
      Background: <div className='size-full bg-theme-PA2' />,
      Logo: (
        <div className={logoTitleSpaceY}>
          <BannerLogo
            corp={Corps.PLAYART}
            className={getClsByDevice({
              desktop: 'h-60 w-209',
              mobile: 'h-24 w-84',
            })}
            variant='white'
          />
          <p
            className={getClsByDevice({
              common: 'text-white',
              desktop: 'font-800 text-h4',
              mobile: 'font-800 text-h4-m',
            })}
          >
            ゲームプログラマー
            <br />
            求人一覧
          </p>
        </div>
      ),
      Object3D: (
        <img
          src='/images/objects/occupations/playart/tech_2.png'
          alt={Corps.PLAYART}
          className={getClsByDevice({
            common: 'object-contain',
            desktop: '-mt-30 size-400',
            mobile: 'size-192 translate-y-[-9%]',
          })}
        />
      ),
      Link: (
        <CustomLink href={get(CorpSiteUrls, Corps.PLAYART)} className='text-white' iconVariant='white'>
          NHN PlayArt コーポレートサイト
        </CustomLink>
      ),
      jobGroupId: JOB_GROUP_CODES.tech,
    },
    {
      Background: <div className='size-full bg-theme-PA3' />,
      Logo: (
        <div className={logoTitleSpaceY}>
          <BannerLogo
            corp={Corps.PLAYART}
            className={getClsByDevice({
              desktop: 'h-60 w-209',
              mobile: 'h-24 w-84',
            })}
            variant='white'
          />
          <p
            className={getClsByDevice({
              common: 'text-white',
              desktop: 'font-800 text-h4',
              mobile: 'font-800 text-h4-m',
            })}
          >
            ゲームプランナー
            <br />
            求人一覧
          </p>
        </div>
      ),
      Object3D: (
        <img
          src='/images/objects/occupations/playart/tech_1.png'
          alt={Corps.PLAYART}
          className={getClsByDevice({
            common: 'object-contain',
            desktop: '-mt-30 size-400 ',
            mobile: 'size-192 translate-y-[-9%]',
          })}
        />
      ),
      Link: (
        <CustomLink href={get(CorpSiteUrls, Corps.PLAYART)} className='text-white' iconVariant='white'>
          NHN PlayArt コーポレートサイト
        </CustomLink>
      ),
      jobGroupId: JOB_GROUP_CODES.business,
    },
    {
      Background: <div className='size-full bg-theme-PA5' />,
      Logo: (
        <div className={logoTitleSpaceY}>
          <BannerLogo
            corp={Corps.PLAYART}
            className={getClsByDevice({
              desktop: 'h-60 w-209',
              mobile: 'h-24 w-84',
            })}
            variant='white'
          />
          <p
            className={getClsByDevice({
              common: 'text-white',
              desktop: 'font-800 text-h4',
              mobile: 'font-800 text-h4-m',
            })}
          >
            ゲームデザイナー
            <br />
            求人一覧
          </p>
        </div>
      ),
      Object3D: (
        <img
          src='/images/objects/occupations/playart/design_2.png'
          alt={Corps.PLAYART}
          className={getClsByDevice({
            common: 'object-contain',
            desktop: '-mt-30 size-400 ',
            mobile: 'size-192 translate-y-[-3%]',
          })}
        />
      ),
      Link: (
        <CustomLink href={get(CorpSiteUrls, Corps.PLAYART)} className='text-white' iconVariant='white'>
          NHN PlayArt コーポレートサイト
        </CustomLink>
      ),
      jobGroupId: JOB_GROUP_CODES.design,
    },
  ],
  [Corps.TECHORUS]: [
    {
      Background: (
        <img
          src='/images/recruits/techorus/banner_1.png'
          alt={Corps.TECHORUS}
          className='size-full object-cover opacity-50'
        />
      ),
      Logo: (
        <BannerLogo corp={Corps.TECHORUS} className={getClsByDevice({ desktop: 'h-65 w-300', mobile: 'h-32 w-142' })} />
      ),
      Object3D: (
        <img
          src='/images/objects/corps/techorus.png'
          alt={Corps.TECHORUS}
          className={getClsByDevice({
            common: 'object-contain',
            desktop: 'size-full scale-150',
            mobile: 'relative -top-13 size-192',
          })}
        />
      ),
      Link: (
        <CustomLink href={TechorusBlogUrl} className='text-gs-black' iconVariant='black'>
          NHN Techorus「Tech Blog」
        </CustomLink>
      ),
    },
    {
      Background: <div className='size-full bg-theme-TC1' />,
      Logo: (
        <div className={logoTitleSpaceY}>
          <BannerLogo
            corp={Corps.TECHORUS}
            className={getClsByDevice({
              desktop: 'h-48 w-213',
              mobile: 'h-24 w-84',
            })}
            variant='white'
          />
          <p
            className={getClsByDevice({
              common: 'text-white',
              desktop: 'font-800 text-h4',
              mobile: 'font-800 text-h4-m',
            })}
          >
            エンジニア
            <br />
            求人一覧
          </p>
        </div>
      ),
      Object3D: (
        <img
          src='/images/objects/occupations/techorus/occupation_1.png'
          alt={Corps.TECHORUS}
          className={getClsByDevice({
            common: 'relative object-contain',
            desktop: '-top-38 size-400',
            mobile: '-top-13 size-192',
          })}
        />
      ),
      Link: <CustomLink href={TechorusBlogUrl}>NHN Techorus「Tech Blog」</CustomLink>,
      jobGroupId: JOB_GROUP_CODES.tech,
    },
    {
      Background: <div className='size-full bg-theme-TC2' />,
      Logo: (
        <div className={logoTitleSpaceY}>
          <BannerLogo
            corp={Corps.TECHORUS}
            className={getClsByDevice({
              desktop: 'h-48 w-213',
              mobile: 'h-24 w-84',
            })}
            variant='white'
          />
          <p
            className={getClsByDevice({
              common: 'text-white',
              desktop: 'font-800 text-h4',
              mobile: 'font-800 text-h4-m',
            })}
          >
            ビジネス
            <br />
            求人一覧
          </p>
        </div>
      ),
      Object3D: (
        <img
          src='/images/objects/occupations/techorus/occupation_2.png'
          alt={Corps.TECHORUS}
          className={getClsByDevice({
            common: 'relative object-contain',
            desktop: '-top-44 size-400',
            mobile: '-top-13 size-192',
          })}
        />
      ),
      Link: <CustomLink href={TechorusBlogUrl}>NHN Techorus「Tech Blog」</CustomLink>,
      jobGroupId: JOB_GROUP_CODES.business,
    },
    {
      Background: <div className='size-full bg-theme-TC1' />,
      Logo: (
        <div className={logoTitleSpaceY}>
          <BannerLogo
            corp={Corps.TECHORUS}
            className={getClsByDevice({
              desktop: 'h-48 w-213',
              mobile: 'h-24 w-84',
            })}
            variant='white'
          />
          <p
            className={getClsByDevice({
              common: 'text-white',
              desktop: 'font-800 text-h4',
              mobile: 'font-800 text-h4-m',
            })}
          >
            コーポレート
            <br />
            求人一覧
          </p>
        </div>
      ),
      Object3D: (
        <img
          src='/images/objects/occupations/techorus/occupation_3.png'
          alt={Corps.TECHORUS}
          className={getClsByDevice({
            common: 'relative object-contain',
            desktop: '-top-10 size-400',
            mobile: 'size-192',
          })}
        />
      ),
      Link: <CustomLink href={TechorusBlogUrl}>NHN Techorus「Tech Blog」</CustomLink>,
      jobGroupId: JOB_GROUP_CODES.corporate,
    },
  ],
  [Corps.COMICO]: [
    {
      Background: (
        <img
          src='/images/recruits/comico/banner_1.png'
          alt={Corps.COMICO}
          className='size-full object-cover opacity-20'
        />
      ),
      Logo: (
        <BannerLogo corp={Corps.COMICO} className={getClsByDevice({ desktop: 'h-65 w-240', mobile: 'h-36 w-107' })} />
      ),
      Object3D: (
        <img
          src='/images/objects/corps/comico.png'
          alt={Corps.COMICO}
          className={getClsByDevice({
            common: 'relative object-contain',
            desktop: 'top-0 size-432',
            mobile: '-top-16 size-192',
          })}
        />
      ),
      Link: (
        <CustomLink href={get(CorpSiteUrls, Corps.COMICO)} className='text-gs-black' iconVariant='black'>
          NHN comico コーポレートサイト
        </CustomLink>
      ),
    },
    {
      Background: <div className='size-full bg-theme-TC1' />,
      Logo: (
        <div className={logoTitleSpaceY}>
          <BannerLogo
            corp={Corps.COMICO}
            className={getClsByDevice({ desktop: 'h-48 w-150', mobile: 'h-24 w-60' })}
            variant='white'
          />
          <p
            className={getClsByDevice({
              common: 'text-white',
              desktop: 'font-800 text-h4',
              mobile: 'font-800 text-h4-m',
            })}
          >
            エンジニア
            <br />
            求人一覧
          </p>
        </div>
      ),
      Object3D: (
        <img
          src='/images/recruits/comico/object_3.png'
          alt={Corps.COMICO}
          className={getClsByDevice({
            common: 'relative object-contain',
            desktop: 'top-0 size-400',
            mobile: '-top-16 size-192',
          })}
        />
      ),
      Link: <CustomLink href={get(CorpSiteUrls, Corps.COMICO)}>NHN comico コーポレートサイト</CustomLink>,
      jobGroupId: JOB_GROUP_CODES.tech,
    },
    {
      Background: <div className='size-full bg-theme-CM1' />,
      Logo: (
        <div className={logoTitleSpaceY}>
          <BannerLogo
            corp={Corps.COMICO}
            className={getClsByDevice({ desktop: 'h-48 w-150', mobile: 'h-24 w-60' })}
            variant='white'
          />
          <p
            className={getClsByDevice({
              common: 'text-white',
              desktop: 'font-800 text-h4',
              mobile: 'font-800 text-h4-m',
            })}
          >
            ビジネス
            <br />
            求人一覧
          </p>
        </div>
      ),
      Object3D: (
        <img
          src='/images/recruits/comico/object_1.png'
          alt={Corps.COMICO}
          className={getClsByDevice({
            common: 'relative object-contain',
            desktop: '-top-48 size-400',
            mobile: '-top-16 size-192',
          })}
        />
      ),
      Link: <CustomLink href={get(CorpSiteUrls, Corps.COMICO)}>NHN comico コーポレートサイト</CustomLink>,
      jobGroupId: JOB_GROUP_CODES.business,
    },
    {
      Background: <div className='size-full bg-theme-CM1' />,
      Logo: (
        <div className={logoTitleSpaceY}>
          <BannerLogo
            corp={Corps.COMICO}
            className={getClsByDevice({ desktop: 'h-48 w-150', mobile: 'h-24 w-60' })}
            variant='white'
          />
          <p
            className={getClsByDevice({
              common: 'text-white',
              desktop: 'font-800 text-h4',
              mobile: 'font-800 text-h4-m',
            })}
          >
            デザイン
            <br />
            求人一覧
          </p>
        </div>
      ),
      Object3D: (
        <img
          src='/images/recruits/comico/object_2.png'
          alt={Corps.COMICO}
          className={getClsByDevice({
            common: 'contain relative',
            desktop: 'top-0 size-400',
            mobile: '-top-16 size-192',
          })}
        />
      ),
      Link: <CustomLink href={get(CorpSiteUrls, Corps.COMICO)}>NHN comico コーポレートサイト</CustomLink>,
      jobGroupId: JOB_GROUP_CODES.design,
    },
  ],
  [Corps.STUDIO_COMICO]: [
    {
      Background: (
        <img
          src='/images/recruits/studio_comico/banner_1.png'
          alt={Corps.STUDIO_COMICO}
          className='size-full object-cover opacity-20'
        />
      ),
      Logo: (
        <BannerLogo
          corp={Corps.STUDIO_COMICO}
          className={getClsByDevice({ desktop: 'h-72 w-302', mobile: 'h-36 w-151' })}
        />
      ),
      Object3D: (
        <img
          src='/images/objects/corps/studio_comico.png'
          alt={Corps.STUDIO_COMICO}
          className={getClsByDevice({
            common: 'relative object-contain',
            desktop: 'top-1/2 size-400 -translate-y-1/2',
            mobile: '-right-10 -top-15 size-192',
          })}
        />
      ),
      Link: (
        <CustomLink href={get(CorpSiteUrls, Corps.STUDIO_COMICO)} className='text-gs-1000' iconVariant='black'>
          NHN Studio comico コーポレートサイト
        </CustomLink>
      ),
    },
    {
      Background: <div className='size-full bg-theme-SC' />,
      Logo: (
        <div className={logoTitleSpaceY}>
          <BannerLogo
            corp={Corps.STUDIO_COMICO}
            className={getClsByDevice({ desktop: 'h-48 w-201', mobile: 'h-24 w-100' })}
          />
          <p
            className={getClsByDevice({
              common: 'font-800 text-gs-black',
              desktop: 'font-800 text-h4',
              mobile: 'font-800 text-h4-m',
            })}
          >
            WEBTOON編集
            <br />
            求人一覧
          </p>
        </div>
      ),
      Object3D: (
        <img
          src='/images/objects/occupations/studio_comico/occupation_1.png'
          alt={Corps.STUDIO_COMICO}
          className={getClsByDevice({
            common: 'relative object-contain',
            desktop: 'h-400 w-400',
            mobile: '-right-10 -top-15 size-192',
          })}
        />
      ),
      Link: (
        <CustomLink href={get(CorpSiteUrls, Corps.STUDIO_COMICO)} className='text-gs-black' iconVariant='black'>
          NHN Studio comico コーポレートサイト
        </CustomLink>
      ),
      jobGroupId: JOB_GROUP_CODES.business,
    },
  ],
  [Corps.FUKUOKA]: [
    {
      Background: (
        <img src='/images/recruits/fukuoka/banner_1.png' alt={Corps.FUKUOKA} className='size-full object-cover' />
      ),
      Logo: (
        <BannerLogo corp={Corps.FUKUOKA} className={getClsByDevice({ desktop: 'h-80 w-200', mobile: 'h-40 w-100' })} />
      ),
      Object3D: (
        <img
          src='/images/objects/corps/fukuoka.png'
          alt={Corps.FUKUOKA}
          className={getClsByDevice({
            common: 'relative top-1/2 -translate-y-1/2',
            desktop: 'size-400',
            mobile: '-right-10 size-192',
          })}
        />
      ),
      Link: (
        <CustomLink href={get(CorpSiteUrls, Corps.FUKUOKA)} className='text-gs-1000' iconVariant='black'>
          NHN FUKUOKA コーポレートサイト
        </CustomLink>
      ),
    },
  ],
  [Corps.CLOUD]: [
    {
      Background: (
        <img src='/images/recruits/cloud/banner_1.png' alt={Corps.FUKUOKA} className='size-full object-cover' />
      ),
      Logo: (
        <BannerLogo corp={Corps.CLOUD} className={getClsByDevice({ desktop: 'h-72 w-372', mobile: 'h-24 w-192' })} />
      ),
      Object3D: (
        <img
          src='/images/recruits/cloud/object_1.png'
          alt={Corps.FUKUOKA}
          className={getClsByDevice({
            common: 'relative top-[56%] -translate-y-1/2',
            desktop: 'size-400',
            mobile: '-right-12 top-[54%] size-192',
          })}
        />
      ),
      Link: (
        <CustomLink href={get(CorpSiteUrls, Corps.CLOUD)} className='text-gs-1000' iconVariant='black'>
          NHN Cloud Japan コーポレートサイト
        </CustomLink>
      ),
    },
  ],
};

export type RecruitBannerType = {
  Background: ReactNode;
  Logo: ReactNode;
  Link?: ReactNode;
  Object3D?: ReactNode;
  jobGroupId?: (typeof JOB_GROUP_CODES)[keyof typeof JOB_GROUP_CODES];
};
