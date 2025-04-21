import { NavLink } from "react-router";

export function MyPageNav() {
  return (
    <nav className="mb-5 flex gap-4 border-b pb-5">
      <NavLink to="/mypage/account" end>
        account
      </NavLink>
      <NavLink to="/mypage/settings" end>
        settings
      </NavLink>
    </nav>
  )
}