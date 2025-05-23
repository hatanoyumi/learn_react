// React から useState フックをインポート
// useEffect フックをインポート
import { useEffect, useState } from "react";

// FormDialog コンポーネント を名前付きインポートする
import { FormDialog } from "./FormDialog";

// ActionButton コンポーネント をインポートする
import { ActionButton } from "./ActionButton";

// SideBar コンポーネント をインポート
import { SideBar } from "./SideBar";

// TodoItem コンポーネント をインポート
import { TodoItem } from "./TodoItem";

// ToolBar コンポーネント をインポート
import { ToolBar } from "./ToolBar";

// GlobalStyles モジュールをインポート
import GlobalStyles from "@mui/material/GlobalStyles";

// スタイルエンジンのモジュールとカラーをインポート
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { indigo, pink } from "@mui/material/colors";

// QR表示コンポーネントをインポート
import { QR } from "./QR";

// AlertDialog コンポーネント
import { AlertDialog } from './AlertDialog';

// localforage をインポート
import localforage from "localforage";

// 型チェック
import { isTodos } from "./lib/isTodos";



// テーマを作成
const theme = createTheme({
  palette: {
    // プライマリーカラー
    primary: {
      main: indigo[500],
      light: '#757de8',
      dark: '#002984',
    },
    // セカンダリーカラー
    secondary: {
      main: pink[500],
      light: '#ff6090',
      dark: 'b0003a',
    },
  },
});

// // "Todo型" の定義
// type Todo = {
//   // プロパティ value は文字列型
//   value: string;
//   readonly id: number;
//   // 完了/未完了を示すプロパティ
//   checked: boolean;
//   // タスクの削除/未削除を示すフラグ
//   removed: boolean;
// };
// →→Todo.d.tsへ移動

// // 現在のフィルターを格納する filter ステートを追加
// type Filter = 'all' | 'checked' | 'unchecked' | 'removed';
// →→Filter.d.tsへ移動

export const App = () => {

  // 初期値: 空文字列 ''
  const [text, setText] = useState('');
  // 追加
  const [todos, setTodos] = useState<Todo[]>([]);
  // 追加
  const [filter, setFilter] = useState<Filter>('all');
  // SideBar コンポーネント を MUI化する (ドロワーの状態を管理するステートを追加)
  const [drawerOpen, setDrawerOpen] = useState(false);
  // QR コード表示機能を追加
  const [qrOpen, setQrOpen] = useState(false);
  // ダイアログの状態を管理するステートを追加
  const [dialogOpen, setDialogOpen] = useState(false);
  // AlertDialog コンポーネント用
  const [alertOpen, setAlertOpen] = useState(false);


  //// setText していた部分を関数 handleChange() として書き出し
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setText(e.target.value);
  // };
  // ↓↓ FormDialog追加で変更
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(e.target.value);
  };


  // todos ステートを更新する関数
  const handleSubmit = () => {
    // 何も入力されていなかったらリターン
    // if (!text) return;
    // ↓ FormDialog コンポーネントの追加で変更
    if (!text) {
      // 何も入力されなかった時
      setDialogOpen((dialogOpen) => !dialogOpen);
      return;
    }

    // 新しいTodoを作成
    // 明示的に型注釈をつけてオブジェクトの方を限定
    const newTodo: Todo = {
      // textのステート値をvalueプロパティへ
      value: text,
      /**
      * Todo型オブジェクトの型定義が更新されたため、
      * number型の id プロパティの存在が必須になった
      */
      id: new Date().getTime(),
     checked: false, // 初期値（todo 作成時）は false
     removed: false, // 削除/未削除を示すフラグ追加
    };

    /**
     * 更新前の todos ステートを元に
     * スプレッド構文で展開した要素へ
     * newTodo を加えた新しい配列でステートを更新
     **/
    setTodos((todos) => [newTodo, ...todos]);
    // フォームへの入力をクリア
    setText('');
    // FormDialog コンポーネントを閉じる
    setDialogOpen((dialogOpen) => !dialogOpen);
  };

  // // 登録済み todo が編集された時のコールバック関数を作成
  // const handleEdit = (id: number, value: string) => {
  //   setTodos((todos) => {
  //     /**
  //      * 引数として渡された todo の id が一致する
  //      * 更新前の todos ステート内の todo の
  //      * value プロパティを引数 value (= e.target.value) に書き換える
  //      */
  //     const newTodos = todos.map((todo) => {
  //       if (todo.id === id) {
  //         // todo.value = value;
  //         /**
  //          * この階層でオブジェクト todo をコピー・展開し、
  //          * その中で value プロパティを引数で上書きする
  //         */
  //        return { ...todo, value }; // 省略記法
  //         /**
  //          * 以下と同義:
  //          * return { ...todo, value: value }
  //         */
  //       }
  //       return todo;
  //     });
  //     // todos ステートを更新
  //     return newTodos;
  //   });
  // };

  // // チェックボックスがチェックされたときのコールバック関数を作成
  // const handleCheck = (id: number, checked: boolean) => {
  //   setTodos((todos) => {
  //     const newTodos = todos.map((todo) => {
  //       if (todo.id === id) {
  //         return {...todo, checked};
  //       }
  //       return todo;
  //     });

  //     return newTodos;
  //   });
  // };

  // // 削除ボタンがクリックされたときのコールバック関数を作成
  // const handleRemove = (id: number, removed: boolean) => {
  //   setTodos((todos) => {
  //     const newTodos = todos.map((todo) => {
  //       if (todo.id === id) {
  //         return { ...todo, removed };
  //       }
  //       return todo;
  //     });

  //     return newTodos;
  //   });
  // };

  /**
   * 同じような関数３つをジェネリクスでリファクタリング
   * （handleCheck、handleEdit、handleRemove）
  */
  const handleTodo = <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V
  ) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return {...todo, [key]: value};
        } else {
          return todo;
        }
      });

      return newTodos;
    });
  };

  // filter ステート を更新するコールバック関数の作成とイベントへの紐付け
  const handleFilter = (filter: Filter) => {
    setFilter(filter);
  };

  // 「ゴミ箱を空にする」関数の作成
  const handleEmpty = () => {
    setTodos((todo) => todo.filter((todo) => !todo.removed));
  };

  // // フィルタリング後の Todo型の配列をリスト表示
  // const filteredTodos = todos.filter((todo) => {
  //   // filter ステートの値に応じて異なる内容の配列を返す
  //   switch (filter) {
  //     case 'all':
  //       // 削除されていないもの
  //       return !todo.removed;
  //     case 'checked':
  //       // 完了済み かつ 削除されていないもの
  //       return todo.checked && !todo.removed;
  //     case 'unchecked':
  //       // 未完了 かつ 削除されていないもの
  //       return !todo.checked && !todo.removed;
  //     case 'removed':
  //       // 削除済みのもの
  //       return todo.removed;
  //     default:
  //       return todo;
  //   }
  // });
  // →→ TodoItem.tsxへ移動

  // Array map
  // 例)
  // const items = [0, 1, 2];
  // const newItems = items.map((item) => item * 2); // --> [0, 2, 4]
  //
  // for文で同義を書いた場合
  // const newItems = [];
  // for (let i = 0; i < items.length; i++) {
  //   newItems.push(items[i] * 2);
  // }

  // ドロワーの状態を管理するステートの表示・非表示を切り替える関数
  const handleToggleDrawer = () => {
    setDrawerOpen((drawerOpen) => !drawerOpen);
  };

  // QR コード表示機能を管理するステートの表示・非表示を切り替える関数
  const handleToggleQR = () => {
    setQrOpen((qrOpen) => !qrOpen);
  };

  // FormDialog コンポーネント
  const handleToggleDialog = () => {
    setDialogOpen((dialogOpen) => !dialogOpen);
    // フォームへの入力をクリア
    setText('');
  };

  // AlertDialog コンポーネント
  const handleToggleAlert = () => {
    setAlertOpen((alertOpen) => !alertOpen);
  };

  /**
   * [useEffect フック]
   * useEffect フックはコンポーネントの内側、return 文の直前に配置
   *
   * キー名 'todo-20200101' のデータを取得
   * 第 2 引数の配列が空なのでコンポーネントのマウント時のみに実行される
;  */
  // useEffect(() => {
  //   localforage
  //     .getItem('todo-20200101')
  //     .then((values) => setTodos(values as Todo[]));
  // }, [])
  // ↓↓型チェックを適用
  useEffect(() => {
    localforage
    .getItem('todo-20200101')
    .then((values) => isTodos(values) && setTodos(values));
  }, []);

  /**
   * todos ステートが更新されたら、その値を保存
  */
  useEffect(() => {
    localforage.setItem('todo-20200101', todos);
  }, [todos]);




  return(
    // MUIのテーマを作成したら、ThemeProviderでラップする
    <ThemeProvider theme={theme}>

      {/* GlobalStylesを追加 */}
      <GlobalStyles styles={{ body: {margin: 0, padding: 0 } }} />

      {/* ToolBarを追加 filter ステート を props として渡す + ドロワーを開く */}
      <ToolBar filter={filter} onToggleDrawer={handleToggleDrawer} />

      {/* フィルタリングするセレクタを作成 */}
      {/* e.target.value: string を Filter型にアサーションする */}
      {/* <select
      defaultValue="all"
      onChange={(e) => handleFilter(e.target.value as Filter)}>
        <option value="all">全てのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">現在のタスク</option>
        <option value="removed">ゴミ箱</option>
      </select> */}
      {/* →→ SideBar.tsxへ移動 */}

      {/* SideBarに渡すpropsに書き換え */}
      {/* <SideBar onFilter={handleFilter} /> */}
      {/* ↓↓ MUIコンポーネントに書き換え */}
      <SideBar
        drawerOpen={drawerOpen}
        onToggleDrawer={handleToggleDrawer}
        onFilter={handleFilter}
        // 追加
        onToggleQR={handleToggleQR}
      />

      {/* QRコード表示の追加 */}
      <QR open={qrOpen} onClose={handleToggleQR} />


      {/* フィルターが `removed` のときは「ごみ箱を空にする」ボタンを表示 */}
      {/* {filter === 'removed' ? (
        <button
          onClick={handleEmpty}
          // ゴミ箱が空の場合
          disabled={todos.filter((todo) => todo.removed).length === 0}
        >
          ゴミ箱を空にする
        </button>
      ) : (
        // フィルターが `checked` でなければ Todo 入力フォームを表示
        filter !== 'checked' && (
        // コールバックとして () => handleSubmit() を渡す
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          // ↓textステートを作成
          <input
            type="text"
            // text ステートが持っている入力中テキストの値を value として表示
            value={text}
            // 「ごみ箱」や「完了したタスク」が表示されている時は、あらたなタスクを追加できないようにする
            // disabled={filter === 'checked' || filter === 'removed'}
              // ↑ ゴミ箱を空にする機能を追加したので削除
            // onChange イベント（＝入力テキストの変化）を text ステートに反映する
            // onChange={(e) => setText(e.target.value)}
            // ↓
            onChange={(e) => handleChange(e)}
          />
          <input
            type="submit"
            value="追加"
            // disabled={filter === 'checked' || filter === 'removed'}
            // ↑ ゴミ箱を空にする機能を追加したので削除
            onSubmit={handleSubmit}
          />
        </form>
        // →→ FormDialog.tsxへ移動
        )
      )} */}
      {/* →→ ゴミ箱のフィルターチェックは、ActionButton.tsxへ移動 */}

      {/* FormDialogに渡すpropsに書き換え */}
      <FormDialog
        text={text}
        onChange={handleChange}
        onSubmit={handleSubmit}
        // 追加
        dialogOpen={dialogOpen}
        onToggleDialog={handleToggleDialog}
      />

      {/* <ul>
        // {todos.map((todo) => {
        // ↓ フィルタリング済みのリストを渡すように書き換え
        {filteredTodos.map((todo) => {
          return (
            <li key={todo.id}>
              // チェックボックスの追加
              <input
                type="checkbox"
                disabled={todo.removed}
                checked={todo.checked}
                // 呼び出し側で checked フラグを反転させる
                onChange={() => handleTodo(todo.id, 'checked', !todo.checked)}
              />
              <input
                type="text"
                // チェック済みの項目は編集用フォームを無効に
                disabled={todo.checked || todo.removed}
                value={todo.value}
                onChange={(e) => handleTodo(todo.id, 'value', e.target.value)}
              />
              // 削除ボタンの追加
              <button onClick={() => handleTodo(todo.id, 'removed', !todo.removed)}>
                {todo.removed ? '復元' : '削除'}
              </button>
            </li>
          );
        })}
      </ul> */}
      {/* →→ filteredTodos と併せて TodoItem.tsxへ移動 */}

      {/* AlertDialog コンポーネント */}
      <AlertDialog
        alertOpen={alertOpen}
        onEmpty={handleEmpty}
        onToggleAlert={handleToggleAlert}
      />

      {/* TodoItemに渡すpropsに書き換え */}
      <TodoItem todos={todos} filter={filter} onTodo={handleTodo} />

      {/* ActionButtonに渡すpropsに書き換え */}
      <ActionButton
        todos={todos}
        filter={filter}
        alertOpen={alertOpen}
        dialogOpen={dialogOpen}
        onToggleAlert={handleToggleAlert}
        onToggleDialog={handleToggleDialog}
        />

    </ThemeProvider>
  );
};