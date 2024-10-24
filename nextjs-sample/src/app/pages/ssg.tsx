

// 型のために導入
import { NextPage } from 'next'
// Next.jsの組み込みコンポーネント
import Head from 'next/head'

// ページコンポーネントのpropsの型定義（ここでは空）
type SSGProps = undefined

// SSG向けのページの実装。NextPage <props>でpropsが入るPageであることを明示
const SSG: NextPage<SSGProps> = () => {
  return (
    <div>
      {/* Headコンポーネントで包むと<head>タグに配置される */}
      <Head>
        <title>Static Site Generation</title>
        <link rel="icon" href="../favicon.ico" />
      </Head>

      <main>
        <p>
          このページは静的サイト生成によってビルド時に作成されたページです
        </p>
      </main>
    </div>
  )
}

// ページコンポーネントはexport defaultでエクスポートする
export default SSG
