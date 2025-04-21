import { Outlet } from "react-router";
import { HomeNav } from "~/components/home-nav";
import { MyPageNav } from "~/components/mypage-nav";

export default function MyPage() {
  return (
    <>
      <HomeNav />
      <MyPageNav />
      <Outlet />
    </>
  )
}