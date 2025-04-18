import { useEffect, useState } from "react";

// cookie用の設定等のコンポーネントをimportする
import {
  getOrCreateUniqueUserId,
  getCookieValues,
  setCookie,
  deleteCookie,
  checkCookieEnabled,
} from "../utilities/cookieUtils";


// スタンプカードの見た目のコンポーネントをimportする
import { StampCardViz } from "./StampCardViz";


export const StampCard = () => {
  const [userId, setUserId] = useState<string>(getOrCreateUniqueUserId());
  const [stampIds, setStampIds] = useState<string[]>(getCookieValues("stamp_ids"));
  const [cookieEnabled] = useState<boolean>(checkCookieEnabled());


  // 新しいスタンプを、stampIdsに追加し、クッキーを更新する
  const addNewStamp = (newStampId:string) => {
    // 今回のスタンプIDが存在していなければ追加
    if (!stampIds.includes(newStampId)) {
      const newStampIds = [...stampIds, newStampId];

      // state値を更新
      setStampIds(newStampIds);

      // クッキーを更新
      setCookie('stamp_ids', newStampIds.join(','));
    }
  }

  useEffect(() => {
    const params: URLSearchParams = new URLSearchParams(window.location.search);
    const newStampId: string | null = params.get("stampId");
    if (newStampId) {
      // スタンプIDが指定されている場合、stampIdsに追加し、クッキーを更新
      addNewStamp(newStampId);

      // 新しいスタンプ情報を、別のサーバーへPOST
      //postStamp(cookieUserId, newStampId);
    }

    // クッキーの削除パラメータがあった場合は、削除
    const initializeParam: string | null = params.get("initialize");
    if (initializeParam) {
      deleteCookie('user_id');
      deleteCookie('stamp_ids');
      setUserId(getOrCreateUniqueUserId());
      setStampIds([]);
    }
  }, []);

  return (
    <>
      <h1>StampCard</h1>
      <StampCardViz userId={userId} stampIds={stampIds} />

      <hr />
      <h1>テスト</h1>

      <div>
        stamp1
        <button onClick={() => {
          window.location.href = '?stampId=stamp1';
        }}>獲得！</button>
      </div>
      <div>
        stamp2
        <button onClick={() => {
          window.location.href = '?stampId=stamp2';
        }}>獲得！</button>
      </div>
      <div>
        stamp3
        <button onClick={() => {
          window.location.href = '?stampId=stamp3';
        }}>獲得！</button>
      </div>
      <div>
        <button onClick={() => {
          window.location.href = '?initialize=true';
        }}>初期化</button>
      </div>

      <hr />
      <div>
        <p>ブラウザ設定で、Cookieが有効かどうか</p>
        <p>{cookieEnabled ? '有効' : '無効'}</p>
      </div>
    </>
  )
}
