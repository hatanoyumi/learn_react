// import { MyListbox } from "./MyListbox";

// function App() {
//   return (
//     <div>
//       <h1>Headless uiのListboxを使ったサンプル（スタイルなし）</h1>
//       <p>
//         <a href="https://headlessui.com/react/listbox">Listbox (Select)</a>
//         を使ったサンプルです。
//       </p>
//       <section style={{ padding: "40px" }}>
//         <MyListbox />
//       </section>
//     </div>
//   );
// }

// export default App;

import { ListboxPlainSample } from "./components/ListPlainSample";
// import { ListboxStyledSample } from "./components/ListStyledSample";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.root}>
      <h1>Headless uiのListboxを使ったサンプル(React)</h1>
      <p>
        <a href="https://headlessui.com/react/listbox">Listbox (Select)</a>
        を使ったサンプルです。
      </p>

      <section>
        <h2 id="plain">スタイリング前のリストボックス</h2>
        <p>
          機能のみでスタイルを一切指定していない例です。
          スタイルが当たっていない状態では選択・フォーカスされている項目がわからないので、それらは絵文字（👉✅）を追加して示しています。
          この状態でもキーボード操作による選択や読み上げツールの対応ができていることに注目してください。
        </p>
        <ListboxPlainSample />
      </section>
      <section>
        <h2 id="styled">独自のスタイルを追加したリストボックス</h2>
        <p>
          上の例に独自のスタイルを追加した例です。 ここでは簡単に利用できるCSS
          Modulesを使用していますが、Styled
          ComponentやTailwindなど、好きなスタイリング方法を使うことができます。
        </p>
        {/* <ListboxStyledSample /> */}
      </section>
    </div>
  );
}

export default App;
