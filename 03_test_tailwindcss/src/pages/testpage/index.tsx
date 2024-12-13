import Link from 'next/link';
import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <title>Testページ</title>
      </Head>

      <h1>testpage</h1>
      <p>ここはテストページ</p>

      <div className='w-6/12 text-left my-0 mx-auto'>
        <Link href="../testpage/test" className='block mt-10'>１）test.tsxへ</Link>
        <Link href="../testpage/test_images" className='block'>２）画像テストページへ</Link>
      </div>
    </>
  );
}