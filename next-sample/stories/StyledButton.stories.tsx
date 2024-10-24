import { ComponentMeta, ComponentStory } from '@storybook/react'
import { StyledButton } from '@/components/StyledButton'

// カスタムactionを使用するために追加
import { Children, useState } from 'react'
import { action } from '@storybook/addon-actions'
import { options } from 'marked'


// ファイル内のstoryの設定(メタデータオブジェクト)
export default {
  // グループ名
  title: 'StyledButton',
  // 使用するコンポーネント
  component: StyledButton,

  //onClickが呼ばれた時にclickedというアクションを出力する
  // argTypes: { onClick: { action: 'clicked' }  },

  // controlタブを使ったpropsの制御
  argTypes: {
    // propsに渡すvariantをstorybookから変更できるように追加
    variant: {
      control: { type: 'radio' },
      options: [ 'primary', 'success', 'transparent' ],
    },
    // propsに渡すchildrenをstorybookから変更できるように追加
    children: {
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof StyledButton>

// incrementという名前でactionを出力する関数を作る
const incrementAction = action('increment')
// カウント用に追加
export const Count = (props) => {
  const [count, setCount] = useState(0)
  const onClick = (e: React.MouseEvent) => {
    // 現在のカウントを渡してアクションを呼ぶ
    incrementAction(e, count)
    setCount((c) => c + 1)
  }
  return (
    <StyledButton {...props} variant='count' onClick={onClick}>
      Count: {count}
    </StyledButton>
  )
}

// テンプレートコンポーネントを実装
// storybookから渡されたpropsをそのままButtonに渡す
const Template: ComponentStory<typeof StyledButton> = (args) => <StyledButton {...args} />

// bindを呼び出しstoryを作成
export const TemplateTest = Template.bind({})

// デフォルトのpropsを設定
TemplateTest.args = {
  variant: 'primary',
  children: 'Primary',
}

export const Primary = (props) => {
  return (
    <StyledButton {...props} variant='primary'>
      Primary
    </StyledButton>
  )
}

export const Success = (props) => {
  return (
    <StyledButton {...props} variant='success'>
      Success
    </StyledButton>
  )
}

export const Disabled = (props) => {
  return (
    <StyledButton {...props} variant='disabled'>
      Disabled
    </StyledButton>
  )
}

export const Transparent = (props) => {
  return (
    <StyledButton {...props} variant='transparent'>
      Transparent
    </StyledButton>
  )
}
