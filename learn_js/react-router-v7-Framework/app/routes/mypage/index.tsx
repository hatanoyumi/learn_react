import { HomeNav } from "~/components/home-nav"
import { MyPageNav } from "~/components/mypage-nav"

export default function Mypage() {
  return (
    <>
      <HomeNav />
      <MyPageNav />
      <section className="contents">
        <h1>マイページ TOP</h1>
      </section>
    </>
  )
}