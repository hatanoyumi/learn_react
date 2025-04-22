type Post = {
  userId: number;
  id: number;
  title: number;
  body: string;
  description: string;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const fetchPosts = async (): Promise<Post[]> => {
  console.log('fetch')
  // await sleep(3000)
  // // 投稿一覧のデータを取得する
  // const response = await fetch('http://localhost:5173/test.json')
  // return await response.json()

  return new Promise((resolve) =>
    setTimeout(() => {
      fetch('http://localhost:5173/test.json')
        .then((response) => response.json())
        .then((data) => resolve(data))
    }, 1000),
  )
}