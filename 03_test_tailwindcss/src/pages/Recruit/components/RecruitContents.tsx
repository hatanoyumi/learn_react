import type { TitleTypeEnum } from '@src/apis/application';
import { ContentsType } from '@src/apis/application';
import type { JobContentsItem } from '@src/apis/recruit';
import TypoButton from '@src/components/Buttons/TypoButton';
import { createMarkup, getClsByDevice, tw } from '@src/utils';
import { isEmpty, isNil, uniqueId } from 'lodash';
import type { MutableRefObject, ReactNode } from 'react';

type Props = {
  info: JobContentsItem[] | undefined;
  detailWrapperRef?: MutableRefObject<HTMLElement | null>;
  className?: string;
  children?: ReactNode;
  handleGoBack: () => void;
};

function RecruitContents({ children, info, detailWrapperRef, className, handleGoBack }: Props) {
  const sortByInfo = info?.sort((a, b) => Number(a?.orderNo) - Number(b?.orderNo));

  return (
    <>
      <article
        ref={detailWrapperRef}
        className={getClsByDevice({
          common: className,
          desktop: 'mt-24 space-y-50',
          mobile: 'space-y-32 px-24 pb-24',
        })}
      >
        {sortByInfo?.map((val) => {
          return (
            <div
              key={val.id}
              className={getClsByDevice({
                desktop: 'space-y-24 py-8',
                mobile: 'space-y-10',
              })}
            >
              <Title titleTypeEnum={val.titleTypeEnum} title={val.title} />

              {!isEmpty(val.contents) && (
                <ul className={tw(val.contentsTypeEnum === ContentsType.LIST ? 'ml-20 list-outside list-disc' : '')}>
                  {val.contents?.map((content) => {
                    return (
                      <li
                        key={uniqueId(content)}
                        className={getClsByDevice({
                          common: 'break-all font-400 text-b1 text-gs-1000 marker:mr-0 marker:font-400',
                        })}
                      >
                        <span
                          className={getClsByDevice({
                            common: 'whitespace-pre-wrap',
                            mobile: val.contentsTypeEnum === ContentsType.LIST ? '-ml-4' : '',
                          })}
                        >
                          {content}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}

              {!isEmpty(val.footer) && (
                <div
                  className='children-a:block children-a:w-fit children-a:rounded-4 children-a:border-1 children-a:border-gs-100 children-a:bg-gs-100 children-a:px-12 children-a:py-8 children-a:text-16 children-a:text-gs-800'
                  dangerouslySetInnerHTML={createMarkup(val.footer, { sanitize: false })}
                />
              )}
            </div>
          );
        })}

        {children && <div className='space-y-8'>{children}</div>}

        <TypoButton variant='leading' onClick={handleGoBack}>
          戻る
        </TypoButton>
      </article>
    </>
  );
}

export default RecruitContents;

type TitleProps = {
  title: string;
  titleTypeEnum?: TitleTypeEnum;
};

export const Title = ({ title, titleTypeEnum }: TitleProps) => {
  return isNil(titleTypeEnum) || titleTypeEnum !== ContentsType.NONE ? (
    <h5
      className={getClsByDevice({
        common: 'break-all font-700',
        desktop: 'font-700 text-t2 text-gs-black',
        mobile: 'font-700 text-t2-m text-gs-1000',
      })}
    >
      {title}
    </h5>
  ) : null;
};
