import { NextPage } from 'next';
import styled, { css } from 'styled-components';

const redBox = css`
  padding: 0.25em 1em;
  border: 3px double #f00;
  border-radius: 10px;
`

const font = css`
  color: #1e90ff;
  font-size: 2em;
`

// mixin
const Button = styled.button`
  background: transparent;
  margin: 1em;
  cursor: pointer;

  ${redBox}
  ${font}
`

const Text = styled.p`
  font-weight: bold;

  ${font}
`


// スタイルの継承
const BorderedText = styled(Text)`
  width: 250px;
  padding: 8px 16px;
  border: 3px solid blue;
  border-radius: 10px;
  text-align: center;
`


const PageMixin: NextPage = () => {
  return (
    <div>
      <h2>mixin</h2>
      <Button>Hello</Button>
      <Text>World</Text>
      <br />
      <hr />

      <h2>スタイルの継承</h2>
      <BorderedText>test/test</BorderedText>
      <br />
      <hr />

      <h2>Textのstyleを、asで別の要素として使用</h2>
      <Text as="a" href="/">Go to index</Text>
      <br />
      <hr />
    </div>
  )
}

export default PageMixin