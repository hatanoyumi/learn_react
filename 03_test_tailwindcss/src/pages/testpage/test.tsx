import Link from 'next/link';

export default function Page() {
  return (
    <>
      <h1>testpage2</h1>
      <p>ここはテストページ2</p>
      <h1>これはh1テスト</h1>
      <h2>これはh2テスト</h2>
      <h3>これはh3テスト</h3>
      <h4>これはh4テスト</h4>
      <h5>これはh5テスト</h5>
      <p>これはPテスト</p>

      <Link href="./" className='block mt-10'>← Back to test TOP</Link>
    </>
  );
}