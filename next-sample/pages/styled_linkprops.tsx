import { NextPage } from "next";
import Link, { LinkProps } from "next/link";
import styled from "styled-components";

type BaseLinkProps = React.PropsWithChildren<LinkProps> & {
  className?: string
  children: React.ReactNode
}

// Next.jsのリンクにスタイルを適用する為のヘルパーコンポーネント
// 定義したスタイルに対応するclassNameがpropsとして渡される。これをa要素に渡す。
// https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor
const BaseLink = (props: BaseLinkProps) => {
  const { className, children, ...rest } = props

  return (
    <Link {...rest} className={className}>
      {children}
    </Link>
  )
}

const StyledLink = styled(BaseLink)`
  color: #1e90ff;
  font-size: 2em;
`

const PageLinkProps: NextPage = () => {
  return (
    <div>
      {/* 青色のリンクを表示 */}
      <StyledLink href="/">青色リンク</StyledLink>
      <hr />
    </div>
  )
}

export default PageLinkProps