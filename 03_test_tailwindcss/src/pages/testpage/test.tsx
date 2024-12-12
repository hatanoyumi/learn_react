import Link from 'next/link';

export default function Page() {
  return (
    <main className="text-center">
      <h1>testpage2</h1>
      <p>ここはテストページ2</p>

      <Link href="/" className='block mt-10'>← Back to home</Link>
    </main>
  );
}