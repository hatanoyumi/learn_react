import { ReactComponent as NoDataIcon } from '@icons/brands/result_none.svg';
import { getClsByDevice } from '@src/utils';
import { BrowserView, MobileView } from 'react-device-detect';

function NoData() {
  return (
    <div
      className={getClsByDevice({
        common: 'flex flex-col items-center justify-center',
        desktop: ' h-512',
        mobile: 'h-320 w-full',
      })}
    >
      <NoDataIcon />
      <BrowserView className='flex flex-col items-center'>
        <span className='mt-16 break-keep text-center font-700 text-t3'>採用案件はありません。</span>
      </BrowserView>
      <MobileView className='mt-16 text-center font-500 text-t3-m text-gs-800'>採用案件はありません。</MobileView>
    </div>
  );
}

export default NoData;
