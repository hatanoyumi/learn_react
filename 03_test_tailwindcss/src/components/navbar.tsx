export default function Navbar() {
  return (
      <nav>
        <ul className="flex text-sm items-center justify-center h-12">
          <li className="w-36 h-12 bg-indigo-200 mx-1 rounded-lg overflow-hidden"><a href="../" className="flex w-full h-full items-center justify-center">index</a></li>
          <li className="w-36 h-12 bg-indigo-200 mx-1 rounded-lg overflow-hidden"><a href="../about" className="flex w-full h-full items-center justify-center">about</a></li>
          <li className="w-36 h-12 bg-indigo-200 mx-1 rounded-lg overflow-hidden"><a href="../testpage" className="flex w-full h-full items-center justify-center">testpage</a></li>
        </ul>
      </nav>
)
}