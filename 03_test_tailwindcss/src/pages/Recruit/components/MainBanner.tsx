import SearchInput from '@src/components/Input/SearchInput/NewSearchInput';
import { LogoIcon } from '@src/components/Layout/Logo';
import { getClsByDevice } from '@src/utils';
import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

const MainBanner = ({ setKeyword }: Props) => {
  const [searchValue, setSearchValue] = useState('');

  const onSubmit = useCallback(() => setKeyword(searchValue), [searchValue, setKeyword]);
  const resetKeyword = () => {
    setSearchValue('');
    setKeyword('');
  };

  const handleSearchOnChange = (e?: ChangeEvent<HTMLInputElement>) => {
    const value = e?.target.value || '';
    setSearchValue(value);
  };

  useEffect(() => {
    if (isMobile) onSubmit();
  }, [onSubmit]);

  return (
    <section className='flex h-full w-full justify-center'>
      <div
        className={getClsByDevice({
          common: 'mx-auto w-full',
          desktop: 'my-64 space-y-36',
          mobile: 'space-y-24 overflow-hidden px-24 pb-8 pt-32',
        })}
      >
        <LogoIcon postfix='すべての求人' type='main' />

        <form
          className={getClsByDevice({
            common: 'relative',
            desktop: 'w-504',
            mobile: 'w-full',
          })}
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSubmit();
          }}
        >
          <SearchInput
            value={searchValue}
            onChange={handleSearchOnChange}
            placeholder='職務、技術スタックなどで検索'
            onReset={resetKeyword}
          />
        </form>
      </div>
    </section>
  );
};

export default MainBanner;

type Props = {
  setKeyword: (keyword: string) => void;
};
