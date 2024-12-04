import React, { useState, useEffect, useLayoutEffect } from "react"

// タイマーが呼び出される周期を1秒に
const UPDATE_CYCLE = 1000

// localstorageで使用するキー
const KEY_LOCALE = 'KEY_LOCALE'

enum Locale {
  US = 'en-US',
  JP = 'ja-JP',
}

const getLocaleFromString = (text: string) => {
  switch (text) {
    case Locale.US: return Locale.US
    case Locale.JP: return Locale.JP
    default: return Locale.US
  }
}

export const Clock = () => {
  const [timestamp, setTimestamp] = useState(new Date())
  const [locale, setLocale] = useState(Locale.US)

  // タイマーのセットをするための副作用
  useEffect(() => {
    // タイマーのセット
    const timer = setInterval(() => {
      setTimestamp(new Date())
    }, UPDATE_CYCLE)

    // クリーンアップ関数を渡してアンマウント時にタイマーを解除
    return () => {
      clearInterval(timer)
    }
    // 初期描画時のみ実行
  }, [])

  // localStorageから値を読み込むための副作用
  useEffect (() => {
    const saveLocale = localStorage.getItem(KEY_LOCALE)
    if (saveLocale != null) {
      setLocale(getLocaleFromString(saveLocale))
    }
  }, [])
  // useLayoutEffectは初期描画が反映される前にデータが読み込まれるのでチラつきが防げる
  // useLayoutEffect (() => {
  //   const saveLocale = localStorage.getItem(KEY_LOCALE)
  //   if (saveLocale != null) {
  //     setLocale(getLocaleFromString(saveLocale))
  //   }
  // }, [])

  // localeが変化した時に、localStorageに値を保存するための副作用
  useEffect(() => {
    localStorage.setItem(KEY_LOCALE, locale)
    // 依存配列にlocaleを渡し、localeが変化するたびに実行するようにする
  }, [locale])

  return (
    <div>
      <h2>useEffectとuseLayoutEffect</h2>
      <p>
        <span id="current-time-label">現在時刻</span>
        <span>:{timestamp.toLocaleString(locale)}</span>
        <select value={locale} onChange={(e) => setLocale(getLocaleFromString(e.target.value))}>
          <option value="en-US">en-US</option>
          <option value="ja-JP">ja-JP</option>
        </select>
      </p>
      <hr />
    </div>
  )
}