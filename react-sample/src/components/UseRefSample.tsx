import React, { useState, useRef } from "react"

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const UPLOAD_DELAY = 5000

const ImageUploader = () => {
  // 隠れたinput要素にアクセスするためのref
  const inputImageRef = useRef<HTMLInputElement | null>(null)
  // 選択されたデータを保持するref
  const fileRef = useRef<File | null>(null)
  const [message, setMessage] = useState<string | null>('')

  // 「画像をアップロード」テキストがクリックされた時のコールバック
  const onClickText = () => {
    if (inputImageRef.current !== null) {
      // inputのDOMにアクセスしてクリックイベントを発火
      inputImageRef.current.click()
    }
  }

  // ファイルが選択された後に呼ばれるコールバック
  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files !== null && files.length > 0) {
      // fileRef.currentに値を保存する。変化しても再描画は発生しない
      fileRef.current = files[0]
    }
  }

  // アップロードボタンがクリックされた時に呼ばれるコールバック
  const onClickUpload = async () => {
    if (fileRef.current !== null) {
      // 本来はAPIを呼んでファイルをアップするけど、ここでは擬似的に一定時間待つ
      await sleep(UPLOAD_DELAY)
      // アップロードが成功したことを表示するためにメッセージを書き換える
      // eslint-disable-next-line no-template-curly-in-string
      setMessage('${fileRef.current.name} has been successfully uploaded')
    }
  }

  return (
    <div>
      <h2>useRef</h2>
      <p style={{ textDecoration: 'underline' }} onClick={onClickText}>
        画像をアップロード
      </p>
      <input ref={inputImageRef} type="file" accept="image/*" onChange={onChangeImage} style={{ visibility: 'hidden' }} />
      <br />
      <button onClick={onClickUpload}>アップロードする</button>
      {message !== null && <p>{message}</p>}

      <hr />
    </div>
  )
}


export default ImageUploader