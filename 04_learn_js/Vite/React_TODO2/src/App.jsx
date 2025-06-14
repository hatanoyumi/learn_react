import { nanoid } from "nanoid";
import { useState, useRef, useEffect } from "react";
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import Todo from "./components/Todo";

function usePrevious(value) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // このタスクが編集されたタスクと同じ ID を持っている場合
      if(id === task.id) {
        // オブジェクトを開いて、 `completed` プロップが
        // 反転された新しいオブジェクトを作成します。
        return {...task, completed: !task.completed};
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // このタスクが編集されたタスクと同じIDを持っている場合
      if(id === task.id) {
        // タスクをコピーし、名前を更新する
        return { ...task, name: newName };
      }
      // 編集されたタスクでない場合は、元のタスクを返します
      return task;
    });
    setTasks(editedTaskList);
  }

  // const taskList = tasks.map((task) => (
  //   <Todo
  //     id={task.id}
  //     name={task.name}
  //     completed={task.completed}
  //     key={task.id}
  //     toggleTaskCompleted={toggleTaskCompleted}
  //     deleteTask={deleteTask}
  //     editTask={editTask}
  //   />
  // ));

  const taskList = tasks?.filter(FILTER_MAP[filter]).map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
     />
  ));

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask ]);
  }

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length < prevTaskLength) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      {/* <form>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form> */}
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {/* <button type="button" className="btn toggle-btn" aria-pressed="true">
          <span className="visually-hidden">Show </span>
          <span>all</span>
          <span className="visually-hidden"> tasks</span>
        </button> */}
        {/* <button type="button" className="btn toggle-btn" aria-pressed="false">
          <span className="visually-hidden">Show </span>
          <span>Active</span>
          <span className="visually-hidden"> tasks</span>
        </button>
        <button type="button" className="btn toggle-btn" aria-pressed="false">
          <span className="visually-hidden">Show </span>
          <span>Completed</span>
          <span className="visually-hidden"> tasks</span>
        </button> */}
        {/* <FilterButton />
        <FilterButton />
        <FilterButton /> */}
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {/* <Todo name="Eat" id="todo-0" completed />
        <Todo name="Sleep" id="todo-1" />
        <Todo name="Repeat" id="todo-2" /> */}
        {taskList}
      </ul>
    </div>
  );
}

export default App;
