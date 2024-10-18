import { useReducer } from "react";

// reducerが受けとるactionの型
type Action = 'DECREMENT' | 'INCREMENT' | 'DOUBLE' | 'RESET'

const reducer = (currentCount: number, action: Action) => {
  switch (action) {
    case 'INCREMENT':
      return currentCount + 1
    case 'DECREMENT':
      return currentCount - 1
    case 'DOUBLE':
      return currentCount * 2
    case 'RESET':
      return 0
    default:
      return currentCount
  }
}

type CounterProps = {
  initialValue: number
}

const ReducerCounter = (props: CounterProps) => {
  const { initialValue } = props
  const [count, dispatch] = useReducer(reducer, initialValue)

  return (
    <div>
      <h2>React Hooks (useReducer)</h2>
      <p>Count: { count }</p>
      {/* dispatch関数にactionを渡して状態を更新 */}
      <button onClick={() => dispatch('DECREMENT')}> - </button>
      <button onClick={() => dispatch('INCREMENT')}> + </button>
      <button onClick={() => dispatch('DOUBLE')}> x2 </button>
      <button onClick={() => dispatch('RESET')}>Reset</button>
      <hr />
    </div>
  )
}

export default ReducerCounter