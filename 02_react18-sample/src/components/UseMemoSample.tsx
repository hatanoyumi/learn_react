import React, { useState, useMemo } from "react"

export const UseMemoSample = () => {
  const [text, setText] = useState('') // textは現在のテキストボックスの中身の値を保持
  const [item, setItems] = useState<string[]>([]) // itemは文字列のリストを保持

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const onClickButton = () => {
    setItems((prevItems) => {

    return [...prevItems, text]
    })

    setText('') // テキストボックスの中身を空に
  }

  // 再描画のたびにitem.reduceを実行
  const numberOfCharacter1 = item.reduce((sub, item) => sub + item.length, 0)

  // useMemo使用。itemsが更新されるタイミングでitem.reduceを実行
  const numberOfCharacter2 = useMemo(() => {
    return item.reduce((sub, item) => sub + item.length, 0)
  },[item])

  return (
    <div>
      <h2>useMemo</h2>
      <div>
        <input value={text} onChange={onChangeInput} />
        <button onClick={onClickButton}>Add</button>
      </div>
      <div>
        {item.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
      <div>
        <p>Total Number of Character 1: {numberOfCharacter1}</p>
        <p>Total Number of Character 2: {numberOfCharacter2}</p>
      </div>
      <hr />
    </div>
  )
}
export default UseMemoSample
