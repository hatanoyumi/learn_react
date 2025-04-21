// 個別記事を表示するコンポーネント

import { getPostById } from "~/const/posts";
import type { Route } from "./+types/post";
import { HomeNav } from "~/components/home-nav";

export default function Post ({ params }: Route.ComponentProps) {
  const post = getPostById(Number(params.postId))

  if (!post) {
    return (
      <>
        <HomeNav />
        <div>投稿が見つかりませんでした</div>
      </>
    )
  }

  return (
    <div>
      <HomeNav />
      <h1>{post.title}</h1>
      {post.description}
    </div>
  )
}