import Link from 'next/link';

export default function Page() {
  return (
    <main className="text-center">
      <h1>testpage</h1>
      <p>ここはテストページ</p>
      <Link href="../testpage/test">test.tsxへ</Link>
    </main>
  );
}