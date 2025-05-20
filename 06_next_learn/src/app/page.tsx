// async function fetchPosts() {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
//   const posts = await res.json();
//   return posts;
// }

// async function fetchHello() {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
//   const data = await res.json();
//   return data.message;
// }

// export default async function Home() {
//   const posts = await fetchPosts();
//   const helloMessage = await fetchHello();

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//       <h1 className="text-4xl font-bold text-blue-600 mb-4">{helloMessage}</h1>
//       <ul className="space-y-4">
//         {posts.map((post) => (
//           <li key={post.id} className="bg-white p-4 rounded shadow">
//             <h2 className="text-xl font-semibold">{post.title}</h2>
//             <p className="text-gray-600">{post.body}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// import { getAllPosts } from "../lib/posts";

// export default async function Home() {
//   const posts = getAllPosts();

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-gray-100 py-8">
//       <h1 className="text-4xl font-bold text-blue-600 mb-8">ブログ投稿</h1>
//       <ul className="space-y-4 max-w-2xl w-full">
//         {posts.map((post) => (
//           <li key={post.id} className="bg-white p-4 rounded shadow">
//             <a href={`/posts/${post.id}`} className="text-xl font-semibold text-blue-500 hover:underline">
//               {post.title}
//             </a>
//             <p className="text-gray-500">{post.date}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// app/page.tsx
import Link from 'next/link';
import { client } from '../lib/microcms';

// ブログ記事の型定義
type Props = {
  id: string;
  title: string;
  category: { name: string };
};

// microCMSからブログ記事を取得
async function getBlogPosts(): Promise<Props[]> {
  const data = await client.get({
    endpoint: 'blogs', // 'blog'はmicroCMSのエンドポイント名
    queries: {
      fields: 'id,title,category.name',  // idとtitleを取得
      limit: 5,  // 最新の5件を取得
    },
  });
  return data.contents;
}

export default async function Home() {
  const posts = await getBlogPosts();

  return (
    <main>
      <h1>ブログ記事一覧</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blogs/${post.id}`}> {/* 記事へのリンクを生成 */}
              {post.title} {/* タイトルを表示 */}
              <p>カテゴリー：{post.category && post.category.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

