import clsx from 'clsx';

interface ISearchResults {
  jobPostingCount: number;
}

const SearchResults = ({ jobPostingCount }: ISearchResults) => {
  return (
    <span className={clsx('flex items-center space-x-8 pb-16 text-b2')}>
      <span className='font-400 text-b1 text-primary-500'>{jobPostingCount}</span>
      <span className='font-600 text-b2'>件の募集職種</span>
    </span>
  );
};

export default SearchResults;
