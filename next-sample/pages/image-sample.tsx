import { NextPage } from "next";
import Image from 'next/image';

// 画像ファイルをインポート
import PicImage from '../public/images/pic03.jpg';

const ImageSample: NextPage<void> = (props) => {
  return (
    <div>
      <h1>画像表示の比較</h1>
      <p>imgタグで表示した場合（いつもの）</p>
      <img src="../images/pic03.jpg" alt="" />
      <p>Imageコンポーネントを使用した場合</p>
      <Image src={PicImage} alt={""} />
      <p>Imageで表示した場合、事前に描画エリアが確保される（自動的に圧縮されて軽くなるけど画質が悪くなる）</p>
    </div>
  )
}

export default ImageSample
