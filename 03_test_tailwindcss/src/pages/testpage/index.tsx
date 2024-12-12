import Link from 'next/link';

export default function Page() {
  return (
    <>
      <h1>testpage</h1>
      <p>ここはテストページ</p>

      <Link href="../testpage/test" className='block mt-10'>test.tsxへ</Link>
    </>
  );
}