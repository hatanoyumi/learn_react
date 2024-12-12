import Header from './header'
import Footer from './footer'


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main className="max-w-screen-2xl md:px-8 mx-auto my-0 text-center">{children}</main>
      <Footer />
    </div>
  );
}