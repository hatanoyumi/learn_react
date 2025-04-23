import { Outlet } from "react-router";
import { NavMenu } from "./NavMenu";

function Layout() {
  const containerStyle: React.CSSProperties = {
    backgroundColor: "#f0f0f0",
    padding: "20px",
    minHeight: "100vh",
  }

  return (
    <div style={containerStyle}>
      <h1>マイページ</h1>
      <NavMenu />
      <Outlet />
    </div>
  );
};

export default Layout;