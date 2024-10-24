import { NextPage } from 'next';
import styled from 'styled-components';

type ButtonProps = {
  color: string
  backgroundColor: string
}

// 文字色と背景色がpropsから変更可能なボタンコンポーネント
const Button = styled.button<ButtonProps>`
/* color, background, border-colorはpropsから渡す */
color: ${(props) => props.color};
background: ${(props) => props.backgroundColor};
border: 2px solid ${(props) => props.color};
font-size: 2em;
margin: 1em;
padding: 0.25em 1em;
border-radius: 8px;
cursor: pointer;
`

const PageProps: NextPage = () => {
  return (
    <div>
      <h2>styled_props</h2>
      <Button backgroundColor='transparent' color='#f00'>
        Hello
      </Button>
      <Button backgroundColor='#1e90ff' color='white'>
        World
      </Button>
      <hr />
    </div>
  )
}

export default PageProps