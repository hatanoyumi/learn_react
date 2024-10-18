import React, { useState, useCallback, useDebugValue } from "react"

//input向けにコールバックと現在の入力内容をまとめたフック
const useInput = () => {
  //現在の入力値を保持するフック
  const [state, setState] = useState('')
  // inputが変化したら更新
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value)
  }, [])

  // デバッグ用に値を出力。開発者ツールのcomponentsタブに表示される
  useDebugValue('Input: ${state}')

  // 現在の入力内容とコールバック関数を返す
  return [state, onChange] as const
}

export const Input = () => {
  const [text, onChangeText] = useInput()
  return (
    <div>
      <h2>カスタムフック</h2>
      <input type="text" value={text} onChange={onChangeText} />
      <p>Input: {text}</p>
      <hr />
    </div>
  )
}