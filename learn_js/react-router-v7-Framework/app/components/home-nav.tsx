import { NavLink } from "react-router";

export function HomeNav() {
  return (
    <nav className="pb-5 mb-5 border-b flex gap-4">
      <NavLink to="/" end>
       TOP
      </NavLink>
      <NavLink to="/mypage">
        MyPage
      </NavLink>
    </nav>
  )
}