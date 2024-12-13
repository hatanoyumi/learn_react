import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <title>画像表示テスト</title>
      </Head>

      <h1>testpage3</h1>
      <p>画像表示テスト</p>
      <div className='flex items-center justify-center'>
        <Image className='mx-1' src={"/images/pic01.jpg"} alt='testImage1' width={260} height={260} />
        <Image className='mx-1' src={"/images/pic02.jpg"} alt='testImage2' width={260} height={260} />
        <Image className='mx-1' src={"/images/pic03.jpg"} alt='testImage3' width={260} height={260} />
      </div>

      <Link href="./" className='block mt-10'>← Back to test TOP</Link>
    </>
  );
}