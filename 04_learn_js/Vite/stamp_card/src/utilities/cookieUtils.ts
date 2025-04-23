// クッキーの有効期限
const COOKIE_EXPIRATION_TIME = 86400;

// クッキーからユーザーIDを取得 or 作成する
export const getOrCreateUniqueUserId = ():string => {
  const key = 'user_id';
  const match = document.cookie.match(new RegExp(`${key}=([^;]+)`));
  if (match) return match[1];
  const id = crypto.randomUUID();

  // １日だけ有効なクッキーを作成
  setCookie(key, id);

  return id;
}

// クッキーから文字列の配列を取得
export const getCookieValues = (key: string):string[] => {
  const match = document.cookie.match(new RegExp(`${key}=([^;]+)`));
  if (match) return match[1].split(',');
  return [];
}

// クッキーを設定
export const setCookie = (key:string, value:string) => {
  document.cookie = `${key}=${value}; path=/; max-age=${COOKIE_EXPIRATION_TIME}`;
}

// クッキーを削除
export const deleteCookie = (key:string) => {
  document.cookie = `${key}=; path=/; max-age=0`;
}

// Cookieが有効かどうか確認
export const checkCookieEnabled = (): boolean => {
  const testkey = 'cookie_test';
  document.cookie = `${testkey}=1; max-age=10; path/`;

  const match = document.cookie.match(new RegExp(`${testkey}=([^;]+)`));
  const result = !!match;

  // テスト用Cookieを削除（副作用防止）
  document.cookie = `${testkey}=; max-age=0; path=/`;

  return result;
};
