// 型のために導入
import { GetStaticProps, NextPage, NextPageContext } from 'next';
// Next.jsの組み込みコンポーネント
import Head from 'next/head';

// ページコンポーネントのpropsの型定義（ここでは空）
type SSGProps = {
  message: string;
};

// SSG向けのページの実装。NextPage <props>でpropsが入るPageであることを明示
// SSGはGetStaticPropsが返したpropsを受けとる。NextPage<SSGProps>はmessage: stringのみ受け取って生成されるページの型
const SSG: NextPage<SSGProps> = (props) => {
  const { message } = props;

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
        <p>{message}</p>
      </main>
    </div>
  )
}

// getStaticPropsはビルドで実行
// GetstaticProps<SSGProps>はSSGPropsを引数に取るgetStaticPropsの型
export const getStaticProps: GetStaticProps<SSGProps> = async (context) => {
  const timestamp = new Date().toLocaleString();
  const message = `${timestamp} にgetStaticPropsが実行されました`;
  console.log(message);
  return {
    // ここで返したpropsを元にページコンポーネントを描画する
    props: {
      message,
    },
  };
};

// ページコンポーネントはexport defaultでエクスポートする
export default SSG
