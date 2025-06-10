# learn_react

ReactとNextの勉強場所

00 Nextテンプレート（appとpagesのフォルダ構成の違い確認用）<br>
01 Next<br>
02 React<br>
03 tailwindcss(pages_router)<br>
04 learn_js<br>
05 next_microcms(ヘッドレスCMSテスト用)→一階層上に移動<br>
<br>
ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー<br>
04_learn_js内で勉強<br>
<br>

20250123〜0213 learn_js → JS学習「これからのjavascriptの教科書」使用<br>
→ learn_js/Vite/vite-animation<br>
<br>
20250213〜 ReactでTODOリスト　参照：https://developer.mozilla.org/ja/docs/Learn_web_development/Core/Frameworks_libraries/React_getting_started<br>
→ learn_js/Vite/React_TODO<br>
<br>
2025/2/19〜2/27　React と TypeScript で簡単 TODO アプリ 参照：https://zenn.dev/sprout2000/articles/40328708afaeb9<br>
→ learn_js/Vite/React_TS_todo<br>
<br>
2025/3/13〜 JavaScript Primer 応用編　参照：https://jsprimer.net/<br>
3/14 「Ajax通信」<br>
→ learn_js/JS_Primer/ajaxapp<br>
「Node.jsでCLIアプリケーション」<br>
→ learn_js/JS_Primer/nodecli<br>
「Todoアプリ」<br>
→ learn_js/JS_Primer/todoapp<br>
<br>
2025/3/24〜　React Hooks と TypeScript でつくる Todo PWA ~ 入門 React ハンズオン　参照：https://zenn.dev/sprout2000/books/76a279bb90c3f3<br>
4/3 → GitHubページの設定で公開元ブランチをgh-pagesに変更。<br>
参照：https://docs.github.com/ja/pages/quickstart<br>
完成したのがこちら：https://hatanoyumi.github.io/learn_react/<br>
<br>
2025/4/14〜17 ヘッドレスUIをReactで使ってみる 参照：https://ics.media/entry/230413/<br>
結果：learn_js/Vite/headless_ui<br>
<br>
2025/4/17〜18 QRコードを読み込むスタンプカード　参照：https://qiita.com/yo16/items/d17f145e237a3dba5bd3<br>
結果：learn_js/Vite/stamp_card<br>
※この記事内容ではQRコード読み込んでない。一旦保留<br>
<br>
2025/04/21〜　<br>
React Router v7(フレームワーク利用) 実践ガイド：ブログサイトを作りながら学ぶ最新ルーティング<br>
参照：https://shinagawa-web.com/blogs/react-router-v7-framework-guide-blog-site-routing-example<br>
結果：learn_js/react-router-v7-Framework<br>
<br>
React Router v7(ライブラリ利用)を使ったブログサイトの構築ガイド<br>
参照：https://shinagawa-web.com/blogs/react-router-v7-library-blog-setup-guide<br>
結果：learn_js/Vite/react-router_v7<br>
<br>
React Router v7(フレームワーク利用) 実践ガイド：ブログサイトを作りながら学ぶサーバーサイド、クライアントサイドのレンダリング<br>
参照：https://shinagawa-web.com/blogs/react-router-v7-framework-blog-site-rendering-example<br>
※サーバーサイドレンダリングまで。<br><br>
ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー<br><br>
2025/04/23〜<br>
microCMS<br>
参照<br>
https://blog.microcms.io/what-is-headlesscms/<br>
https://blog.microcms.io/getting-started/<br>
https://blog.microcms.io/microcms-next15-jamstack-blog/<br>
GitHub<br>
https://github.com/hatanoyumi/next_microcms<br>
vercel<br>
https://next-microcms-murex.vercel.app/<br>
※記事作成から配信まで若干タイムラグがある<br>
4/24 お知らせ作ってみるテスト<br>
https://vercel.com/hatanoyumis-projects/microcms-news<br>
<br>
4/25〜5/1 microCMSのカスタムフィールドを使ってランディングページを作ろう<br>
参照<br>
https://blog.microcms.io/custom-field-lp/<br>
※繰り返しフィールドは思ったように使えない。最終的にお知らせ用APIを流用。<br>（ヘッダーフッターは単独ならカスタムフィールドでまとめて作れる）<br>
vercel<br>
https://vercel.com/hatanoyumis-projects/microcms-lp<br>
<br>
5/2<br>
v0いろいろ試してみたけど微妙。いらないファイル残りすぎのところでフリープラン制限終了<br>
【Nextjs15】microCMSとAIを使って技術ブログを作成する 前編<br>
https://www.nagato-tech.com/article/nextjs-microcms-v0 <br>
vercel<br>
https://vercel.com/hatanoyumis-projects/v0-japanese-blog-website<br>
→ 最終的にお手上げ（teilwindcssの3系と4系の違いでエラーが出るようで、一度エラーになると最初からになる<br>
<br>
5/16〜<br>
2025年人気No.1のNext.jsで、最新ツールとウェブを作る！<br>エピソード1 紹介と環境設定　https://qiita.com/BNR-Long/items/e9cdf626edb8e46aa4b7<br>
エピソード２　https://qiita.com/BNR-Long/items/ab62e7348a5e760d0c54<br>
エピソード３　https://qiita.com/BNR-Long/items/a454b14951a113d96b19<br>
※最新のＮextはteilwindcss４の設定が最初からされているので、追加で何か入れる必要はない（入れるとエラーになる）<br>
５までやって、ブログ部分にmicroCMSを入れてみる。成功！<br>
vercel<br>
https://vercel.com/hatanoyumis-projects/06_next_learn

<br><br>
2025/05/22〜 <br>
参照： サバイバルTypeScript( https://typescriptbook.jp/ )
結果：　learn_ts/random-catcat<br>
vercel: https://learn-ts-affn.vercel.app/<br>

<br>
2025/05/27<br>
図解ハンズオン：Reactを使った音楽プレイヤーを作ろう！<br>
参照： https://qiita.com/Sicut_study/items/a27fb53468e14216d6fb<br>
結果：learn_js/Vite/react_music-player<br>
vercel: https://reactmusic-player.vercel.app/<br>
<br>

javascriptの基本を忘れがちなのでおさらい<br>
5/28　mdn web docs( https://developer.mozilla.org/ja/docs/Learn_web_development )<br>
→　learn_mdn-web-docs<br>
<br>

5/29〜　Learn JavaScript　https://learnjavascript.online<br>
※無料でできるところまで<br>
<br>

6/5〜<br>
ReactでTODOリストをもう一回　参照：https://developer.mozilla.org/ja/docs/Learn_web_development/Core/Frameworks_libraries/React_getting_started<br>
→ learn_js/Vite/React_TODO2<br>

