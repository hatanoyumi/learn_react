import { useParams, useNavigate } from "react-router";
import { getPostById } from "../const/posts";

function Post () {
  const { id } = useParams()
  const navigate = useNavigate()

  const post = getPostById(Number(id))

  if (!post) {
    setTimeout(() => {
      navigate('/')
    }, 3000)
    return (
      <>
        <p>投稿が見つかりませんでした。トップページに戻ります...</p>
      </>
    )
  }

  return (
    <>
      <h1>{post.title}</h1>
      {post.description}
    </>
  );
};

export default Post;