import { apiClient } from '../axios';
import { apiPrefix, getURIByPrefix } from '../urls';

import type { AssetsRes, JoiningsReq } from './interface';

const getJoiningUrl = getURIByPrefix(apiPrefix.joinings);

export const getJoinings = async (applicationId: string) => {
  const res = await apiClient.get(getJoiningUrl(`/${applicationId}`));
  return res.data;
};

export const updateJoinings = async (body: JoiningsReq) => {
  const res = await apiClient.patch(getJoiningUrl(`/${body.applicationId}`), body);
  return res.data;
};

export const getApplicableAssets = async ({
  applicationId,
  classTypeCd,
}: {
  applicationId: string;
  classTypeCd?: string;
}) => {
  const res = await apiClient.get<AssetsRes>(getJoiningUrl(`/${applicationId}/applicable-assets`), {
    params: { classTypeCd },
  });
  return res.data;
};
