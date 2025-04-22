// import { posts } from '~/const/posts'
import { Suspense } from 'react'
import type { Route } from './+types/home'
import { Await, Link } from 'react-router'
import { HomeNav } from '~/components/home-nav'
import { fetchPosts } from '~/lib/data'
import { Spinner } from '~/components/spinner'


export function meta({}: Route.MetaArgs) {
 return [
   { title: 'New React Router App' },
   { name: 'description', content: 'Welcome to React Router!' },
 ]
}

export async function loader() {
  // const posts = await fetchPosts()
  // return posts
  const data = fetchPosts()
  return { data }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { data } = loaderData

  return (
    <>
      <HomeNav />
      <Suspense fallback={<Spinner />}>
        <Await resolve={data}>
          {(value) => {
            return (
              <section className='contents'>
                <ul className='list'>
                  {value.map((post) => (
                    <li key={post.id}>
                      <Link to={`/post/${post.id}`}>・{post.title}</Link>
                      <p className='text'>{post.description}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )
          }}
        </Await>
      </Suspense>
    </>
  )
}
