import { NavLink } from "react-router";

export function MyPageNav() {
  return (
    <nav className="-mypage">
      <NavLink to="/mypage/account" end>
        アカウント
      </NavLink>
      <NavLink to="/mypage/settings" end>
        設定画面
      </NavLink>
    </nav>
  )
}