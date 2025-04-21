import { posts } from '~/const/posts'
import type { Route } from './+types/home'
import { Link } from 'react-router'
import { HomeNav } from '~/components/home-nav'

export function meta({}: Route.MetaArgs) {
 return [
   { title: 'New React Router App' },
   { name: 'description', content: 'Welcome to React Router!' },
 ]
}

export default function Home() {
  return (
    <>
      <HomeNav />
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
           <Link to={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
