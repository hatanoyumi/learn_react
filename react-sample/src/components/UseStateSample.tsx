import { useState } from "react";

type CounterProps = {
  initialValue: number
}

const Counter = (props: CounterProps) => {
  const { initialValue } = props
  // カウントを保持する状態をuseState()で宣言。引数は初期値。countが現在の状態、setCountが状態を更新する関数
  const [ count, setCount ] = useState(initialValue)

  return (
    <div>
      <h2>React Hooks (useState)</h2>
      <p>Count: { count }</p>
      {/* setCountを呼んで状態を更新する */}
      <button onClick={() => setCount(count -1)}> - </button>
      <button onClick={() => setCount((prevCount) => prevCount +1)}> + </button>
      <hr />
    </div>
  )
}


export default Counter