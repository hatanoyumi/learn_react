import { NextPage } from "next";
import styled from "styled-components";

const Text = styled.span`
  color: ${(props) => props.theme.colors.red};
  font-size: ${(props) => props.theme.fontSizes[3]};
  margin: ${(props) => props.theme.space[2]};
`

const PageTheme: NextPage = () => {
  return (
    <div>
      <h2>themeで定義した値を使用</h2>
      <Text>themeから参照した色を使用しています</Text>
      <hr />
    </div>
  )
}

export default PageTheme