import { NavLink } from "react-router";
import './styles.css';

export function NavMenu() {
  return (
    <nav>
      <NavLink to="/" end>ホーム</NavLink>
      <NavLink to="/mypage/settings">マイページ</NavLink>
    </nav>
  );
};
