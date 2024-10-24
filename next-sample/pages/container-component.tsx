// presentational-componentと違い、デザインは一切実装しない

import { useState, useCallback } from "react";
import { Button } from "./presentational-component";

// ポップアップを表示するためのフック
const usePopup = () => {

  // 与えられたテキストを表示するポップアップを出現させる関数
  const cb = useCallback((text: string) => {
    prompt(text)
  }, [])

  return cb
}

type CountButtonProps = {
  label: string
  maximum: number
}

// クリックされた回数を表示するボタンを表示するコンポーネント
export const CountButton = (props: CountButtonProps) => {
  const { label, maximum } = props

  // アラートを表示させるためのフック
  const displayPopup = usePopup()

  // カウントを保持する状態を定義
  const [count, setCount] = useState(0)

  // ボタンが押された時の挙動を定義
  const onClick = useCallback(() => {
    // カウントを更新
    const newCount = count + 1
    setCount(newCount)

    if (newCount >= maximum) {
      // アラートを出す
      displayPopup(`You've clicked ${newCount} times`)
    }
  }, [count, maximum])

  // 状態を元に、表示に必要なデータを求める
  const disabled = count >= maximum
  const text = disabled ? `can't click any more` : `You've clicked ${count} times`

  // Presentational component を返す
  return (
    <Button disabled={disabled} onClick={onClick} label={label} text={text} />
  )
}

export default CountButton