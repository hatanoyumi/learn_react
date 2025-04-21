export const posts = [
  {
    id: 1,
    title: 'React Router 7のセットアップ',
    description: 'セットアップ以外にも様々な機能をご紹介',
  },
  {
    id: 2,
    title: 'Reactでの状態管理方法',
    description: 'useState、useContextなどをご紹介',
  },
  {
    id: 3,
    title: 'コンポーネント設計のベストプラクティス',
    description: 'ディレクトリ構成についてもご紹介',
  },
]

export const getPostById = (id: number) => {
  return posts.find((post) => post.id === id)
}