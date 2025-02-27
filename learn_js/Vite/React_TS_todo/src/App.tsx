// React から useState フックをインポート
// import { useState } from 'react';

// useEffect フックの実装
// localforage をインポート
import localforage from 'localforage';
// useEffect フックをインポート
import { useEffect, useState  } from 'react';

// ユーザー定義の型ガード関数を作成する
import { isTodos } from './lib/isTodos';


// type Todo = {
//   value: string;
//   readonly id: number;
//   // 完了/未完了を示すプロパティ
//   checked: boolean;
//   // タスクの削除/未削除を示すフラグ
//   removed: boolean;
// };
// →→→型エイリアスを型宣言ファイルとして書き出す

// type Filter = 'all' | 'checked' | 'unchecked' | 'removed';
// →→→型エイリアスを型宣言ファイルとして書き出す

export const App = () => {
  // 初期値: 空文字列 ''
  const [text, setText] = useState('');
  // 追加
  const [todos, setTodos] = useState<Todo[]>([]);
  // 追加
  const [filter, setFilter] = useState<Filter>('all');


  // text ステート向けの関数を用意する
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // todos ステートを更新する関数
  const handleSubmit = () => {
    // 何も入力されていなかったらリターン
    if (!text) return;

    // 新しい Todo を作成
    // 明示的に型注釈を付けてオブジェクトの型を限定する
    const newTodo: Todo = {
      // text ステートの値を value プロパティへ
      value: text,
      /**
      * Todo型オブジェクトの型定義が更新されたため、
      * number型の id プロパティの存在が必須になった
      */
      id: new Date().getTime(),
      // 初期値（todo 作成時）は false
      checked: false,
      removed: false,
    };

    /**
     * 更新前の todos ステートを元に
     * スプレッド構文で展開した要素へ
     * newTodo を加えた新しい配列でステートを更新
     **/
    setTodos((todos) => [newTodo, ...todos]);
    // フォームへの入力をクリアする
    setText('');
  };

  // // 登録済み todo が編集された時のコールバック関数を作成する
  // const handleEdit = (id: number, value: string) => {
  //   setTodos((todos) => {
  //     /**
  //      * 引数として渡された todo の id が一致する
  //      * 更新前の todos ステート内の todo の
  //      * value プロパティを引数 value (= e.target.value) に書き換える
  //      */
  //     const newTodos = todos.map((todo) => {
  //       if (todo.id === id) {
  //         /**
  //          * この階層でオブジェクト todo をコピー・展開し、
  //          * その中で value プロパティを引数で上書きする
  //          */
  //         return { ...todo, value };
  //       }
  //       return todo;
  //     });

  //     // todos ステートを更新
  //     return newTodos;
  //   });
  // };

  // // チェックボックスがチェックされたときのコールバック関数を作成する
  // const handleCheck = (id: number, checked: boolean) => {
  //   setTodos((todos) => {
  //     const newTodos = todos.map((todo) => {
  //       if (todo.id === id) {
  //         return { ...todo, checked};
  //       }
  //       return todo;
  //     });

  //     return newTodos;
  //   });
  // };

  // // 削除ボタンがクリックされたときのコールバック関数を作成する
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

  // TypeScript のジェネリクスを使ってよく似た関数を一つにまとめる
  // 対象：handleEdit,handleCheck,handleRemove
  const handleTodo = <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V
  ) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, [key]: value }; // [key]:  --> K型 == id, value, checked, removed のいずれか
        } else {
          return todo;
        }
      });

      return newTodos;
    });
  };

  // フィルタリング機能を追加
  const handleFilter = (filter: Filter) => {
    setFilter(filter);
  }

  // 「ゴミ箱を空にする」関数の作成と紐付け
  const handleEmpty = () => {
    // シャローコピーで事足りる
    setTodos((todos) => todos.filter((todo) => !todo.removed));
  };

  const filteredTodos = todos.filter((todo) => {
    // filter ステートの値に応じて異なる内容の配列を返す
    switch (filter) {
      case 'all':
        // 削除されていないもの
        return !todo.removed;
      case 'checked':
        // 完了済 **かつ** 削除されていないもの
        return todo.checked && !todo.removed;
      case 'unchecked':
        // 未完了 **かつ** 削除されていないもの
        return !todo.checked && !todo.removed;
      case 'removed':
        // 削除済みのもの
        return todo.removed;
      default:
        return todo;
    }
  });

  /**
   * キー名 'todo-20200101' のデータを取得
   * 第 2 引数の配列が空なのでコンポーネントのマウント時のみに実行される
  */
    useEffect(() => {
      localforage
        .getItem('todo-20200101')
        // .then((values) => setTodos(values as Todo[]));
        .then((values) => isTodos(values) && setTodos(values));
    }, []);

    /**
     * todos ステートが更新されたら、その値を保存
    */
    useEffect(() => {
      localforage.setItem('todo-20200101', todos);
    }, [todos]);



  return (
    // <div>
    //   <form onSubmit={(e) => e.preventDefault()}>
    //     <input
    //       type="text"
    //       // text ステートが持っている入力中テキストの値を value として表示
    //       value={text}
    //       // onChange イベント（＝入力テキストの変化）を text ステートに反映する
    //       onChange={(e) => setText(e.target.value)}
    //     />
    //     <input type="submit" />  {/* ← 省略 */}
    //   </form>

    //   {/* ↓ DOM のリアクティブな反応を見るためのサンプル */}
    //   <p>{text}</p>
    //   {/* ↑ あとで削除 */}
    // </div>
    <div>
      {/* フィルタリングするセレクタを作成 */}
      <select
        defaultValue="all"
        // onChange={(e) => e.preventDefault()}
        // e.target.value: string を Filter型にアサーションする
        onChange={(e) => handleFilter(e.target.value as Filter)}
      >
        <option value="all">すべてのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">現在のタスク</option>
        <option value="removed">ごみ箱</option>
      </select>

      {/* フィルターが `removed` のときは「ごみ箱を空にする」ボタンを表示 */}
      {filter === 'removed' ? (
        // <button onClick={() => console.log('remove all')}>
        //   ゴミ箱を空にする
        // </button>
        <button
          onClick={handleEmpty}
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
          {/* <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          /> */}
          <input
              type="text"
              value={text}
              // disabled={Filter === 'checked' || Filter === 'removed'}
              onChange={(e) => handleChange(e)}
            />
          {/* 上に同じ */}
          <input
              type="submit"
              value="追加"
              // disabled={Filter === 'checked' || Filter === 'removed'}
              onSubmit={handleSubmit}
            />
        </form>
        )
      )}

      {/* todos ステート配列を Array.map() メソッドで展開する */}
      <ul>
        {/* {todos.map((todo) => { */}
        {filteredTodos.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type='checkbox'
                disabled={todo.removed}
                checked={todo.checked}
                // onChange={() => console.log('checked!')}
                // 呼び出し側で checked フラグを反転させる
                // onChange={() => handleCheck(todo.id, !todo.checked)}
                onChange={() => handleTodo(todo.id, 'checked', !todo.checked)}
              />
              <input
                type='text'
                disabled={todo.checked || todo.removed} // チェック済み・削除ずみを編集不可にする
                value={todo.value}
                // onChange={(e) => e.preventDefault()}
                // onChange={(e) => handleEdit(todo.id, e.target.value)}
                onChange={(e) => handleTodo(todo.id, 'value', e.target.value)}
              />
              <button
                // onClick={() => handleRemove(todo.id, !todo.removed)}
                onClick={() => handleTodo(todo.id, 'removed', !todo.removed)}
              >
                {todo.removed ? '復元' : '削除'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};