import type { ApiContext, User } from 'types'
import { fetcher } from 'utils'

export type GetUserParams = {
  /**
   * ユーザーID
   */
  id: number
}

/**
 * 認証API（サインイン）
 * @param context APIコンテキスト
 * @param params パラメータ
 * @returns ユーザ
 */
const getUser = async (
  context: ApiContext,
  { id }: GetUserParams,
): Promise<User> => {
  /**
  // ユーザーAPI
  // サンプルレスポンス
 {
  "id": "1",
  "username": "taketo",
  "displayName": "Taketo Yoshida",
  "email": "taketo@exsample.com",
  "profileImageUrl": "../../../public/users/1.png",
  "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
 }
  */

 return await fetcher (
  `${context.apiRootUrl.replace(/\/$/g, '')}/users/${id}`,
  {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  },
 )
}

export default getUser