import Link from 'next/link';
import styles from '../components/layout.module.css'

export default function Navbar() {
  return (
    <nav>
      <ul className={styles.nav_li}>
        <li className={styles.btn_nav_li}><Link href="../">index</Link></li>
        <li className={styles.btn_nav_li}><Link href="../about/">about</Link></li>
        <li className={styles.btn_nav_li}><Link href="../testpage/">testpage</Link></li>
      </ul>
      <p className="text-gray-300 text-center text-xs">※Linkを使ってページ遷移（リロードしないでmainタグ内だけが変わる）。aタグを使うとページを読み込み直す</p>
    </nav>
  )
}