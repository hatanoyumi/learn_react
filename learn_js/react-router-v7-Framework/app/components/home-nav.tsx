import { NavLink } from "react-router";

export function HomeNav() {
  return (
    <nav className="-top">
      <NavLink to="/" end>
       TOP
      </NavLink>
      <NavLink to="/mypage">
        マイページ
      </NavLink>
    </nav>
  )
}