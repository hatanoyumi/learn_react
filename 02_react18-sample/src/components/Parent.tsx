// import React, { memo, useState } from "react"

// type FizzProps = {
//   isFizz: boolean
// }

// const Fizz = (props: FizzProps) => {
//   const { isFizz } = props
//   // eslint-disable-next-line no-template-curly-in-string
//   console.log('Fizzが描画されました, isFizz=${isFizz}')
//   return <span>{ isFizz ? 'Fizz' : '' }</span>
// }

// type BuzzProps = {
//   isBuzz: boolean
//   onClick: () => void
// }

// const Buzz = memo<BuzzProps>((props) => {
//   const { isBuzz, onClick } = props
//   // eslint-disable-next-line no-template-curly-in-string
//   console.log('Buzzが再描画されました, isBuzz=${isBuzz}')
//   return (
//     <span onClick={onClick}>
//       {isBuzz ? 'Buzz' : ''}
//     </span>
//   )
// })

// export const Parent = () => {
//   const [count, setCount] = useState(1)
//   const isFizz = count % 3=== 0
//   const isBuzz = count % 5=== 0

//   const onBuzzClick = () => {
//     console.log('Buzzがclickされました, isBuzz=${isBuzz}')
//   }
// console.log('Parentが再描画されました, count=${count}')

// return (
//     <div>
//       <button onClick={() => setCount((c) => c + 1)}> +1 </button>
//       <p>現在のカウント: {count}</p>
//       <p>
//         <Fizz isFizz={isFizz} />
//         <Buzz isBuzz={isBuzz} onClick={onBuzzClick} />
//       </p>
//     </div>
//   )
// }

// export default Parent


import React, { useState, useCallback } from 'react'

type ButtonProps = {
  onClick: () => void
}

// 通常の関数コンポーネント
const DecrementButton = (props: ButtonProps) => {
  const  { onClick } = props

  console.log('DecrementButtonが再描画されました')

  return <button onClick={onClick}>Decrerment</button>
}

// メモ化した関数コンポーネント
const IncrementButton = React.memo((props:ButtonProps) => {
  const { onClick } = props

  console.log('IncrementButtonが再描画されました')

  return <button onClick={onClick}>Increment</button>
})

// メモ化した関数コンポーネント
const DoubleButton =React.memo((props: ButtonProps) => {
  const { onClick } = props
  console.log('DoubleButtonが再描画されました')

  return <button onClick={onClick}>Double</button>
})

export const Parent = () => {
  const [count, setCount] = useState(0)

  const decrement = () => {
    setCount((c) => c - 1)
  }

  const increment = () => {
    setCount((c) => c + 1)
  }

  const double = useCallback(() => {
    setCount((c) => c * 2)
  }, [])

  return (
    <div>
      <h2>useCallback</h2>
      <p>Count: { count }</p>
      {/* コンポーネントに関数を渡す */}
      <DecrementButton onClick={decrement} />
      {/* メモ化コンポーネントに関数を渡す */}
      <IncrementButton onClick={increment} />
      <DoubleButton onClick={double} />
      <hr />
    </div>
  )
}
export default Parent