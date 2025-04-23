// console.log("App.js: loaded");
// export class App {
//   constructor() {
//     console.log("App initialized");
//   }
// }

// export class App {
//   mount() {
//     const formElement = document.querySelector("#js-form");
//     const inputElement = document.querySelector("#js-form-input");
//     formElement.addEventListener("submit", (event) => {
//       // submitイベントの本来の動作を止める
//       event.preventDefault();
//       console.log(`入力欄の値: ${inputElement.value}`);
//     });
//   }
// }

// import { TodoListModel } from "./model/TodoListModel.js";
// import { TodoItemModel } from "./model/TodoItemModel.js";
// // import { element, render } from "./view/html-util.js";
// import { TodoListView } from "./view/TodoListView.js";
// import { render } from "./view/html-util.js";

// export class App {
//   // 1. TodoListModelの初期化
//   #todoListModel = new TodoListModel();

//   mount() {
//     const formElement = document.querySelector("#js-form");
//     const inputElement = document.querySelector("#js-form-input");
//     const containerElement = document.querySelector("#js-todo-list");
//     const todoItemCountElement = document.querySelector("#js-todo-count");

//     // // TodoリストをまとめるList要素
//     // const todoListElement = element`<ul></ul>`;
//     // // Todoアイテム数
//     // let todoItemCount = 0;
//     // formElement.addEventListener("submit", (event) => {
//     // // 本来のsubmitイベントの動作を止める
//     //   event.preventDefault();
//     //   // 追加するTodoアイテムの要素(li要素)を作成する
//     //   const todoItemElement = element`<li>${inputElement.value}</li>`;
//     //   // TodoアイテムをtodoListElementに追加する
//     //   todoListElement.appendChild(todoItemElement);
//     //   // コンテナ要素の中身をTodoリストをまとめるList要素で上書きする
//     //   render(todoListElement, containerElement);
//     //   // Todoアイテム数を+1し、表示されてるテキストを更新する
//     //   todoItemCount += 1;
//     //   todoItemCountElement.textContent = `Todoアイテム数： ${todoItemCount}`;
//     //   // 入力欄を空文字列にしてリセットする
//     //   inputElement.value = "";
//     // });


//     // // 2. TodoListModelの状態が更新されたら表示を更新する
//     // this.#todoListModel.onChange(() => {
//     //   // TodoリストをまとめるList要素
//     //   const todoListElement = element`<ul></ul>`;
//     //   // それぞれのTodoItem要素をtodoListElement以下へ追加する
//     //   const todoItems = this.#todoListModel.getTodoItems();
//     //   todoItems.forEach(item => {
//     //     // const todoItemElement = element`<li>${item.title}</li>`;
//     //     // todoListElement.appendChild(todoItemElement);

//     //     // // 完了済みならchecked属性をつけ、未完了ならchecked属性を外す
//     //     // // input要素にはcheckboxクラスをつける
//     //     // const todoItemElement = item.completed
//     //     //   ? element`<li><input type="checkbox" class="checkbox" checked><s>${item.title}</s></li>`
//     //     //   : element`<li><input type="checkbox" class="checkbox">${item.title}</li>`;
//     //     // todoListElement.appendChild(todoItemElement);

//     //     // // チェックボックスがトグルしたときのイベントにリスナー関数を登録
//     //     // const todoItemElement = item.completed
//     //     // ? element`<li><input type="checkbox" class="checkbox" checked><s>${item.title}</s></li>`
//     //     // : element`<li><input type="checkbox" class="checkbox">${item.title}</li>`;
//     //     // const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
//     //     // inputCheckboxElement.addEventListener("change", () => {
//     //     //   // 指定したTodoアイテムの完了状態を反転させる
//     //     //   this.#todoListModel.updateTodo({
//     //     //     id: item.id,
//     //     //     completed: !item.completed
//     //     //   });
//     //     // });

//     //     // 削除ボタン(x)をそれぞれ追加する
//     //     const todoItemElement = item.completed
//     //       ? element`<li><input type="checkbox" class="checkbox" checked>
//     //           <s>${item.title}</s>
//     //           <button class="delete">❌</button>
//     //         </li>`
//     //       : element`<li><input type="checkbox" class="checkbox">
//     //           ${item.title}
//     //           <button class="delete">❌</button>
//     //         </li>`;
//     //     // チェックボックスのトグル処理は変更なし
//     //     const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
//     //     inputCheckboxElement.addEventListener("change", () => {
//     //       // 指定したTodoアイテムの完了状態を反転させる
//     //       this.#todoListModel.updateTodo({
//     //         id: item.id,
//     //         completed: !item.completed
//     //       });
//     //     });
//     //     // 削除ボタン(x)がクリックされたときにTodoListModelからアイテムを削除する
//     //     const deleteButtonElement = todoItemElement.querySelector(".delete");
//     //     deleteButtonElement.addEventListener("click", () => {
//     //       this.#todoListModel.deleteTodo({
//     //         id: item.id
//     //       });
//     //     });
//     //     todoListElement.appendChild(todoItemElement);
//     //   });
//     //   // コンテナ要素の中身をTodoリストをまとめるList要素で上書きする
//     //   render(todoListElement, containerElement);
//     //   // アイテム数の表示を更新
//     //   todoItemCountElement.textContent = `Todoアイテム数: ${this.#todoListModel.getTotalCount()}`;
//     // });

//     // 2. TodoItemViewクラスとTodoListViewクラスを使ってAppクラスをリファクタリング
//     this.#todoListModel.onChange(() => {
//       const todoItems = this.#todoListModel.getTodoItems();
//       const todoListView = new TodoListView();
//       // todoItemsに対応するTodoListViewを作成する
//       const todoListElement = todoListView.createElement(todoItems, {
//         // Todoアイテムが更新イベントを発生した時に呼ばれるリスナー関数
//         onUpdateTodo: ({ id, completed }) => {
//           this.#todoListModel.updateTodo({ id, completed });
//         },
//         // Todoアイテムが削除イベントを発生した時に呼ばれるリスナー関数
//         onUpdateTodo: ({ id }) => {
//           this.#todoListModel.deleteTodo({ id });
//         }
//       });
//       render(todoListElement, containerElement);
//       todoItemCountElement.textContent = `Todoアイテム数: ${this.#todoListModel.getTodoCount()}`
//     });

//     // 3. フォームを送信したら、新しいTodoItemModelを追加する
//     formElement.addEventListener("submit", (event) => {
//       event.preventDefault();
//       // 新しいTodoItemをTodoListへ追加する
//       this.#todoListModel.addTodo(new TodoItemModel({
//         title: inputElement.value,
//         completed: false
//       }));
//       inputElement.value = "";
//     });
//   }
// }

// Appのイベントリスナーを整理する
import { render } from "./view/html-util.js";
import { TodoListView } from "./view/TodoListView.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListModel } from "./model/TodoListModel.js";

export class App {
  #todoListView = new TodoListView();
  #todoListModel = new TodoListModel([]);

  formElement;
  formInputElement;
  todoCountElement;
  todoListContainerElement;
  // 紐づけするHTML要素を引数として受け取る
  constructor({ formElement, formInputElement, todoListContainerElement, todoCountElement }) {
    this.formElement = formElement;
    this.formInputElement = formInputElement;
    this.todoCountElement = todoCountElement;
    this.todoListContainerElement = todoListContainerElement;
  }

  /**
   * Todoを追加するときに呼ばれるリスナー関数
   * @param {string} title
   */
  // handleAdd(title) {
  //   this.#todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
  // }
  //リスナー関数をPrivate Fields + Arrow Functionで定義することで、`this`は常にクラスのインスタンスを示すようにする
  #handleAdd = (title) => {
    this.#todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
  };

  /**
   * Todoの状態を更新したときに呼ばれるリスナー関数
   * @param {{ id:number, completed: boolean }}
   */
  // handleUpdate({ id, completed }) {
  //   this.#todoListModel.updateTodo({ id, completed });
  // }
  #handleUpdate = ({ id, completed }) => {
    this.#todoListModel.updateTodo({ id, completed });
  };

  /**
   * Todoを削除したときに呼ばれるリスナー関数
   * @param {{ id: number }}
   */
  // handleDelete({ id }) {
  //   this.#todoListModel.deleteTodo({ id });
  // }
  #handleDelete = ({ id }) => {
    this.#todoListModel.deleteTodo({ id });
  };

  /**
   * フォームを送信時に呼ばれるリスナー関数
   * @param {Event} event
   */
  #handleSubmit = (event) => {
    event.preventDefault();
    const inputElement = this.formInputElement;
    this.#handleAdd(inputElement.value);
    inputElement.value = "";
  }

  /**
   * TodoListViewが変更した時に呼ばれるリスナー関数
   */
  #handleChange = () => {
    const todoCountElement = this.todoCountElement;
    const todoListContainerElement = this.todoListContainerElement;
    const todoItems = this.#todoListModel.getTodoItems();
    const todoListElement = this.#todoListView.createElement(todoItems, {
      // Appに定義したリスナー関数を呼び出す
      onUpdateTodo: ({ id, completed }) => {
        this.#handleUpdate({ id, completed });
      },
      onDeleteTodo: ({ id }) => {
        this.#handleDelete({ id });
      }
    });
    render(todoListElement, todoListContainerElement);
    todoCountElement.textContent = `Todoアイテム数: ${this.#todoListModel.getTotalCount()}`;
  };

  /**
   * アプリとDOMの紐づけを登録する関数
   */
  mount() {
    // const formElement = document.querySelector("#js-form");
    // const inputElement = document.querySelector("#js-form-input");
    // const todoItemCountElement = document.querySelector("#js-todo-count");
    // const containerElement = document.querySelector("#js-todo-list");
    // this.#todoListModel.onChange(() => {
    //   const todoItems = this.#todoListModel.getTodoItems();
    //   const todoListElement = this.#todoListView.createElement(todoItems, {
    //     // Appに定義したリスナー関数を呼び出す
    //     onUpdateTodo: ({ id, completed }) => {
    //       this.handleUpdate({ id, completed });
    //     },
    //     onDeleteTodo: ({ id }) => {
    //       this.handleDelete({ id });
    //     }
    //   });
    //   render(todoListElement, containerElement);
    //   todoItemCountElement.textContent = `Todoアイテム数: ${this.#todoListModel.getTotalCount()}`;
    // });

    // formElement.addEventListener("submit", (event) => {
    //   event.preventDefault();
    //   this.handleAdd(inputElement.value);
    //   inputElement.value = "";
    // });
    this.#todoListModel.onChange(this.#handleChange);
    this.formElement.addEventListener("submit", this.#handleSubmit);
  }

  /**
   * アプリとDOMの紐づけを解除する関数
   */
  unmount() {
    this.#todoListModel.offChange(this.#handleChange);
    this.formElement.removeEventListener("submit", this.#handleSubmit);
  }
}