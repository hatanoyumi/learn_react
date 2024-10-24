import { render, screen, RenderResult, fireEvent, act } from '@testing-library/react'
import { DelayInput } from './index'
import exp from 'constants'

// DelayInputコンポーネントに関するテスト
describe('DelayInput', () => {
  let renderResult: RenderResult
  let handleChange: jest.Mock

  beforeEach(() => {
    // モック関数を作成
    handleChange = jest.fn()

    // モック関数をDelayButtonに渡して描画
    renderResult = render(<DelayInput onChange={handleChange} />)

    // タイマーをjestの物に置き換える
    jest.useFakeTimers()
  })

  afterEach(() => {
    renderResult.unmount()

    // タイマーを元の物に戻す
    jest.useFakeTimers()
  })


  // span要素のテキストが空であることをテスト
  it('should display empty in span on initial render', () => {
    const  spanNode = screen.getByTestId('display-text') as HTMLSpanElement

    // 初期表示は空
    expect(spanNode).toHaveTextContent('入力したテキスト:')
  })


  // 入力直後はspan要素が「入力中...」と表示するかテスト
  it('should display 「入力中...」 immediately after onChange event occurs', () => {
    const inputText = 'Test Input Text'
    const inputNode = screen.getByTestId('input-text') as HTMLInputElement

    // inputのonChangeイベントを呼び出す
    fireEvent.change(inputNode, { target: { value: inputText } })

    const SpanNode = screen.getByTestId('display-text') as HTMLSpanElement

    // 入力中と表示するか確認
    expect(SpanNode).toHaveTextContent('入力中...')
  })


  // 入力して1秒後にテキストが表示されるかテスト
  it('should display input text 1second after onChange event occurs', async () => {
    const inputText = 'Text Input Text'
    const inputNode = screen.getByTestId('input-text') as HTMLInputElement

    // inputのonChangeイベントを呼び出す
    fireEvent.change(inputNode, { target: { value: inputText } })

    // act関数内で実行することにより、タイマーのコールバック中で起きる状態変更が反映されることを保証する
    await act (() => {
      // タイマーにセットされたtimeoutを全て実行
      jest.runAllTimers()
    })

    const spanNode = screen.getByTestId('display-text') as HTMLSpanElement

    // 入力したテキストが表示されるか確認
    expect(spanNode).toHaveTextContent(`入力したテキスト: ${inputText}`)
  })


  // 入力して1秒後にonChangeが呼ばれるか
  it('should call onchange 1second after onChange event occurs', async () => {
    const inputText = 'Test Input Text'
    const inputNode = screen.getByTestId('input-text') as HTMLInputElement

    // inputのonChangeイベントを呼び出す
    fireEvent.change(inputNode, { target: { value: inputText } })

    // タイマーの実行
    await act(() => {
      jest.runAllTimers()
    })

    // モック関数を渡して呼ばれたか確認
    expect(handleChange).toHaveBeenCalled()
  })
})
