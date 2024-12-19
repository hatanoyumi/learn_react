import { useSearchParams } from 'react-router-dom';

const useNoticeDetailId = () => {
  const noticeDetailKey = 'noticeDetailId';
  const [searchParams] = useSearchParams();
  const noticeDetailId = searchParams.get(noticeDetailKey);

  return {
    noticeDetailKey,
    noticeDetailId,
  };
};

export default useNoticeDetailId;
