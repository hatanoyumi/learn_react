// import Header from './header'
// import Footer from './footer'
// import Head from 'next/head';


// export default function Layout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <>
//     <Head>
//       <title>共通レイアウト（個別タイトルを入れていなければこれが表示される）</title>
//     </Head>

//     <Header />
//       <main className="max-w-screen-2xl md:px-8 mx-auto my-0 text-center">{children}</main>
//     <Footer />
//     </>
//   );
// }
import type { ReactNode } from 'react';
import Header from './header'
import Footer from './footer'
import Head from 'next/head'
import styles from './layout.module.css'
import { twMerge } from 'tailwind-merge'

type Props = {
	children: ReactNode;
};

const Layout = ({ children }: Props) => {
	return (
    <>
    <Head>
      <title>共通レイアウト（個別タイトルを入れていなければこれが表示される）</title>
    </Head>

    <Header />
      <main className={styles.container}>{children}</main>
    <Footer />
    </>
  )
};

export default Layout;

