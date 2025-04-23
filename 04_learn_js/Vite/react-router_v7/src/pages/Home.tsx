import { posts } from "../const/posts"
import { Link } from "react-router";
import { NavMenu } from "./NavMenu";

function Home () {
  return (
    <>
      <h1>ホーム</h1>
      <NavMenu />
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;