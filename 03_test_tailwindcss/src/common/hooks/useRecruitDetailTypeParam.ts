import { isNil } from 'lodash';
import { useSearchParams } from 'react-router-dom';

const useRecruitDetailTypeParam = () => {
  const typeKey = 'type';
  const [searchParams] = useSearchParams();
  const type = searchParams.get(typeKey);
  const recruitDetailType = isNil(type) ? null : String(type);
  const recruitDetailTypes = {
    bookmark: 'bookmark',
    list: 'list',
  };
  const isRecruitDetailTypeList = recruitDetailType === recruitDetailTypes.list;
  const recruitDetailTypeList = isRecruitDetailTypeList ? recruitDetailTypes.list : '';
  return {
    recruitDetailType,
    recruitDetailTypes,
    recruitDetailTypeKey: typeKey,
    recruitDetailTypeList,
  };
};

export default useRecruitDetailTypeParam;
