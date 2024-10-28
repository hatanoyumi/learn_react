// presentational-componentは見た目を実装するコンポーネント

import '../styles/Home.module.css' // styles.css?

type ButtonProps = {
  label: string
  text: string
  disabled: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

// ラベルとボタンを表示するコンポーネント
export const Button = (props: ButtonProps) => {
  const { label, text, disabled, onClick } = props

  // propsで渡されたデータを元に見た目を実装
  return (
    <div className='button-container'>
      <span>{label}</span>
      <button disabled={disabled} onClick={onClick}>
        {text}
      </button>
    </div>
  )
}