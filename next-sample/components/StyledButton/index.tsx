import styled, { css } from "styled-components";

const variants = {
  count: {
    color: '#c00',
    backgroundColor: '#fcc',
    border: 'none',
  },
  primary: {
    color: '#fff',
    backgroundColor: '#1d3461',
    border: 'none',
  },
  success: {
    color: '#fff',
    backgroundColor: '#5ab203',
    border: 'none',
  },
  disabled: {
    color: '#999',
    backgroundColor: '#eee',
    border: '1px solid #ccc',
  },
  transparent: {
    color: '#111',
    backgroundColor: 'transparent',
    border: '1px solid #000',
  },
} as const

type StyledButtonProps = {
  variant: keyof typeof variants
}

export const StyledButton = styled.button<StyledButtonProps>`
 ${({ variant }) => {
  // variantに与えられたキーをもとに対応するスタイルを取得
  const style = variants[variant]

  // cssを使い複数のスタイルを返す
  return css`
    color: ${style.color};
    background-color: ${style.backgroundColor};
    border: ${style.border};
  `;
 }}

 padding: 5px 15px;
 border-radius: 12px;
 font-size: 14px;
 height: 38px;
 line-height: 22px;
 letter-spacing: 0;
 cursor: pointer;

 &:focus {
  outline: none;
 }
`