export default function Navbar() {
  return (
      <nav>
        <ul className="flex text-sm items-center justify-center h-12">
          <li className="w-36 bg-indigo-200 text-center"><a href="../">index</a></li>
          <li className="w-36 bg-indigo-200 text-center"><a href="../about">about</a></li>
          <li className="w-36 bg-indigo-200 text-center"><a href="../testpage">testpage</a></li>
        </ul>
      </nav>
)
}