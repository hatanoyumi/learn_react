import Link from 'next/link';

export default function Navbar() {
  return (
      <nav>
        <ul className="flex text-sm items-center justify-center h-12">
          <li className="w-36 h-12 bg-indigo-200 mx-1 rounded-lg overflow-hidden"><Link href="../" className="flex w-full h-full items-center justify-center">index</Link></li>
          <li className="w-36 h-12 bg-indigo-200 mx-1 rounded-lg overflow-hidden"><Link href="../about/" className="flex w-full h-full items-center justify-center">about</Link></li>
          <li className="w-36 h-12 bg-indigo-200 mx-1 rounded-lg overflow-hidden"><Link href="../testpage/" className="flex w-full h-full items-center justify-center">testpage</Link></li>
        </ul>
      </nav>
)
}