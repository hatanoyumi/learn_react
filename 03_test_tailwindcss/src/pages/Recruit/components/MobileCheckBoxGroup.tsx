import { Disclosure, Transition } from '@headlessui/react';
import { ReactComponent as Arrow } from '@icons/systems/chevron/down.svg';
import type { Code } from '@src/apis/code';
import type { Corporation, JobSeries } from '@src/apis/recruit';
import CheckboxInput from '@src/components/Input/CheckboxInput';
import { tw, withClsx } from '@src/utils';
import { isNil } from 'lodash';
import { type ReactNode, useMemo, useState } from 'react';

const Animation = ({ children }: { children: ReactNode }) => {
  return (
    <Transition
      as='div'
      enter='transition-all duration-150 ease-in'
      enterFrom='max-h-0'
      enterTo='max-h-full'
      leave='transition-all duration-150 ease-out'
      leaveFrom='max-h-full'
      leaveTo='max-h-0'
      className='z-10 mb-24 overflow-y-hidden last:mb-0'
    >
      {children}
    </Transition>
  );
};

const MobileCheckBoxGroup = <T extends OptionTypes[]>({
  title,
  options,
  checkedValues,
  onChange,
}: IMobileCheckBoxGroup<T>) => {
  const [reRender, setReRender] = useState(1);

  const Header = ({ className, title, isOpen }: { title: string; className?: string; isOpen: boolean }) => {
    return (
      <Disclosure.Button
        className='flex h-56 w-full items-center justify-between'
        onClick={(e) => {
          e.stopPropagation();
          setReRender((prev: number) => ++prev);
        }}
      >
        <h3 className={getTitleStyle(className)}>{title}</h3>
        <div className={tw('transition-all duration-150', isOpen ? 'rotate-0' : 'rotate-180')}>
          <Arrow fill='#111213' />
        </div>
      </Disclosure.Button>
    );
  };

  const renderedOptions = useMemo(() => {
    return !isNil(options)
      ? options.map((option) => {
          return (
            <div key={option.name} className='pb-20 first:mt-10 last:pb-26'>
              <CheckboxInput
                id={option.name}
                name={`${title}Cds`}
                checkboxWidth='24'
                checkboxHeight='24'
                checked={isChecked(checkedValues, option)}
                onChange={(e) => {
                  e.stopPropagation();

                  const updatedValues = isChecked(checkedValues, option)
                    ? checkedValues.filter(uncheckValues(option))
                    : checkedValues.concat(checkValue(option));
                  onChange(updatedValues);
                }}
              >
                {option.name}
              </CheckboxInput>
            </div>
          );
        })
      : null;
  }, [checkedValues, onChange, options, title]);

  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <>
          <Header title={title} isOpen={open} />
          <Animation>
            <Disclosure.Panel>{renderedOptions}</Disclosure.Panel>
          </Animation>
        </>
      )}
    </Disclosure>
  );
};

export default MobileCheckBoxGroup;

const getTitleStyle = withClsx('text-body1 font-bold text-gs-black');

const getFilterIdentity = (option: OptionTypes) => {
  const filterId = (option as JobSeries | Corporation)?.id;
  const filterCd = (option as Code)?.cd;

  return { filterId, filterCd };
};

const uncheckValues =
  (option: OptionTypes) =>
  (value: string): boolean => {
    const { filterId, filterCd } = getFilterIdentity(option);

    if (filterId) {
      return (option as JobSeries | Corporation).id !== value;
    }

    if (filterCd) {
      return (option as Code).cd !== value;
    }

    return false;
  };
const checkValue = (option: OptionTypes): string => {
  const { filterId, filterCd } = getFilterIdentity(option);

  if (filterId) {
    return (option as JobSeries | Corporation).id;
  }

  if (filterCd) {
    return (option as Code).cd;
  }

  return '';
};
const isChecked = (checkedValues: string[], option: OptionTypes) => {
  const { filterId, filterCd } = getFilterIdentity(option);

  if (filterId) {
    return checkedValues.includes((option as JobSeries | Corporation).id);
  }

  if (filterCd) {
    return checkedValues.includes((option as Code).cd);
  }
};

interface IMobileCheckBoxGroup<T = undefined> {
  title: string;
  options: T | undefined;
  checkedValues: string[];
  onChange: (updatedValues: string[]) => void;
}

type OptionTypes = Code | JobSeries | Corporation;
