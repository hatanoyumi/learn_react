import { NavLink } from "react-router";
import '../styles.css';

export function NavMenu() {
  return (
    <nav>
      <NavLink to="/" end>TOP</NavLink>
      <NavLink to="/mypage/settings">設定画面</NavLink>
      <NavLink to="/mypage/account">アカウント</NavLink>
    </nav>
  );
};
