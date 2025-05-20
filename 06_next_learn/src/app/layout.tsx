import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Next.js 2025シリーズ',
  description: '2025年のウェブ開発を学ぶ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="font-sans antialiased">
        <header className="bg-blue-800 text-white p-4">
          <nav className="max-w-4xl mx-auto flex justify-between">
            <Link href="/" className="text-xl font-bold">ホーム</Link>
            <div className="space-x-4">
              <Link href="/about" className="hover:underline">About</Link>
              <Link href="/contact" className="hover:underline">Contact</Link>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-200 p-4 text-center text-gray-600">
          © 2025 Next.js学習シリーズ
        </footer>
      </body>
    </html>
  );
}