// テストファイルは .spec.tsx または .test.tsx で終了するファイル名にすること

import { render, screen, RenderResult, fireEvent, getByRole } from '@testing-library/react'
import { Input } from './index'


// describeで処理をまとめる
describe('Input', () => {
  let renderResult: RenderResult;

  // それぞれのテストケース前にコンポーネントを描画、renderResultにセット
  beforeEach(() => {
    renderResult = render(<Input id="username" label="Username" />)
  })

  // テストケース実行後に描画していたコンポーネントを解放
  afterEach(() => {
    renderResult.unmount()
  })

  // 初期描画時にinputが空であることをテスト →　エラーになる
  it('should empty in input on initial render', () => {
    // labelがUsernameであるコンポーネントに対応するinput要素を取得
    const inputNode = screen.getByLabelText('Username') as HTMLInputElement

    // input要素の表示が空か確認
    expect(inputNode).toHaveValue('')
  })

  // 文字を入力したら、入力した内容が表示されるかテスト
  it('should show input text', () => {
    const inputText = 'Test Input Text'
    const inputNode = screen.getByLabelText('Username') as HTMLInputElement

    // fireEventを使ってinput要素のonChangeイベントを発火
    fireEvent.change(inputNode, { target: { value: inputText } })

    // input要素に入力したテキストが表示されているか確認
    expect(inputNode).toHaveValue(inputText)
  })

  // クリアボタンのテスト
  it('should reset when user clicks button', () => {
    // 最初にinputにテキストを入力
    const inputText = 'Test Input Text'
    const inputNode = screen.getByLabelText('Username') as HTMLInputElement
    fireEvent.change(inputNode, { target: { value: inputText } })

    // ボタンを取得
    const buttonNode = screen.getByRole('button', {
      name: 'Reset',
    }) as HTMLButtonElement

    // ボタンをクリック
    fireEvent.click(buttonNode)

    // input要素の表示が空か確認
    expect(inputNode).toHaveValue('')
  })
})
